from repositories.dashboard_repository import DashboardRepository

class DashboardService:
    def __init__(self, repository: DashboardRepository):
        self.repository = repository

    # ============================================================
    # CONSOLIDAÇÃO DE MÉTRICAS GERAIS DO DASHBOARD
    # ============================================================
    def get_general_stats(self) -> dict:
        total_users = self.repository.get_total_users()
        active_tools = self.repository.get_active_tools()
        pending_tickets = self.repository.get_pending_tickets()
        total_tickets = self.repository.get_total_tickets()

        return {
            "total_usuarios": total_users,
            "ferramentas_ativas": active_tools,
            "tickets_pendentes": pending_tickets,
            "total_suporte": total_tickets
        }

    # ============================================================
    # CONSOLIDAÇÃO DE DADOS DA BIBLIOTECA DO USUÁRIO
    # ============================================================
    def get_user_library(self, user_id: str) -> dict:
        favoritos = self.repository.get_user_favorites(user_id)
        links_privados = self.repository.get_user_private_links(user_id)
        
        return {
            "favoritos": favoritos,
            "links_privados": links_privados
        }

    # ============================================================
    # GERENCIAMENTO DE LINKS PRIVADOS (CRUD — CAMADA DE SERVIÇO)
    # ============================================================
    def create_private_link(self, user_id: str, data: dict) -> dict:
        return self.repository.create_private_link(user_id, data)

    def delete_private_link(self, user_id: int, link_id: int) -> None:
        self.repository.delete_private_link(user_id=user_id, link_id=link_id)

    # ============================================================
    # REMOÇÃO DE FAVORITOS (CAMADA DE SERVIÇO)
    # ============================================================
    def remove_tool_from_favorites(self, user_id: str, tool_id: int) -> None:
        self.repository.remove_favorite(user_id, tool_id)