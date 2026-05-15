from supabase import Client

class DashboardRepository:
    def __init__(self, client: Client):
        self.client = client

    def get_total_users(self) -> int:
        response = self.client.table("user").select("id", count="exact").execute()
        return response.count if response.count is not None else 0

    def get_active_tools(self) -> int:
        response = self.client.table("tool").select("id", count="exact").eq("status_ativo", True).execute()
        return response.count if response.count is not None else 0

    def get_pending_tickets(self) -> int:
        response = self.client.table("support_ticket").select("id", count="exact").eq("status", "pendente").execute()
        return response.count if response.count is not None else 0

    def get_total_tickets(self) -> int:
        response = self.client.table("support_ticket").select("id", count="exact").execute()
        return response.count if response.count is not None else 0