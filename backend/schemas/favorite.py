from pydantic import BaseModel

class FavoriteCreate(BaseModel):
    ferramenta_id: int

class FavoriteIdsResponse(BaseModel):
    ferramenta_ids:list[int]

