import asyncio
import logging
from collections import Counter

from src.core.tkq import broker
from src.db.redis_db import RedisDB

logger = logging.getLogger(__name__)

@broker.task
async def create_table(text: str, new_key: str, files_keys: list):
    r = RedisDB()
    if await r.words_counter_exists(file_key=new_key):
        return 
    logger.info("process creating table started")
    words_counter = Counter(text.split())

    logger.info("creating table words_counter created")

    await r.sadd_data(file_key=new_key, words=list(words_counter.keys()))

    logger.info("creating table words_counter was set")

    text_length = len(text.split())
    await r.set_counter_words(new_key,
                              [f'{word}:{words_counter[word]}:{text_length}'
                                for word in words_counter])
    logger.info("process creating table ended")
