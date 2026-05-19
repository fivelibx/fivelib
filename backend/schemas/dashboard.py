from pydantic import BaseModel, HttpUrl
from typing import List, Optional

class DashboardStatsSchema(BaseModel):
    total_usuarios: int
    ferramentas_ativas: int
    tickets_pendentes: int
    total_suporte: int

    class Config:
        from_attributes = True
        
class ToolSchema(BaseModel):
    id: int
    nome: str
    descricao: str
    url_oficial: str
    linguagem: str
    status_ativo: bool
    stars: int
    tags: List[str]
    categoria: str

class PrivateLinkSchema(BaseModel):
    id: int
    titulo: str
    url: str
    descricao: Optional[str] = None

class PrivateLinkCreateSchema(BaseModel):
    titulo: str
    url: str
    descricao: Optional[str] = None

class UserLibrarySchema(BaseModel):
    favoritos: List[ToolSchema]
    links_privados: List[PrivateLinkSchema]