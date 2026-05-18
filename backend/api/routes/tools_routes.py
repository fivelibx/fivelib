from fastapi import APIRouter, Depends, HTTPException, status
from supabase import Client

from database.base import get_supabase
from repositories.tool_repository import ToolRepository
from services.tool_service import ToolService
from schemas.tool import ToolSchema
from api.security import verificar_admin, obter_perfil_usuario

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


@router.post("/", status_code=status.HTTP_201_CREATED)
async def create_tool(
    data: ToolSchema, 
    db: Client = Depends(get_supabase),
    admin: dict = Depends(verificar_admin)
):
    try:
        repository = ToolRepository(db)
        payload = data.dict()
        
        new_tool = repository.create(payload)
        return new_tool
        
    except Exception as e:
        print(f"\n[ERRO CRÍTICO NO POST]: {str(e)}\n")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Erro ao cadastrar ferramenta: {str(e)}"
        )


@router.delete("/{tool_id}", status_code=status.HTTP_204_NO_CONTENT)
async def delete_resource(
    tool_id: int,
    db: Client = Depends(get_supabase),
    perfil: str = Depends(obter_perfil_usuario)
):
    if perfil not in ["superadmin", "admin"]:
        raise HTTPException(
            status_code=status.HTTP_403_FORBIDDEN,
            detail="Acesso negado: privilégios insuficientes para remover ferramentas."
        )
    
    try:
        repository = ToolRepository(db)
        repository.delete(tool_id)
        return
        
    except Exception as e:
        print(f"Erro interno ao deletar no Supabase: {str(e)}")
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST, 
            detail=f"Erro na requisição de exclusão no banco: {str(e)}"
        )