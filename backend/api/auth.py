from fastapi import APIRouter, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from schemas.auth import LoginRequest, LoginResponse
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