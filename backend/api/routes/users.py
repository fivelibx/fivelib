from fastapi import APIRouter, Depends, HTTPException, status
from api.auth import oauth2_scheme
from api.security import decodificar_token_acesso
from database.config import supabase

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