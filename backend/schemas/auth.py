from pydantic import BaseModel, EmailStr, Field
from datetime import date

class LoginRequest(BaseModel):
    email: EmailStr
    password: str

class LoginResponse(BaseModel):
    access_token: str
    token_type: str = "bearer"
    role: str
    name: str

class RegisterRequest(BaseModel):
    nome: str
    email: EmailStr
    senha: str
    data_nascimento: date
    accepted_terms: bool = Field(..., description="O usuário deve aceitar os termos de uso e política de privacidade.")

class VerifyCodeRequest(BaseModel):
    email: EmailStr
    code: str