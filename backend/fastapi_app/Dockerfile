FROM python:3.11.8-slim-bookworm as poetry_venv

ENV POETRY_HOME="/opt/poetry" \
    POETRY_VIRTUALENVS_IN_PROJECT=1 \
    POETRY_NO_INTERACTION=1

ENV PATH="$POETRY_HOME/bin:$PATH"

RUN apt-get update \
    && apt-get install -y --no-install-recommends curl \
    && curl -sSL https://install.python-poetry.org | python3 -

WORKDIR /app

COPY . .

RUN poetry install --no-root --no-ansi

#----------------------------------------------------------------

FROM python:3.11.8-slim-bookworm

ENV PYTHONDONTWRITEBYTECODE=1 \
    PYTHONUNBUFFERED=1 \
    PYTHONPATH="/app" \
    PATH="/app/.venv/bin:$PATH"

WORKDIR /app

COPY --from=poetry_venv /app/.venv ./.venv
COPY . .

EXPOSE 8000

CMD ["python", "-m", "uvicorn", "src.core.application:app", "--host", "0.0.0.0", "--port", "8000"]

