from logging518 import log

try:
    from .celery_tasks import celery_app
    __all__ = ('celery_app',)
except Exception as ex:
    log.exception(ex)
