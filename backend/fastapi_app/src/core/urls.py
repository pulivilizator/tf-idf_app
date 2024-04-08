from fastapi import APIRouter

from src.api.v1.files import router as test_router
from src.core.config import config

urls = APIRouter(prefix=config.API_PREFIX)

urls.include_router(test_router, tags=['Tests'])
