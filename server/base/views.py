from rest_framework.decorators import api_view
import cloudinary.uploader
from rest_framework.response import Response
from .serializers import FileSerializer, ImageSerializer
from .models import File, Image
from pdf2image import convert_from_bytes
from datetime import datetime
import io

SUPPORTED_FILE_FORMAT = [
    'application/pdf', 
    'application/vnd.ms-powerpoint', 
    '.ppt', 
    '.pptx', 
    'application/vnd.openxmlformats-officedocument.presentationml.presentation'
]

# Create your views here.
@api_view(['GET'])
def get_routes(request):
    routes = [
        '/api/files/',
        '/api/files/create',
        '/api/files/<id>',
        '/api/files/<id>/images'
        '/api/files/delete/<id>',
        '/api/files/update/<id>',
        '/api/file/upload',
        '/api/image/<id>'
    ]
    return Response(routes)


@api_view(['GET'])
def get_files(request):
    files = File.objects.all()
    serializer = FileSerializer(files, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_file(request, pk):
    file = File.objects.get(id=pk)
    serializer = FileSerializer(file, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def get_images(request, pk):
    images = Image.objects.filter(file_id=pk)
    serializer = ImageSerializer(images, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_image(request, pk):
    try:
        if not pk:
            raise Exception('Image Id is not being provided')
        image = Image.objects.filter(id=pk).first()
        serializer = ImageSerializer(image, many=False)
        return Response(serializer.data)
    except Exception as ex:
        print(f"getImage => error: {ex}")
        return Response({
            'status': 'error',
            'msg': 'Cannot retrieve image'
        }, status=301)


@api_view(['POST'])
def upload_file(request):
    print("======= uploadFile =======")
    try: 
        upload_file_type = request.data.get('type')
        if upload_file_type not in SUPPORTED_FILE_FORMAT:
            return Response({
                'status': 'error',
                'msg': 'Unsupported file format'
            }, status=201)
        upload_file = request.data.get('file')
        lastModifiedDate = request.data.get('lastModified')
        last_modified_date = datetime.fromtimestamp(int(lastModifiedDate)/1000.0).strftime('%Y-%m-%d %H:%M:%S')
        images = convert_from_bytes(upload_file.read())

        if images:
            new_file = File.objects.create(
                title=upload_file.name,
                size=upload_file.size,
                type=upload_file.content_type,
                last_modified_date=last_modified_date,
                user=request.user,
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

            # Categorize the data (pdf or pptx)
            # Determine which library to use
            # Convert the file into images
            # Upload those images to cloudinary and create image object
        return Response({
            'status': 'success',
            'msg': 'File has been converted successfully'
        }, status=201)
    except Exception as ex:
        return Response({
            'status': 'error',
            'msg': ex
        }, status=201)

    # upload_data = cloudinary.uploader.upload(file)
    # return Response({
    #     'status': 'success',
    #     'data': upload_data,
    # }, status=201)

    # {
    #     "status": "success",
    #     "data": {
    #         "asset_id": "bf823c7a4037b8dd57159c8f0567cd41",
    #         "public_id": "miseqazyi0i5f4beohxz",
    #         "version": 1636762314,
    #         "version_id": "67e726430d7203a601196668131c71e6",
    #         "signature": "64744d88c3daadeaf26d1fe1de4a5c63275d39ff",
    #         "width": 480,
    #         "height": 480,
    #         "format": "jpg",
    #         "resource_type": "image",
    #         "created_at": "2021-11-13T00:11:54Z",
    #         "tags": [],
    #         "bytes": 40869,
    #         "type": "upload",
    #         "etag": "3b885328e1fb09a5ea2969d0b1bf1620",
    #         "placeholder": false,
    #         "url": "http://res.cloudinary.com/leosoba/image/upload/v1636762314/miseqazyi0i5f4beohxz.jpg",
    #         "secure_url": "https://res.cloudinary.com/leosoba/image/upload/v1636762314/miseqazyi0i5f4beohxz.jpg",
    #         "original_filename": "lonely-panda",
    #         "api_key": "547322678191887"
    #     }
    # }
