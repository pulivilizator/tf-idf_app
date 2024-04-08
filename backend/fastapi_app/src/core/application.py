from fastapi import FastAPI
from starlette.middleware.cors import CORSMiddleware

import logging

from src.core.config import config
from src.core.lifetime import sturtup, shutdown
from src.core.urls import urls


def get_app() -> FastAPI:
    logging.basicConfig(level=logging.WARNING,
                        format='[#{levelname} - {asctime}]\n{filename} - {name}|{funcName} - {lineno}: {message}\n',
                        style='{')

    app = FastAPI(
        title='read_site',
        docs_url='/docs',
        openapi_url='/openapi.json'
    )

    origins = ['http://localhost:3000', 'http://localhost',
               f'http://{config.FRONTEND_HOST}:{config.FRONTEND_PORT}']

    app.include_router(urls)
    app.add_middleware(
        CORSMiddleware,
        allow_origins=origins,
        allow_credentials=True,
        allow_methods=['*'],
        allow_headers=['*'],
    )

    app.add_event_handler('startup', sturtup(app))
    app.add_event_handler('shutdown', shutdown(app))

    return app


app = get_app()
