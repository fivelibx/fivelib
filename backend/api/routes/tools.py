from fastapi import APIRouter, Depends, HTTPException

from services.tool_service import ToolService
from supabase import Client
from database.base import get_supabase
from repositories.tool_repository import ToolRepository
from schemas.tool import ToolSchema
from api.security import verificar_admin

router = APIRouter()

@router.get("/")
async def get_tools(db: Client = Depends(get_supabase)):
    repository = ToolRepository(db)
    return repository.get_all()

@router.patch("/{tool_id}/star")
async def increment_star(tool_id: int, db: Client = Depends(get_supabase)):
    repository = ToolRepository(db)
    service = ToolService(repository) 
    
    new_stars = service.increment_tool_stars(tool_id)
    
    if new_stars is None:
        raise HTTPException(status_code=404, detail="Ferramenta não encontrada")
        
    return {"stars": new_stars}
@router.post("/", status_code=201)
async def create_tool(
    data: ToolSchema, 
    db: Client = Depends(get_supabase),
    admin: dict = Depends(verificar_admin)
):
    repository = ToolRepository(db)
    new_tool = db.table("tools").insert(data.dict()).execute()
    return new_tool.data