from pydantic_settings import BaseSettings, SettingsConfigDict
from supabase import create_client, Client

class Settings(BaseSettings):
    SUPABASE_URL: str = ""
    SUPABASE_KEY: str = ""

    model_config = SettingsConfigDict(
        env_file=".env",
        env_file_encoding="utf-8",
        extra="ignore"
    )

settings = Settings()

supabase: Client = create_client(settings.SUPABASE_URL, settings.SUPABASE_KEY)