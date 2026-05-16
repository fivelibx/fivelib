from pydantic import BaseModel

class DashboardStatsSchema(BaseModel):
    total_usuarios: int
    ferramentas_ativas: int
    tickets_pendentes: int
    total_suporte: int

    class Config:
        from_attributes = True