from fastapi import FastAPI
from redis.asyncio import Redis

from src.core.config import config
from src.core.tkq import broker
from src.db.redis_db import RedisDB


async def startup_redis(app: FastAPI) -> None:
    app.state.r = RedisDB()


async def shutdown_redis(app: FastAPI) -> None:
    await app.state.r.close()


async def startup_taskiq() -> None:
    if not broker.is_worker_process:
        await broker.startup()


async def shutdown_taskiq() -> None:
    if not broker.is_worker_process:
        await broker.shutdown()


def sturtup(app: FastAPI):
    async def _sturtup():
        await startup_taskiq()
        await startup_redis(app)

    return _sturtup


def shutdown(app: FastAPI):
    async def _shutdown():
        await shutdown_taskiq()
        await shutdown_redis(app)

    return _shutdown
