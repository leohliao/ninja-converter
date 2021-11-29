from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers.serializers import FileSerializer, ImageSerializer
from .models.models import File, Image
from datetime import datetime
from logging518 import log
from .utils import views_util

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
    log.info(f"get_routes initiated.... request: {request}")
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
    log.info(f"get_files initiated.... request: {request}")
    files = File.objects.all()
    serializer = FileSerializer(files, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_file(request, pk):
    log.info(f"get_file initiated.... request: {request}")
    file = File.objects.get(id=pk)
    serializer = FileSerializer(file, many=False)
    return Response(serializer.data)


@api_view(['GET'])
def get_images(request, pk):
    log.info(f"get_images initiated.... request: {request}")
    images = Image.objects.filter(file_id=pk)
    serializer = ImageSerializer(images, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def get_image(request, pk):
    log.info(f"get_image initiated.... request: {request}")
    try:
        if not pk:
            raise Exception('Image Id is not being provided')
        image = Image.objects.filter(id=pk).first()
        serializer = ImageSerializer(image, many=False)
        return Response(serializer.data)
    except Exception as ex:
        log.error(f"getImage => error: {ex}")
        return Response({
            'status': 'error',
            'msg': 'Cannot retrieve image'
        }, status=301)


@api_view(['POST'])
def upload_file(request):
    log.info(f"upload_file initiated.... request: {request}")
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
        # Start asynchronous conversion
        views_util.upload_images_to_cloudinary(
            request, 
            upload_file, 
            last_modified_date
        )
        return Response({
            'status': 'success',
            'msg': 'File has been converted successfully'
        }, status=201)
    except Exception as ex:
        return Response({
            'status': 'error',
            'msg': ex
        }, status=201)
