from fastapi import APIRouter, Depends, HTTPException, status, Request # Importe Request
from slowapi import Limiter
from slowapi.util import get_remote_address
from slowapi.errors import RateLimitExceeded

from database.config import supabase as db_client
from api.security import obter_usuario_logado
from schemas.ticket_schema import TicketCreate, TicketResponse
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