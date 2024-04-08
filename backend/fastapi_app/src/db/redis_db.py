from typing import Iterable

from redis.asyncio import Redis
import asyncio

from src.core.config import config


class RedisDB:
    def __new__(cls):
        if not hasattr(cls, 'instance'):
            cls.instance = super(RedisDB, cls).__new__(cls)
        return cls.instance

    def __init__(self):
        self._r = self._create_session()

    async def set_counter_words(self, file_key: str, data: list):
        await self._r.lpush(file_key + ':list_counter', *data)
        await self._r.expire(file_key + ':list_counter', time=300000)

    async def get_counter_words(self, file_key: str):
        raw_counter = await self._r.lrange(file_key + ':list_counter', 0, -1)
        return [word.decode('utf-8-sig') for word in raw_counter]

    async def words_counter_exists(self, file_key: str):
        return await self._r.exists(file_key + ':list_counter')

    async def sadd_data(self, file_key: str, words: Iterable):
        await self._r.sadd(file_key + ':set_words', *words)
        await self._r.expire(name=file_key + ':set_words', time=300000)

    async def exists_word_in_documents(self, key: str, word: str):
        return await self._r.sismember(key + ':set_words', word)

    async def remove_key(self, file_key: str):
        await self._r.delete(file_key + ':set_words')
        await self._r.delete(file_key + ':list_counter')

    def _create_session(self):
        if '_r' in self.__dict__:
            return self._r
        return Redis(host=config.REDIS_HOST,
                     port=config.REDIS_PORT,
                     db=config.REDIS_DB)

    async def close(self):
        await self._r.aclose()
