import os
from dotenv import load_dotenv
from supabase import create_client

load_dotenv()

supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))

ferramentas = [
    {
        "nome": "React",
        "descricao": "Biblioteca JavaScript para construção de interfaces de usuário baseadas em componentes.",
        "url_oficial": "https://react.dev",
        "linguagem": "JavaScript",
        "status_ativo": True
    },
    {
        "nome": "FastAPI",
        "descricao": "Framework web moderno e de alta performance para construção de APIs com Python.",
        "url_oficial": "https://fastapi.tiangolo.com",
        "linguagem": "Python",
        "status_ativo": True
    },
    {
        "nome": "Docker",
        "descricao": "Plataforma para desenvolvimento, envio e execução de aplicações em containers.",
        "url_oficial": "https://www.docker.com",
        "linguagem": "Go",
        "status_ativo": True
    },
    {
        "nome": "PostgreSQL",
        "descricao": "Sistema de gerenciamento de banco de dados relacional de código aberto e altamente extensível.",
        "url_oficial": "https://www.postgresql.org",
        "linguagem": "C",
        "status_ativo": True
    },
    {
        "nome": "SQLAlchemy",
        "descricao": "Toolkit SQL e ORM para Python, oferecendo controle total sobre o banco de dados.",
        "url_oficial": "https://www.sqlalchemy.org",
        "linguagem": "Python",
        "status_ativo": True
    },
    {
        "nome": "Next.js",
        "descricao": "Framework React com suporte a SSR e SSG para aplicações web modernas.",
        "url_oficial": "https://nextjs.org",
        "linguagem": "JavaScript",
        "status_ativo": True
    },
    {
        "nome": "Tailwind CSS",
        "descricao": "Framework CSS utilitário para criação rápida de interfaces customizadas.",
        "url_oficial": "https://tailwindcss.com",
        "linguagem": "CSS",
        "status_ativo": True
    },
    {
        "nome": "Pydantic",
        "descricao": "Biblioteca Python para validação de dados e configurações usando type hints.",
        "url_oficial": "https://docs.pydantic.dev",
        "linguagem": "Python",
        "status_ativo": True
    },
    {
        "nome": "Prisma",
        "descricao": "ORM de próxima geração para Node.js e TypeScript com foco em produtividade.",
        "url_oficial": "https://www.prisma.io",
        "linguagem": "TypeScript",
        "status_ativo": True
    },
    {
        "nome": "Redis",
        "descricao": "Banco de dados em memória de alta performance usado para cache e filas.",
        "url_oficial": "https://redis.io",
        "linguagem": "C",
        "status_ativo": True
    },
    {
        "nome": "Celery",
        "descricao": "Sistema de filas de tarefas distribuídas para Python.",
        "url_oficial": "https://docs.celeryq.dev",
        "linguagem": "Python",
        "status_ativo": True
    },
    {
        "nome": "TypeScript",
        "descricao": "Superset tipado do JavaScript que compila para JavaScript puro.",
        "url_oficial": "https://www.typescriptlang.org",
        "linguagem": "TypeScript",
        "status_ativo": True
    },
    {
        "nome": "Alembic",
        "descricao": "Ferramenta de migração de banco de dados para SQLAlchemy.",
        "url_oficial": "https://alembic.sqlalchemy.org",
        "linguagem": "Python",
        "status_ativo": True
    },
    {
        "nome": "Jest",
        "descricao": "Framework de testes JavaScript com foco em simplicidade.",
        "url_oficial": "https://jestjs.io",
        "linguagem": "JavaScript",
        "status_ativo": True
    },
    {
        "nome": "Pytest",
        "descricao": "Framework de testes para Python, simples e escalável.",
        "url_oficial": "https://pytest.org",
        "linguagem": "Python",
        "status_ativo": True
    }
]

def seed():
    print("🌱 Iniciando seed do banco de dados...")
    
    # Limpa a tabela antes de inserir
    supabase.table("tool").delete().neq("id", 0).execute()
    print("🗑️  Tabela limpa.")

    response = supabase.table("tool").insert(ferramentas).execute()
    
    print(f"✅ {len(response.data)} ferramentas inseridas com sucesso!")

if __name__ == "__main__":
    seed()