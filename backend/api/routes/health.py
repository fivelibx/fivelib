from fastapi import APIRouter
from database.config import supabase

router = APIRouter(prefix="/health", tags=["health"])

@router.get("/")
def health_check():
    try:
        supabase.table("tool").select("count", count="exact").limit(1).execute()
        db_status = "running"
    except Exception as e:
        db_status = f"unreachable: {str(e)}"
    
    return {
        "status": "OK",
        "database": db_status,
        "service": "running"
    }