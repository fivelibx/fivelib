from fastapi import APIRouter, Depends, HTTPException, status
from api.auth import oauth2_scheme
from api.security import decodificar_token_acesso
from database.config import supabase
from schemas.favorite import FavoriteCreate, FavoriteIdsResponse
from repositories.favorite_repository import FavoriteRepository
from repositories.tool_repository import ToolRepository
router = APIRouter()

async def obter_usuario_atual(token: str = Depends(oauth2_scheme)):
    payload = decodificar_token_acesso(token)
    
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido: ID de usuário ausente no payload."
        )
        
    response = supabase.table("user").select("id", "nome", "email", "perfil").eq("id", user_id).execute()
    
    if not response.data:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Usuário dono deste token não foi encontrado."
        )
        
    return response.data[0]


@router.get("/me")
async def read_users_me(current_user: dict = Depends(obter_usuario_atual)):
    return {
        "id": current_user["id"],
        "name": current_user["nome"],
        "email": current_user["email"],
        "role": current_user["perfil"]
    }

@router.get("/me/favorites", response_model=FavoriteIdsResponse)
async def lsit_my_favorites(usuario_atual: dict = Depends(obter_usuario_atual)):
    repo = FavoriteRepository(supabase)
    ids = repo.list_ids_by_user(usuario_atual["id"])
    return {"ferramenta_ids": ids}



@router.post("/me/favorites", status_code = 201)
async def add_favorite(body:FavoriteCreate, usuario_atual: dict = Depends(obter_usuario_atual)):
    tool_repo = ToolRepository(supabase)
    if not tool_repo.get_by_id(body.ferramenta_id):
        raise HTTPException(status_code=404, detail="Ferramenta não encontrada")

    fav_repo = FavoriteRepository(supabase)
    if fav_repo.exists(usuario_atual["id"], body.ferramenta_id):
        return {"mensagem":"Já favoritado"}
    
    fav_repo.add(usuario_atual["id"], body.ferramenta_id)
    return {"mensagem":"Favorito adicionado"}

@router.delete("/me/favorites/{ferramenta_id}", status_code=204)
async def remove_favorite(ferramenta_id:int, usuario_atual:dict=Depends(obter_usuario_atual)):
    fav_repo = FavoriteRepository(supabase)
    if not fav_repo.remove(usuario_atual["id"], ferramenta_id):
        raise HTTPException(status_code=404, detail="Favorito não encontrado")

