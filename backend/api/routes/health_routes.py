from fastapi import APIRouter
from database.config import supabase
 
router = APIRouter(tags=["health"])
 
# ============================================================
# HEALTH CHECK — MONITORAMENTO DO SERVIÇO
# Usado pelo Render para verificar se a API está no ar.
# Testa também a conectividade com o banco de dados.
# ============================================================
 
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
 
