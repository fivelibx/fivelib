import random
from fastapi import APIRouter, Depends, HTTPException, status
from api.routes.auth_routes import oauth2_scheme
from api.security import decodificar_token_acesso, verificar_admin, obter_perfil_usuario, obter_hash_senha
from database.config import supabase
from schemas.user import UserPerfilUpdate, UserUpdateSelf
from datetime import datetime, timedelta, timezone
from services.email_service import enviar_email_verificacao

router = APIRouter()

async def obter_usuario_atual(token: str = Depends(oauth2_scheme)):
    payload = decodificar_token_acesso(token)
    
    user_id = payload.get("sub")
    if not user_id:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Token inválido: ID de usuário ausente no payload."
        )
        
    response = supabase.table("user").select(
        "id", "nome", "email", "perfil", "titulo_profissional", "github", "linkedin"
    ).eq("id", user_id).execute()
    
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
        "role": current_user["perfil"],
        "titulo_profissional": current_user.get("titulo_profissional") or "",
        "github": current_user.get("github") or "",
        "linkedin": current_user.get("linkedin") or ""
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
            
        return {"message": "Perfil updated com sucesso", "usuario": response.data[0]}
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )

@router.put("/me")
async def atualizar_proprio_perfil(
    dados_atualizacao: UserUpdateSelf,
    current_user: dict = Depends(obter_usuario_atual)
):
    user_id = current_user["id"]
    email_antigo = current_user["email"]
    
    tentando_alterar_email = dados_atualizacao.email and dados_atualizacao.email.lower() != email_antigo.lower()
    tentando_alterar_senha = dados_atualizacao.senha and dados_atualizacao.senha.strip() != ""
    
    if tentando_alterar_email and tentando_alterar_senha:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Por questões de segurança, altere sua senha e seu e-mail em etapas separadas."
        )

    payload_banco = {
        "nome": dados_atualizacao.nome,
        "titulo_profissional": dados_atualizacao.titulo_profissional,
        "github": dados_atualizacao.github,
        "linkedin": dados_atualizacao.linkedin
    }
    
    if tentando_alterar_senha:
        payload_banco["senha"] = obter_hash_senha(dados_atualizacao.senha)
        mensagem_sucesso = "Senha modificada com sucesso!"
    else:
        mensagem_sucesso = "Perfil atualizado com sucesso!"

    if tentando_alterar_email:
        codigo_verificacao = f"{random.randint(100000, 999999)}"
        tempo_expiracao = (datetime.now(timezone.utc) + timedelta(minutes=15)).isoformat()
        
        print("\n" + "="*50)
        print(f"📧 [ALTERAÇÃO DE EMAIL] CÓDIGO GERADO PARA {dados_atualizacao.email.lower()}: {codigo_verificacao}")
        print("="*50 + "\n")
        
        payload_banco["verification_code"] = codigo_verificacao
        payload_banco["verification_expires_at"] = tempo_expiracao
        
        try:
            await enviar_email_verificacao(email=dados_atualizacao.email.lower(), codigo=codigo_verificacao)
            mensagem_sucesso = "Código de confirmação enviado! Verifique sua nova caixa de entrada para validar a alteração."
        except Exception as mail_err:
            print(f"Erro ao disparar e-mail: {str(mail_err)}")
            raise HTTPException(
                status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
                detail="Dados cadastrais salvos, mas falhou o envio do e-mail de verificação."
            )

    try:
        response = supabase.table("user").update(payload_banco).eq("id", user_id).execute()
        
        if not response.data:
            raise HTTPException(status_code=404, detail="Usuário não encontrado.")
            
        usuario_salvo = response.data[0]
        
        return {
            "id": usuario_salvo["id"],
            "name": usuario_salvo["nome"],
            "email": usuario_salvo["email"],
            "role": usuario_salvo["perfil"],
            "titulo_profissional": usuario_salvo.get("titulo_profissional") or "",
            "github": usuario_salvo.get("github") or "",
            "linkedin": usuario_salvo.get("linkedin") or "",
            "detail": mensagem_sucesso
        }
        
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Erro ao atualizar o perfil: {str(e)}"
        )