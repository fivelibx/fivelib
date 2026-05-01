from pydantic import BaseModel

class ToolSchema(BaseModel):
    id: id
    nome: str
    descricao: str
    url_oficial: str
    linguagem: str
    status_ativo: bool