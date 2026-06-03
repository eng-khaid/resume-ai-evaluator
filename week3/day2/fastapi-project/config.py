from pydantic_settings import BaseSettings
from functools import lru_cache

class Settings(BaseSettings):
    app_name: str = "My API"
    database_url: str = "sqlite:///./app.db"
    secret_key: str = "change-me"
    debug: bool = False

    class Config:
        env_file = ".env"


@lru_cache()
def get_settings():
    return Settings()