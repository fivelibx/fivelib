import os
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

# Rotas da API
from api.routes.health import router as health_router
from api.auth import router as auth_router
from api.routes.users import router as users_router
from api.routes.tools import router as tools_router
from api.routes.dashboard import router as dashboard_router

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

@app.get("/")
async def root():
    return {"message": "FiveLib API is running"}

# NOTE: Registro dos roteadores com o prefixo da versão.
app.include_router(health_router, prefix="/api/v1/health")
app.include_router(auth_router, prefix="/api/v1/auth")
app.include_router(users_router, prefix="/api/v1/users")
app.include_router(tools_router, prefix="/api/v1/resources", tags=["Tools"])
app.include_router(dashboard_router, prefix="/api/v1/dashboard", tags=["Dashboard"])