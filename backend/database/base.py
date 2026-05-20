from supabase import create_client, Client
from .config import settings

# ============================================================
# INICIALIZAÇÃO DO CLIENTE GLOBAL DO SUPABASE
# ============================================================
supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)

# ============================================================
# INJEÇÃO DE DEPENDÊNCIA DO CLIENTE
# ============================================================
def get_supabase() -> Client:
    return supabase