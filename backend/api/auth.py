import random
from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from schemas.auth import LoginRequest, LoginResponse, RegisterRequest, VerifyCodeRequest
from database.config import supabase

from api.security import obter_hash_senha, verificar_senha, criar_token_acesso

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/login")

router = APIRouter(tags=["auth"])

@router.post("/login", response_model=LoginResponse)
async def login(data: LoginRequest):
    response = supabase.table("user").select("*").eq("email", data.email).execute()
    
    user_data = response.data
    
    if not user_data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="E-mail ou senha incorretos"
        )
    
    user = user_data[0]
    
    if not verificar_senha(data.password, user["senha"]):
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="E-mail ou senha incorretos"
        )
    
    if not user.get("is_active", False):
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Esta conta ainda não foi ativada. Verifique seu e-mail."
        )
    
    payload_usuario = {
        "sub": str(user["id"]),
        "email": user["email"],
        "role": user["perfil"]
    }
    
    token_real = criar_token_acesso(data=payload_usuario)
    
    return {
        "access_token": token_real,
        "token_type": "bearer",
        "role": user["perfil"],  
        "name": user["nome"]
    }

@router.post("/register", status_code=status.HTTP_201_CREATED)
async def register(data: RegisterRequest):
    user_exists = supabase.table("user").select("id").eq("email", data.email).execute()
    
    if user_exists.data:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Este e-mail já está cadastrado."
        )
    
    senha_criptografada = obter_hash_senha(data.senha)
    
    codigo_verificacao = f"{random.randint(100000, 999999)}"
    
    tempo_expiracao = (datetime.now(timezone.utc) + timedelta(minutes=15)).isoformat()
    
    print("\n" + "="*50)
    print(f"📧 CÓDIGO DE VERIFICAÇÃO PARA {data.email}: {codigo_verificacao}")
    print("="*50 + "\n")
    
    novo_usuario = {
        "nome": data.nome,
        "email": data.email,
        "senha": senha_criptografada,
        "data_nascimento": data.data_nascimento.isoformat(),
        "perfil": "user",
        "is_active": False, 
        "verification_code": codigo_verificacao,
        "verification_expires_at": tempo_expiracao 
    }
    
    insert_response = supabase.table("user").insert(novo_usuario).execute()
    
    if not insert_response.data:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erro ao criar conta. Tente novamente mais tarde."
        )
    
    return {"message": "Cadastro realizado com sucesso! Verifique seu e-mail para ativar a conta."}

@router.post("/verify-code", status_code=status.HTTP_200_OK)
async def verify_code(data: VerifyCodeRequest):
    # Busca o usuário pelo e-mail
    response = supabase.table("user").select("*").eq("email", data.email).execute()
    
    if not response.data:
        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="Usuário não encontrado."
        )
        
    user = response.data[0]
    
    if user.get("is_active", False):
        return {"message": "Esta conta já está ativa."}
        
    if user.get("verification_code") != data.code:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Código de verificação incorreto."
        )
        
    expires_at_str = user.get("verification_expires_at")
    if expires_at_str:
        expires_at = datetime.fromisoformat(expires_at_str.replace("Z", "+00:00"))
        

        if datetime.now(timezone.utc) > expires_at:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="O código de verificação expirou. Solicite um novo código."
            )
            
    update_response = supabase.table("user").update({
        "is_active": True,
        "verification_code": None,
        "verification_expires_at": None
    }).eq("id", user["id"]).execute()
    
    if not update_response.data:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erro ao ativar a conta. Tente novamente."
        )
        
    return {"message": "Conta ativada com sucesso! Você já pode fazer login."}