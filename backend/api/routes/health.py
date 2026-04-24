from fastapi import APIRouter

router = APIRouter(prefix="/health", tags=["health"])

@router.get("/")
def health_check():
    return {
        "status": "OK",
        "database": "untested", #TODO: Atualizar após subir banco está configurado.
        "service": "running" 
    }

