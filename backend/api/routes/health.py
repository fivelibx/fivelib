from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import text
from backend.database.config import get_db

router = APIRouter(prefix="/health", tags=["health"])

@router.get("/")
def health_check(db: Session = Depends(get_db)):
    try:
        #NOTE: Executa uma consulta simples para validar a conectividade com o banco
        db.execute(text("SELECT 1"))
        db_status = "ok"
    except Exception as e:
        #NOTE: Em caso de falha na conexão ou timeout
        db_status = f"unreachable: {str(e)}"
    
    return {
        "status": "OK",
        "database": db_status,
        "service": "running"
    }