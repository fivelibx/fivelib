from typing import List, Optional

from pydantic import BaseModel

class ToolSchema(BaseModel):
    id: Optional[int] = None
    nome: str
    descricao: str
    url_oficial: str
    linguagem: Optional[str] = None
    status_ativo: bool
    stars: int
    tags: List[str]
    categoria: str
    icon_slug: Optional[str] = None
    
    class Config:
        from_attributes = False
        populate_by_name = True