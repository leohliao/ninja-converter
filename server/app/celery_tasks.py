from logging518 import log
import os
from celery import Celery

celery_app = Celery('ninja-converter')
celery_app.conf.broker_url = os.getenv('REDIS_CACHE_HOST')
celery_app.conf.result_backend = os.getenv('REDIS_CACHE_HOST')

celery_app.autodiscover_tasks()

@celery_app.task(bind=True)
def debug_task(self):
    log.info(f'Request: {self.request!r}')
