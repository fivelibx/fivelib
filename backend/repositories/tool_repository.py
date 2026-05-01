from supabase import Client

class ToolRepository:
    def __init__(self, db: Client):
        self.db = db

    def get_all(self):
        response = self.db.table("tool").select("*").execute()
        return response.data