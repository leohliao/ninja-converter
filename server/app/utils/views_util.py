from celery import shared_task
import cloudinary.uploader
from pdf2image import convert_from_bytes
from app.models.models import File, Image
from logging518 import log
import io

@shared_task
def upload_images_to_cloudinary(request, upload_file, last_modified_date):
    try: 
        images = convert_from_bytes(upload_file.read())
        log.info(f"upload_file: {upload_file}")
        author = None if request.user.is_anonymous else request.user

        if images:
            new_file = File.objects.create(
                title=upload_file.name,
                size=upload_file.size,
                type=upload_file.content_type,
                last_modified_date=last_modified_date,
                user=author,
                total_pages=len(images)
            )
            for idx in range(len(images)):
                image = images[idx]
                image_in_bytes = io.BytesIO()
                image.save(image_in_bytes, format='PNG')
                image_in_bytes = image_in_bytes.getvalue()
                res = cloudinary.uploader.upload(
                    image_in_bytes, folder="ninja-converter",)
                if res:
                    img_obj = Image.objects.create(
                        file_id=new_file,
                        image_url=res.get('url')
                    )
                    if idx == 0:
                        new_file.cover_image = img_obj
                        new_file.save()
    except Exception as ex:
        log.error(f"last_modified_date: {last_modified_date}")
        log.error(f"images: {images}")
        log.error(f"request.user: {request.user}")
        log.error(f"ex: {ex}")
        return ex
