import taskiq_fastapi
from taskiq_nats import NatsBroker
from taskiq_redis import RedisAsyncResultBackend
from src.core.config import config

broker = (NatsBroker(
    config.NATS_URL,
    queue="fastapi_app_queue").with_result_backend(RedisAsyncResultBackend(redis_url=config.REDIS_URL)))
taskiq_fastapi.init(broker, "src.core.application:app")
