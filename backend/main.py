from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Rotas da API
from api.routes.health import router as health_router

app = FastAPI(
    title="FiveLib API",
    description="Backend para a plataforma Fivelib.",
    version="0.1.0"
)

#NOTE: Configuração de CORS (Essencial para não dar erro no React/Frontend depois)
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], #NOTE: Em produção, será eventualmente trocado pela URL do frontend.
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# NOTE: Registro dos roteadores.
app.include_router(health_router)