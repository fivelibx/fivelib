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

class VerifyCodeRequest(BaseModel):
    email: EmailStr
    code: str

class ForgotPasswordRequest(BaseModel):
    email: EmailStr
    
class ResetPasswordRequest(BaseModel):
    email: EmailStr
    code: str = Field(..., min_length=6, max_length=6, description="Código de 6 dígitos enviado por e-mail")
    nova_senha: str = Field(..., min_length=8, description="A nova senha forte do usuário")