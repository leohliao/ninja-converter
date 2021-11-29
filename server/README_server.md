https://pdf2image.readthedocs.io/en/latest/reference.html

http://localhost:8000/admin/

'/api/files/',
'/api/files/create',
'/api/files/<id>',
'/api/files/<id>/images'
'/api/files/delete/<id>',
'/api/files/update/<id>',
'/api/file/upload',
'/api/image/<id>'

celery -A ninja-converter worker -c 4 -l info

redis-server --port 6379
redis-cli shutdown