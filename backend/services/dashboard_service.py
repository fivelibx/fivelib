from repositories.dashboard_repository import DashboardRepository

class DashboardService:
    def __init__(self, repository: DashboardRepository):
        self.repository = repository

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