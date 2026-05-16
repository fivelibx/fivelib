from supabase import Client
from schemas.ticket_schema import TicketCreate, TicketUpdateAdmin

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
    
    def get_all_tickets(self) -> list[dict]:
        try:
            response = self.client.table("support_ticket") \
                .select("*, user!usuario_id(nome, email)") \
                .order("criado_at", desc=True) \
                .execute()
                
            return response.data if response.data else []
        except Exception as e:
            print("\n" + "🚨" * 20)
            print(f"ERRO REAL DO SUPABASE NO GET TICKETS: {str(e)}")
            print("🚨" * 20 + "\n")
            raise e
    def update_ticket_status(self, ticket_id: int, update_data: TicketUpdateAdmin) -> dict:
        up_data = {
            "status": update_data.status,
            "observacao_admin": update_data.observacao_admin
        }
        
        response = self.client.table("support_ticket") \
            .update(up_data) \
            .eq("id", ticket_id) \
            .execute()
            
        if not response.data:
            raise Exception("Ticket não encontrado ou falha ao atualizar no banco de dados.")
            
        return response.data[0]