from fastapi import APIRouter, Depends, HTTPException, status, Request
from slowapi import Limiter
from slowapi.util import get_remote_address
from typing import List
from api.security import verificar_admin
from schemas.ticket_schema import TicketAdminResponse

from database.config import supabase as db_client
from api.security import obter_usuario_logado
from schemas.ticket_schema import TicketCreate, TicketResponse, TicketUpdateAdmin
from repositories.ticket_repository import TicketRepository

limiter = Limiter(key_func=get_remote_address)
router = APIRouter()

@router.post("/", response_model=TicketResponse, status_code=status.HTTP_201_CREATED)
@limiter.limit("3/5 minutes") 
async def create_support_ticket(
    request: Request,
    ticket: TicketCreate,
    token_data: dict = Depends(obter_usuario_logado)
):
    try:
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
@router.get("/", response_model=List[TicketAdminResponse])
async def list_all_tickets(
    admin_data: dict = Depends(verificar_admin)
):
    try:
        repository = TicketRepository(db_client)
        tickets = repository.get_all_tickets()
        return tickets
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_500_INTERNAL_SERVER_ERROR,
            detail=f"Erro ao listar tickets: {str(e)}"
        )
@router.patch("/{ticket_id}", response_model=TicketResponse)
async def update_ticket(
    ticket_id: int,
    update_data: TicketUpdateAdmin,
    admin_data: dict = Depends(verificar_admin)
):
    try:
        repository = TicketRepository(db_client)
        updated_ticket = repository.update_ticket_status(ticket_id, update_data)
        return updated_ticket
    except Exception as e:
        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail=f"Erro ao atualizar o ticket: {str(e)}"
        )