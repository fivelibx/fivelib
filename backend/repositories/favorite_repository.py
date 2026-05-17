from supabase import Client

class FavoriteRepository:
    def __init__(self, client: Client):
        self.client = client
        self.table = "favorite"

    def list_ids_by_user(self, usuario_id:int)->list[int]:
        res = (
            self.client.table(self.table)
            .select("ferramentaa_id")
            .eq("usuario_id", usuario_id)
            .execute()
        )
        return [row["ferramenta_id"] for row in (res.data or [])]
    
    def exists(self, usuario_id:int, ferramenta_id:int)->bool:
        res=(
            self.client.table(self.table)
            .select("ferramenta_id")
            .eq("usuario_id", usuario_id)
            .eq("ferramenta_id", ferramenta_id)
            .execute()
        )
        return bool(res.data)
    
    def add(self, usuario_id:int, ferramenta_id:int)->None:
        self.client.table(self.table).insert({
            "usuario_id":usuario_id,
            "ferramenta_id":ferramenta_id,
        }).execute()

    def remove(self, usuario_id:int, ferramenta_id:int)->bool:
        res = (
            self.client.table(self.table)
            .delete()
            .eq("usuario_id", usuario_id)
            .eq("ferramenta_id", ferramenta_id)
            .execute()
        )

        return bool(res.data)


