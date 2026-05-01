from fastapi import APIRouter, Depends
from supabase import Client
from database.base import get_supabase
from repositories.tool_repository import ToolRepository

router = APIRouter()

@router.get("/")
async def get_tools(db: Client = Depends(get_supabase)):
    repository = ToolRepository(db)
    return repository.get_all()