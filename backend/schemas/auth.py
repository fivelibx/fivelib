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

class ForgotPasswordRequest(BaseModel):
    email: EmailStr
    
class ResetPasswordRequest(BaseModel):
    email: EmailStr
    code: str = Field(..., min_length=6, max_length=6, description="Código de 6 dígitos enviado por e-mail")
    nova_senha: str = Field(..., min_length=8, description="A nova senha forte do usuário")

class UserPerfilUpdate(BaseModel):
    perfil: str = Field(..., description="Novo perfil do usuário: superadmin, admin, moderador ou user")