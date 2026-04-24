import asyncio
import os
import sys
from logging.config import fileConfig

from alembic import context
from sqlalchemy import pool
from sqlalchemy.ext.asyncio import async_engine_from_config

# ==========================================
# 1. CONFIGURAÇÃO DE CAMINHOS (PATH)
# ==========================================
# Adiciona a raiz do projeto (pasta backend) ao sys.path para garantir as importações
sys.path.insert(0, os.path.realpath(os.path.join(os.path.dirname(__file__), '..')))

# ==========================================
# 2. IMPORTAÇÕES DO PROJETO
# ==========================================
from database.config import settings
from database.base import Base

# ==========================================
# 3. CONFIGURAÇÃO CENTRAL DO ALEMBIC
# ==========================================
config = context.config

# Configuração de Logs nativa do Alembic
if config.config_file_name is not None:
    fileConfig(config.config_file_name)

config.set_main_option("sqlalchemy.url", settings.DATABASE_URL)

# Define o alvo dos metadados para o 'autogenerate' ler as suas tabelas
target_metadata = Base.metadata

# ==========================================
# 4. FUNÇÕES DE MIGRAÇÃO (ASYNC AWARE)
# ==========================================

def run_migrations_offline() -> None:
    """Executa as migrações no modo 'offline'"""
    url = config.get_main_option("sqlalchemy.url")
    context.configure(
        url=url,
        target_metadata=target_metadata,
        literal_binds=True,
        dialect_opts={"paramstyle": "named"},
    )

    with context.begin_transaction():
        context.run_migrations()


def do_run_migrations(connection):
    """Função auxiliar exigida pelo SQLAlchemy 2.0 para rodar contexto síncrono em ambiente async."""
    context.configure(connection=connection, target_metadata=target_metadata)
    with context.begin_transaction():
        context.run_migrations()


async def run_migrations_online() -> None:
    """Executa as migrações no modo 'online' conectado ao banco assíncrono."""
    connectable = async_engine_from_config(
        config.get_section(config.config_ini_section, {}),
        prefix="sqlalchemy.",
        poolclass=pool.NullPool,
    )

    async with connectable.connect() as connection:
        # A ponte entre o mundo async do motor e o mundo sync do Alembic
        await connection.run_sync(do_run_migrations)

    await connectable.dispose()


# Ponto de entrada do script
if context.is_offline_mode():
    run_migrations_offline()
else:
    asyncio.run(run_migrations_online())