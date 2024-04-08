import asyncio
import json
import logging
from typing import Annotated, Optional, List

from fastapi import APIRouter, File, Form, Path, Depends, Query
from starlette.requests import Request

from src.db.redis_db import RedisDB
from src.service.file_handler import process_create_file, process_get_table

logger = logging.getLogger(__name__)

router = APIRouter()


@router.post("/files/")
async def create_file(file: Annotated[bytes, File()],
                      fileKey: str = Form(...),
                      keys: str = Form(...)):
    logger.info("creating file")
    await process_create_file(file, files_keys=keys, new_key=fileKey)
    return


@router.get("/table/{file_key}")
async def get_table(keys: str, file_key: str = Path(...)):
    keys = json.loads(keys)
    logger.info("getting table process")
    if not keys:
        logger.info('keys is not\nRETURNED')
        return
    table = await process_get_table(file_key=file_key, other_keys=keys)
    if not table:
        return
    return table


@router.get('/file_is_ready/{file_key}/')
async def exists_file(file_key: str = Path(...)):
    r = RedisDB()
    status = await r.words_counter_exists(file_key)
    return {'status': 'ready' if status else 'processing'}
