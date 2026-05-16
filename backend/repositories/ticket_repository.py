from supabase import Client
from schemas.ticket_schema import TicketCreate

class TicketRepository:
    def __init__(self, client: Client):
        self.client = client

    def create_ticket(self, ticket_data: TicketCreate, usuario_id: int) -> dict:
        db_data = {
            "usuario_id": usuario_id,
            "email_contato": ticket_data.email_contato,
            "secao_site": ticket_data.secao_site,
            "mensagem": ticket_data.mensagem,
            "status": "pendente"
        }
        
        response = self.client.table("support_ticket").insert(db_data).execute()
        
        if not response.data:
            raise Exception("Erro ao inserir o ticket de suporte no banco de dados.")
            
        return response.data[0]