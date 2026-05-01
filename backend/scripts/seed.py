import os
from dotenv import load_dotenv
from supabase import create_client

load_dotenv()

supabase = create_client(os.getenv("SUPABASE_URL"), os.getenv("SUPABASE_KEY"))

# -- lista de ferramentas --
ferramentas = [
    {"nome": "React", "categoria": "Frontend", "linguagem": "JavaScript", "status_ativo": True, "stars": 0, "descricao": "Biblioteca JavaScript para construção de interfaces de usuário baseadas em componentes.", "url_oficial": "https://react.dev"},
    {"nome": "FastAPI", "categoria": "Backend", "linguagem": "Python", "status_ativo": True, "stars": 0, "descricao": "Framework web moderno e de alta performance para construção de APIs com Python.", "url_oficial": "https://fastapi.tiangolo.com"},
    {"nome": "Docker", "categoria": "DevOps", "linguagem": "Go", "status_ativo": True, "stars": 0, "descricao": "Plataforma para desenvolvimento, envio e execução de aplicações em containers.", "url_oficial": "https://www.docker.com"},
    {"nome": "PostgreSQL", "categoria": "Database", "linguagem": "C", "status_ativo": True, "stars": 0, "descricao": "Sistema de gerenciamento de banco de dados relacional de código aberto.", "url_oficial": "https://www.postgresql.org"},
    {"nome": "SQLAlchemy", "categoria": "Backend", "linguagem": "Python", "status_ativo": True, "stars": 0, "descricao": "Toolkit SQL e ORM para Python.", "url_oficial": "https://www.sqlalchemy.org"},
    {"nome": "Next.js", "categoria": "Frontend", "linguagem": "JavaScript", "status_ativo": True, "stars": 0, "descricao": "Framework React com suporte a SSR e SSG.", "url_oficial": "https://nextjs.org"},
    {"nome": "Tailwind CSS", "categoria": "Frontend", "linguagem": "CSS", "status_ativo": True, "stars": 0, "descricao": "Framework CSS utilitário para criação rápida de interfaces.", "url_oficial": "https://tailwindcss.com"},
    {"nome": "Pydantic", "categoria": "Backend", "linguagem": "Python", "status_ativo": True, "stars": 0, "descricao": "Validação de dados e configurações usando type hints.", "url_oficial": "https://docs.pydantic.dev"},
    {"nome": "Prisma", "categoria": "Database", "linguagem": "TypeScript", "status_ativo": True, "stars": 0, "descricao": "ORM de próxima geração para Node.js e TypeScript.", "url_oficial": "https://www.prisma.io"},
    {"nome": "Redis", "categoria": "Database", "linguagem": "C", "status_ativo": True, "stars": 0, "descricao": "Banco de dados em memória de alta performance.", "url_oficial": "https://redis.io"},
    {"nome": "Celery", "categoria": "DevOps", "linguagem": "Python", "status_ativo": True, "stars": 0, "descricao": "Sistema de filas de tarefas distribuídas.", "url_oficial": "https://docs.celeryq.dev"},
    {"nome": "TypeScript", "categoria": "Frontend", "linguagem": "TypeScript", "status_ativo": True, "stars": 0, "descricao": "Superset tipado do JavaScript.", "url_oficial": "https://www.typescriptlang.org"},
    {"nome": "Alembic", "categoria": "Backend", "linguagem": "Python", "status_ativo": True, "stars": 0, "descricao": "Ferramenta de migração de banco de dados.", "url_oficial": "https://alembic.sqlalchemy.org"},
    {"nome": "Jest", "categoria": "Frontend", "linguagem": "JavaScript", "status_ativo": True, "stars": 0, "descricao": "Framework de testes JavaScript.", "url_oficial": "https://jestjs.io"},
    {"nome": "Pytest", "categoria": "Backend", "linguagem": "Python", "status_ativo": True, "stars": 0, "descricao": "Framework de testes para Python.", "url_oficial": "https://pytest.org"}
]

def seed():
    print("🌱 Sincronizando banco de dados (Upsert)...")
    
    # -- executa upsert baseado no nome --
    response = supabase.table("tool").upsert(
        ferramentas, 
        on_conflict="nome"
    ).execute()
    
    print(f"✅ Sincronização concluída: {len(response.data)} registros processados.")

if __name__ == "__main__":
    seed()