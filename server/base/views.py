from rest_framework.decorators import api_view
import cloudinary.uploader
from rest_framework.response import Response
from .serializers import FileSerializer, ImageSerializer
from .models import File, Image

# TODO:
import json

# Create your views here.
@api_view(['GET'])
def getRoutes(request):
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
def getFiles(request):
    files = File.objects.all()
    serializer = FileSerializer(files, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getFile(request, pk):
    file = File.objects.get(id=pk)
    serializer = FileSerializer(file, many=False)
    return Response(serializer.data)
    # with open('/Users/liaol/Development/ninja-converter/server/base/testData/model_file.json') as rawData:
    #     files = json.load(rawData)
    #     for f in files:
    #         if str(f.get('id')) == pk:
    #             file = f
    #             break
    # return Response(file)


@api_view(['GET'])
def getImages(request, pk):
    print(f'pk: {pk}')
    images = Image.objects.filter(file_id=pk)
    print(f"images: {images}")
    serializer = ImageSerializer(images, many=True)
    return Response(serializer.data)


@api_view(['GET'])
def getImage(request, pk):
    print("getImage")
    print(f'pk: {pk}')
    image = Image.objects.filter(id=pk).first()
    print(f"image: {image}")
    serializer = ImageSerializer(image, many=False)
    return Response(serializer.data)


@api_view(['POST'])
def uploadFile(request):
    # def uploadImage(request):
    print(f'uploadFile:  request => {request}')
    file = request.data.get('file')
    print(f'uploadFile: {file}')
    # Categorize the data (pdf or pptx)
    # Determine which library to use
    # Convert the file into images
    # Upload those images to cloudinary and create image object
    return Response({
        'status': 'success'
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
