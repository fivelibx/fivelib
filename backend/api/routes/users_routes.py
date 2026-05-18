# ID: backend/api/routes/users.py
from fastapi import APIRouter, Depends, HTTPException, status
from api.routes.auth_routes import oauth2_scheme
from api.security import decodificar_token_acesso, verificar_admin, obter_perfil_usuario
from database.config import supabase
from schemas.user import UserPerfilUpdate

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

@router.get("/", dependencies=[Depends(verificar_admin)])
async def listar_todos_usuarios():
    try:
        response = supabase.table("user") \
            .select("id", "nome", "email", "perfil", "data_nascimento", "criado_at") \
            .order("nome") \
            .execute()
        return response.data
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao listar usuários: {str(e)}"
        )

@router.patch("/{user_id}/perfil")
async def alterar_perfil_usuario(
    user_id: str,
    update_data: UserPerfilUpdate,
    current_user: dict = Depends(verificar_admin),
    perfil_operador: str = Depends(obter_perfil_usuario)
):
    novo_perfil = update_data.perfil.lower()
    
    if novo_perfil not in ["superadmin", "admin", "moderador", "user"]:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Perfil inválido fornecido."
        )

    if perfil_operador != "superadmin":
        if novo_perfil in ["admin", "superadmin"]:
            raise HTTPException(
                status_code=status.HTTP_403_FORBIDDEN,
                detail="Acesso negado: Apenas o SuperAdmin pode atribuir ou gerenciar o cargo de Administrador."
            )
            
        try:
            alvo = supabase.table("user").select("perfil").eq("id", user_id).single().execute()
            if alvo.data and alvo.data.get("perfil") in ["admin", "superadmin"]:
                raise HTTPException(
                    status_code=status.HTTP_403_FORBIDDEN,
                    detail="Acesso negado: Administradores comuns não podem alterar permissões de outros Admins ou SuperAdmins."
                )
        except HTTPException:
            raise
        except Exception:
            pass

    try:
        response = supabase.table("user") \
            .update({"perfil": novo_perfil}) \
            .eq("id", user_id) \
            .execute()
            
        if not response.data:
            raise HTTPException(status_code=404, detail="Usuário não encontrado.")
            
        return {"message": "Perfil atualizado com sucesso", "usuario": response.data[0]}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )