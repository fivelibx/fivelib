from typing import List, Optional

from pydantic import BaseModel

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
    icon_slug: Optional[str] = None
    
    class Config:
        from_attributes = False
        populate_by_name = True