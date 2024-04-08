from pydantic_settings import BaseSettings


class RedisSettings(BaseSettings):
    REDIS_HOST: str
    REDIS_PORT: int
    REDIS_DB: int
    REDIS_URL: str


class NATSSettings(BaseSettings):
    NATS_HOST: str
    NATS_PORT: int
    NATS_URL: str


class FrontendSettings(BaseSettings):
    FRONTEND_HOST: str
    FRONTEND_PORT: str


class AppSettings(RedisSettings, NATSSettings, FrontendSettings):
    API_PREFIX: str

    class Config:
        env_file = ".env"
        case_sensitive = True


config = AppSettings()
