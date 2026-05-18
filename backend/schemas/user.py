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