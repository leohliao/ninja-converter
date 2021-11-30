# Ninja Converter Server:

## Requirements:
- Python: 3.8.1+
- Pip: 20.1.1+
- Django: 3.2.9+
- Virtualenv 15.1.0+
- Cloudinary
- PDF2Image: 1.16.0 [URL](https://pdf2image.readthedocs.io/en/latest/reference.html)
## Project Setup

```bash
# Navigate to ninja-converter/client
$ cd ninja-converter/server
# Define environment variables
$ mkdir app/env
$ touch app/env/.env
$ echo "REDIS_CACHE_HOST=redis://redis:6379 \n
DB_URL=sqlite:///:memory \n
CLOUD_NAME=<cloud_name> \n
API_KEY=<api_key> \n
API_SECRET=<api_secrect>" >> app/env/.env
# ==>> API credentials will be provided separately <<==

# To Setup the virtual environment
$ virtualenv --python python3 venv
$ source venv/bin/activate
# To install modules
$ pip install -r requirements.txt
# To migrate all the tables
$ python manage.py migrate
# To create superuser (will prompt you to enter name, email and password)
$ python manage.py createsuperuser
# To run the server
$ MODE=local python manage.py runserver
```

## Useful URLS
- http://localhost:8000/api/ (To display a list of endpoints)
- http://localhost:8000/admin/ (you can log in using your superuser credentials)


## Endpoints
- '/api/' - `Display routes`
- '/api/files' - `Display files (each pdf is a file)`
- '/api/files/<id>' - `Display a single file`
- '/api/files/<id>/images' - `Display images that belongs to the file`
- '/api/file/upload' - `Uploads pdf to create images`
- '/api/image/<id>' - `Display a specific image`