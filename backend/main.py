import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware


# Rotas da API
from api.routes.health import router as health_router
from api.routes.users import router as users_router

app = FastAPI(
    title="FiveLib API",
    openapi_url="/openapi.json" if os.getenv("ENVIRONMENT") != "production" else None,
    docs_url="/docs" if os.getenv("ENVIRONMENT") != "production" else None,
    redoc_url=None,
    description="Backend para a plataforma Fivelib.",
    version="0.1.0"
)

allowed_origins = os.getenv("ALLOWED_ORIGINS", "*").split(",")

#NOTE: Configuração de CORS (Essencial para não dar erro no React/Frontend depois)
app.add_middleware(
    CORSMiddleware,
    allow_origins=allowed_origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# NOTE: Registro dos roteadores.
app.include_router(health_router, prefix="/health")
app.include_router(users_router, prefix="/users")