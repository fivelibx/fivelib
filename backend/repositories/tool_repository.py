from supabase import Client

class ToolRepository:
    def __init__(self, client: Client):
        self.client = client
        self.table = "tool" 
        
    def get_all(self):
        response = self.client.table(self.table).select("*").execute()
        return response.data

    def get_by_id(self, tool_id: int):
        response = self.client.table(self.table).select("*").eq("id", tool_id).execute()
        return response.data[0] if response.data else None

    def update_stars(self, tool_id: int, new_stars: int):
        response = self.client.table(self.table).update({"stars": new_stars}).eq("id", tool_id).execute()
        return response.data
    def create(self, data: dict):
        if "id" in data and (data["id"] is None or data["id"] == 0):
            data.pop("id")
        resultado = self.client.table(self.table).insert(data).execute()
        return resultado.data
    def delete(self, tool_id: int):
        resultado = self.client.table(self.table).delete().eq("id", tool_id).execute()
        return resultado.data