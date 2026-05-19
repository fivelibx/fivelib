from supabase import Client

class DashboardRepository:
    def __init__(self, client: Client):
        self.client = client

    # ============================================================
    # MÉTRICAS DE ESTATÍSTICAS DO DASHBOARD
    # ============================================================
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

    # ============================================================
    # BIBLIOTECA DO USUÁRIO — FAVORITOS
    # ============================================================
    def get_user_favorites(self, user_id: int) -> list:
        response = self.client.table("favorite").select("tool(*)").eq("usuario_id", int(user_id)).execute()
        return [item["tool"] for item in response.data if item.get("tool")]

    # ============================================================
    # BIBLIOTECA DO USUÁRIO — LINKS PRIVADOS (CRUD)
    # ============================================================
    def get_user_private_links(self, user_id: int) -> list:
        response = self.client.table("private_link") \
            .select("*") \
            .eq("usuario_id", int(user_id)) \
            .order("id", desc=True) \
            .execute()
        return response.data

    def create_private_link(self, user_id: int, data: dict) -> dict:
        payload = {
            "usuario_id": user_id,
            "titulo": data.get("titulo"),
            "url": data.get("url")
        }
        response = self.client.table("private_link").insert(payload).execute()
        return response.data[0] if response.data else {}

    def delete_private_link(self, user_id: int, link_id: int) -> None:
        self.client.table("private_link") \
            .delete() \
            .eq("id", link_id) \
            .eq("usuario_id", user_id) \
            .execute()

    # ============================================================
    # REMOÇÃO DE FAVORITOS
    # ============================================================
    def remove_favorite(self, user_id: str, tool_id: int) -> None:
        self.client.table("favorite").delete().eq("user_id", user_id).eq("tool_id", tool_id).execute()