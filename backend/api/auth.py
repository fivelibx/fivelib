from fastapi import APIRouter, HTTPException, status
from fastapi.security import OAuth2PasswordBearer
from schemas.auth import LoginRequest, LoginResponse

oauth2_scheme = OAuth2PasswordBearer(tokenUrl="api/v1/auth/login")

router = APIRouter(tags=["auth"])

# MOCK de usuários para teste inicial
MOCK_USERS = {
    "admin@fivelib.com": {
        "password": "admin123", # Em produção usar hash
        "name": "Admin",
        "role": "admin"
    },
    "user@fivelib.com": {
        "password": "user123",
        "name": "Lucas Paiva",
        "role": "user"
    }
}

@router.post("/login", response_model=LoginResponse)
async def login(data: LoginRequest):
    user = MOCK_USERS.get(data.email)
    
    if not user or user["password"] != data.password:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="E-mail ou senha incorretos"
        )
    
    return {
        "access_token": "token-falso-gerado-pelo-fastapi", # Depois geraremos JWT real
        "token_type": "bearer",
        "role": user["role"],
        "name": user["name"]
    }