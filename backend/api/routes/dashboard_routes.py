from fastapi import APIRouter, Depends, HTTPException, status
from supabase import Client
from database.base import get_supabase
from api.security import obter_perfil_usuario
from schemas.dashboard import DashboardStatsSchema, UserLibrarySchema, PrivateLinkCreateSchema, PrivateLinkSchema
from repositories.dashboard_repository import DashboardRepository
from services.dashboard_service import DashboardService
from api.routes.users_routes import obter_usuario_atual
 
router = APIRouter()
 
# ============================================================
# ESTATÍSTICAS GERAIS — RESTRITO A ADMIN/MODERADOR
# ============================================================
 
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
 
# ============================================================
# BIBLIOTECA DO USUÁRIO — FAVORITOS E LINKS PRIVADOS
# ============================================================
 
@router.get("", response_model=UserLibrarySchema)
async def get_biblioteca(
    db: Client = Depends(get_supabase),
    user: dict = Depends(obter_usuario_atual)
):
    repository = DashboardRepository(db)
    service = DashboardService(repository)
    return service.get_user_library(user_id=user["id"])
 
# ============================================================
# LINKS PRIVADOS — CRUD DO USUÁRIO LOGADO
# ============================================================
 
@router.post("/private-links", response_model=PrivateLinkSchema)
async def criar_link_privado(
    payload: PrivateLinkCreateSchema,
    db: Client = Depends(get_supabase),
    user: dict = Depends(obter_usuario_atual)
):
    repository = DashboardRepository(db)
    service = DashboardService(repository)
    # user["id"] vem do Supabase (que é int), passamos direto
    return service.create_private_link(user_id=user["id"], data=payload.model_dump())
 
@router.delete("/private-links/{link_id}")
async def deletar_link_privado(
    link_id: int,  # Captura o ID da URL como inteiro
    db: Client = Depends(get_supabase),
    user: dict = Depends(obter_usuario_atual)
):
    repository = DashboardRepository(db)
    service = DashboardService(repository)
    service.delete_private_link(user_id=user["id"], link_id=link_id)
    return {"message": "Link privado removido com sucesso."}
