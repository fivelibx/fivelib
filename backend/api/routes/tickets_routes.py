from fastapi import APIRouter, Depends, HTTPException, status
from supabase import Client

from database.config import supabase as db_client # Seu cliente injetado ou importado
from api.security import obter_usuario_logado      # Importando sua função de segurança
from schemas.ticket import TicketCreate, TicketResponse
from repositories.ticket_repository import TicketRepository

router = APIRouter(prefix="/api/v1/tickets", tags=["Tickets"])

@router.post("/", response_model=TicketResponse, status_code=status.HTTP_201_CREATED)
async def create_support_ticket(
    ticket: TicketCreate,
    # Injeta os dados do token do usuário comum logado
    token_data: dict = Depends(obter_usuario_logado) 
):
    try:
        # Extrai o ID do usuário (lembrando que no login você salvou como 'sub')
        # Como o banco espera int no id do user, convertemos de volta para int
        usuario_id = int(token_data.get("sub"))
        
        repository = TicketRepository(db_client)
        new_ticket = repository.create_ticket(ticket, usuario_id)
        return new_ticket
        
    except ValueError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Identificador de usuário inválido no token."
        )
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=str(e)
        )