import asyncio
import json
import logging
import math
from typing import Tuple, Any

from src.db.redis_db import RedisDB
from src.tasks.tasks import create_table

logger = logging.getLogger(__name__)


async def process_create_file(file: bytes, files_keys: str, new_key: str):
    source_text = replace_punctuation(file.decode('utf-8-sig'))
    logger.info('Processing create file started')
    await create_table.kiq(source_text, new_key, json.loads(files_keys))
    logger.info('Processing create file ended')


async def process_get_table(file_key: str, other_keys: list[str]):
    logger.info('Processing get started')
    r = RedisDB()
    raw_count_words = await r.get_counter_words(file_key=file_key)
    logger.info(f'raw_count_words:\n{raw_count_words}')
    words_counter = [
        {
            'word': el.split(':')[0],
            'count': el.split(':')[1],
            'length': el.split(':')[2]
        }
        for el in raw_count_words
    ]

    logger.info('Processing get idfs started')

    idfs = await get_idfs(other_keys, words_counter, r)
#
    logger.info('Processing get idfs ended')

    sorted_table = sorted(idfs, key=lambda x: x['idf'], reverse=True)

    return sorted_table


async def get_idfs(other_keys: list, words_counter: list, r: RedisDB) -> tuple[Any]:
    logger.info('idfs in process')
    logger.info(f'idfs words_counter:\n{words_counter}')
    idfs = await asyncio.gather(
        *[
            asyncio.create_task(idf_for_word(word=word,
                                             keys=other_keys,
                                             r=r))
            for word in words_counter
        ]
    )
    logger.info(f'idfs finished\nidfs:{idfs}')

    return idfs


async def idf_for_word(word: dict, keys: list, r: RedisDB):
    count_words_in_documents = await asyncio.gather(
        *[asyncio.create_task(
            r.exists_word_in_documents(key=key, word=word['word']))
          for key in keys]
    )

    df = len(keys) / sum(count_words_in_documents) \
        if sum(count_words_in_documents) else 1

    return {'word': word['word'],
            'tf': round(int(word['count']) / int(word['length']), 4),
            'idf': round(math.log(df, 10), 4)}


def replace_punctuation(text: str) -> str:
    for i in '.,!&/?#№"\':;':
        text = text.replace(i, '')
    return text
