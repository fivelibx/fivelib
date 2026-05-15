from fastapi import APIRouter, Depends
from supabase import Client

from database.base import get_supabase
from api.security import verificar_admin
from schemas.dashboard import DashboardStatsSchema
from repositories.dashboard_repository import DashboardRepository
from services.dashboard_service import DashboardService

router = APIRouter()

@router.get("/stats", response_model=DashboardStatsSchema)
async def get_dashboard_stats(
    db: Client = Depends(get_supabase),
    admin: dict = Depends(verificar_admin)
):
    repository = DashboardRepository(db)
    service = DashboardService(repository)
    
    return service.get_general_stats()