# Use an official Python runtime based on Debian 10 "buster" as a parent image.
FROM python:3.8.1

ENV PYTHONUNBUFFERED=1

RUN apt-get update --yes --quiet && apt-get install --yes --quiet --no-install-recommends libreoffice \
    python3-uno unoconv \
    && rm -rf /var/lib/apt/lists/*
# Install the application server.
RUN pip install "gunicorn==20.0.4"

COPY server/requirements.txt /server/

COPY server/wsgi-entrypoint.sh /server/

COPY server/app/env /server/app/env

RUN pip install --upgrade pip -r server/requirements.txt

RUN chmod +x server/wsgi-entrypoint.sh

WORKDIR /server

EXPOSE 8000

CMD set -xe; gunicorn --bind 0.0.0.0:8000 --workers 5 app.wsgi:application
