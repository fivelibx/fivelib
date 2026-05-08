from fastapi import APIRouter, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from schemas.auth import LoginRequest, LoginResponse, RegisterRequest
from database.config import supabase

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
    
    if user["senha"] != data.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="E-mail ou senha incorretos"
        )
    
    return {
        "access_token": "token-real-provisorio-supabase",
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
    
    novo_usuario = {
        "nome": data.nome,
        "email": data.email,
        "senha": data.senha,
        "data_nascimento": data.data_nascimento.isoformat(),
        "perfil": "user"
    }
    
    insert_response = supabase.table("user").insert(novo_usuario).execute()
    
    if not insert_response.data:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail="Erro ao criar conta. Tente novamente mais tarde."
        )
    
    return {"message": "Cadastro realizado com sucesso!"}