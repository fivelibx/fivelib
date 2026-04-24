from fastapi import APIRouter, Depends, HTTPException
from api.auth import oauth2_scheme

router = APIRouter()

@router.get("/me")
async def read_users_me(token: str = Depends(oauth2_scheme)):
    return {"user": "Lucas", "token_received": token}