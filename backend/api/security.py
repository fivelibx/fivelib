import os
import bcrypt
import jwt
from datetime import datetime, timedelta, timezone
from fastapi import Depends, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from database.config import supabase

SECRET_KEY = os.getenv("JWT_SECRET_KEY", "chave_padrao_desenvolvimento_local_123456")
ALGORITHM = "HS256"
ACCESS_TOKEN_EXPIRE_MINUTES = 60 * 24

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/login")

# ============================================================
# HASHING DE SENHA (BCRYPT)
# ============================================================
def obter_hash_senha(senha: str) -> str:
    senha_bytes = senha.encode('utf-8')
    salt = bcrypt.gensalt()
    hash_bytes = bcrypt.hashpw(senha_bytes, salt)
    return hash_bytes.decode('utf-8')

def verificar_senha(senha_plana: str, senha_hash: str) -> bool:
    try:
        senha_bytes = senha_plana.encode('utf-8')
        hash_bytes = senha_hash.encode('utf-8')
        return bcrypt.checkpw(senha_bytes, hash_bytes)
    except Exception:
        return False


# ============================================================
# GERENCIAMENTO DE TOKENS JWT
# ============================================================
def criar_token_acesso(data: dict) -> str:
    dados_para_criptografar = data.copy()

    expiracao = datetime.now(timezone.utc) + timedelta(minutes=ACCESS_TOKEN_EXPIRE_MINUTES)
    dados_para_criptografar.update({"exp": expiracao})
    
    token_jwt = jwt.encode(dados_para_criptografar, SECRET_KEY, algorithm=ALGORITHM)
    return token_jwt

def decodificar_token_acesso(token: str) -> dict:
    try:
        payload = jwt.decode(token, SECRET_KEY, algorithms=[ALGORITHM])
        return payload
    except jwt.ExpiredSignatureError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="O token de acesso expirou. Faça login novamente.",
            headers={"WWW-Authenticate": "Bearer"},
        )
    except jwt.InvalidTokenError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token de acesso inválido.",
            headers={"WWW-Authenticate": "Bearer"},
        )

# ============================================================
# DEPENDÊNCIAS DE AUTENTICAÇÃO E EXTRAÇÃO DE PAYLOAD
# ============================================================
async def obter_usuario_logado(token: str = Depends(oauth2_scheme)) -> dict:
    return decodificar_token_acesso(token)


async def obter_perfil_usuario(token_data: dict = Depends(obter_usuario_logado)) -> str:
    user_id = token_data.get("sub")
    
    try:
        res = supabase.table("user").select("perfil").eq("id", user_id).single().execute()
        if not res.data:
            raise HTTPException(
                status_code=status.HTTP_401_UNAUTHORIZED,
                detail="Usuário não encontrado no sistema."
            )
        return res.data.get("perfil", "user")
    except Exception:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Falha na autenticação ou sessão inválida."
        )

# ============================================================
# CONTROLE DE ACESSO — DEPENDÊNCIAS DE AUTORIZAÇÃO (RBAC)
# ============================================================
async def verificar_moderador(
    token_data: dict = Depends(obter_usuario_logado),
    perfil: str = Depends(obter_perfil_usuario)
) -> dict:
    if perfil not in ["moderador", "admin", "superadmin"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Acesso negado: Requer nível mínimo de Moderador."
        )
    return token_data

async def verificar_admin(
    token_data: dict = Depends(obter_usuario_logado),
    perfil: str = Depends(obter_perfil_usuario)
) -> dict:
    if perfil not in ["admin", "superadmin"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Acesso negado: Privilégios de Administrador requeridos."
        )
    return token_data

async def verificar_superadmin(
    token_data: dict = Depends(obter_usuario_logado),
    perfil: str = Depends(obter_perfil_usuario)
) -> dict:
    if perfil != "superadmin":
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Acesso restrito: Esta operação é exclusiva do SuperAdmin."
        )
    return token_data