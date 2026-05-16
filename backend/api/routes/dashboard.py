from fastapi import APIRouter, Depends, HTTPException, status
from supabase import Client

from database.base import get_supabase
from api.security import obter_perfil_usuario
from schemas.dashboard import DashboardStatsSchema
from repositories.dashboard_repository import DashboardRepository
from services.dashboard_service import DashboardService

router = APIRouter()

@router.get("/stats", response_model=DashboardStatsSchema)
async def get_dashboard_stats(
    db: Client = Depends(get_supabase),
    perfil: str = Depends(obter_perfil_usuario)
):
    if perfil not in ["superadmin", "admin", "moderador"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Acesso negado: Privilégios insuficientes para visualizar o dashboard."
        )

    repository = DashboardRepository(db)
    service = DashboardService(repository)
    
    return service.get_general_stats()