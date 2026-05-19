from pydantic import BaseModel, EmailStr, Field
from datetime import date

class RegisterRequest(BaseModel):
    nome: str
    email: EmailStr
    senha: str
    data_nascimento: date
    accepted_terms: bool = Field(..., description="O usuário deve aceitar os termos de uso e política de privacidade.")

class UserPerfilUpdate(BaseModel):
    perfil: str = Field(..., description="Novo perfil do usuário: superadmin, admin, moderador ou user")

class UserUpdateSelf(BaseModel):
    nome: str = Field(..., min_length=2, max_length=100)
    email: EmailStr
    senha: str | None = Field(default=None, min_length=8)
    titulo_profissional: str | None = Field(default=None, max_length=150)
    github: str | None = Field(default=None, max_length=50)
    linkedin: str | None = Field(default=None, max_length=50)