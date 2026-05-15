from fastapi import APIRouter, Depends
from database.config import supabase
from api.security import verificar_admin

router = APIRouter(prefix="/api/v1/tickets", tags=["Tickets"])

@router.get("/")
async def listar_tickets(admin: dict = Depends(verificar_admin)):
    res = supabase.table("support_ticket").select("*, user(nome, email)").execute()
    return res.data

@router.patch("/{ticket_id}")
async def atualizar_status_ticket(ticket_id: int, status: str, admin: dict = Depends(verificar_admin)):
    res = supabase.table("support_ticket").update({"status": status}).eq("id", ticket_id).execute()
    return res.data