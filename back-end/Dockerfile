FROM python:3.8-buster

ENV PYTHONDONTWRITEBYTECODE 1
ENV PYTHONUNBUFFERED 1

WORKDIR /code

COPY back-end/Pipfile* ./

RUN pip install pipenv && pipenv install --system --deploy --dev

COPY back-end .
