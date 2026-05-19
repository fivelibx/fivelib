from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime

class TicketCreate(BaseModel):
    email_contato: EmailStr
    secao_site: str
    mensagem: str

class TicketResponse(BaseModel):
    id: int
    usuario_id: int
    email_contato: str
    secao_site: str
    mensagem: str
    status: str
    criado_at: datetime

    class Config:
        from_attributes = True

class UserMinResponse(BaseModel):
    nome: str
    email: str

class TicketAdminResponse(BaseModel):
    id: int
    usuario_id: int
    email_contato: str
    secao_site: str
    mensagem: str
    status: str
    criado_at: datetime
    user: Optional[UserMinResponse] = None

    class Config:
        from_attributes = True
class TicketUpdateAdmin(BaseModel):
    status: str
    observacao_admin: Optional[str] = None 