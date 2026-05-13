import random
from datetime import datetime, timedelta, timezone
from fastapi import APIRouter, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from schemas.auth import LoginRequest, LoginResponse, RegisterRequest, VerifyCodeRequest, ForgotPasswordRequest, ResetPasswordRequest
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
        novo_codigo = f"{random.randint(100000, 999999)}"
        novo_tempo_expiracao = (datetime.now(timezone.utc) + timedelta(minutes=15)).isoformat()
        
        print("\n" + "="*50)
        print(f"🔑 [LOGIN - CONTA INATIVA] NOVO CÓDIGO GERADO PARA {data.email}: {novo_codigo}")
        print("="*50 + "\n")
        
        supabase.table("user").update({
            "verification_code": novo_codigo,
            "verification_expires_at": novo_tempo_expiracao
        }).eq("id", user["id"]).execute()
        
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail={
                "error": "requires_verification",
                "email": user["email"],
                "message": "Esta conta ainda não foi ativada. Um novo código foi gerado."
            }
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
    if not getattr(data, "accepted_terms", False):
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Você precisa aceitar os Termos de Uso e a Política de Privacidade para se cadastrar."
        )

    user_exists = supabase.table("user").select("id, is_active").eq("email", data.email).execute()
    
    codigo_verificacao = f"{random.randint(100000, 999999)}"
    tempo_expiracao = (datetime.now(timezone.utc) + timedelta(minutes=15)).isoformat()
    senha_criptografada = obter_hash_senha(data.senha)
    timestamp_aceite = datetime.now(timezone.utc).isoformat()

    if user_exists.data:
        usuario_atual = user_exists.data[0]
        
        if usuario_atual.get("is_active") == True:
            raise HTTPException(
                status_code=status.HTTP_400_BAD_REQUEST,
                detail="Este e-mail já está cadastrado."
            )
        
        print("\n" + "="*50)
        print(f"🔄 [REENVIO/ATUALIZAÇÃO] NOVO CÓDIGO PARA {data.email}: {codigo_verificacao}")
        print("="*50 + "\n")
        
        update_response = supabase.table("user").update({
            "nome": data.nome,
            "senha": senha_criptografada,
            "data_nascimento": data.data_nascimento.isoformat(),
            "verification_code": codigo_verificacao,
            "verification_expires_at": tempo_expiracao,
            "accepted_terms": True,
            "accepted_terms_at": timestamp_aceite
        }).eq("id", usuario_atual["id"]).execute()
        
        if not update_response.data:
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Erro ao atualizar código de verificação. Tente novamente."
            )
            
        return {"message": "Um novo código de verificação foi gerado."}

    print("\n" + "="*50)
    print(f"📧 [NOVO CADASTRO] CÓDIGO PARA {data.email}: {codigo_verificacao}")
    print("="*50 + "\n")
    
    novo_usuario = {
        "nome": data.nome,
        "email": data.email,
        "senha": senha_criptografada,
        "data_nascimento": data.data_nascimento.isoformat(),
        "perfil": "user",
        "is_active": False, 
        "verification_code": codigo_verificacao,
        "verification_expires_at": tempo_expiracao,
        "accepted_terms": True,
        "accepted_terms_at": timestamp_aceite
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

@router.post("/forgot-password", status_code=status.HTTP_200_OK)
async def forgot_password(data: ForgotPasswordRequest):
    response = supabase.table("user").select("id, is_active").eq("email", data.email).execute()
    
    if not response.data:
        return {"message": "Se o e-mail estiver cadastrado, um código de recuperação será enviado."}
        
    user = response.data[0]
    
    # Gera o código de 6 dígitos e tempo de expiração (15 min)
    codigo_recuperacao = f"{random.randint(100000, 999999)}"
    tempo_expiracao = (datetime.now(timezone.utc) + timedelta(minutes=15)).isoformat()
    
    print("\n" + "="*50)
    print(f"🔒 [RECUPERAÇÃO DE SENHA] CÓDIGO GERADO PARA {data.email}: {codigo_recuperacao}")
    print("="*50 + "\n")
    
    supabase.table("user").update({
        "reset_password_code": codigo_recuperacao,
        "reset_password_expires_at": tempo_expiracao
    }).eq("id", user["id"]).execute()
    
    return {"message": "Código de recuperação gerado com sucesso. Verifique o terminal."}


@router.post("/reset-password", status_code=status.HTTP_200_OK)
async def reset_password(data: ResetPasswordRequest):
    response = supabase.table("user").select("*").eq("email", data.email).execute()
    
    if not response.data:
        raise HTTPException(status_code=status.HTTP_404_NOT_FOUND, detail="Usuário não encontrado.")
        
    user = response.data[0]
    
    if not user.get("reset_password_code") or user.get("reset_password_code") != data.code:
        raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="Código de recuperação inválido.")
        
    expires_at_str = user.get("reset_password_expires_at")
    if expires_at_str:
        expires_at = datetime.fromisoformat(expires_at_str.replace("Z", "+00:00"))
        if datetime.now(timezone.utc) > expires_at:
            raise HTTPException(status_code=status.HTTP_400_BAD_REQUEST, detail="O código de recuperação expirou.")
            
    nova_senha_criptografada = obter_hash_senha(data.nova_senha)
    
    supabase.table("user").update({
        "senha": nova_senha_criptografada,
        "reset_password_code": None,
        "reset_password_expires_at": None,
        "is_active": True 
    }).eq("id", user["id"]).execute()
    
    return {"message": "Senha redefinida com sucesso! Você já pode fazer login."}