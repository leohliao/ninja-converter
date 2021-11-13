from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
import cloudinary.uploader
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework.parsers import MultiPartParser, JSONParser
import json

# Create your views here.
@api_view(['GET'])
def getRoutes(request):
    routes = [
        '/api/files/',
        '/api/files/create',
        '/api/files/upload',
        '/api/files/<id>',
        '/api/files/<id>/images'
        '/api/files/delete/<id>',
        '/api/files/update/<id>',
        '/api/image/upload'
    ]
    return Response(routes)


@api_view(['GET'])
def getFiles(request):
    with open('/Users/liaol/Development/ninja-converter/server/base/testData/model_file.json') as rawData:
        data = json.load(rawData)
    return Response(data)


@api_view(['GET'])
def getFile(request, pk):
    file = None

    with open('/Users/liaol/Development/ninja-converter/server/base/testData/model_file.json') as rawData:
        files = json.load(rawData)
        for f in files:
            if str(f.get('id')) == pk:
                file = f
                break
    return Response(file)


@api_view(['GET'])
def getImages(request, pk):
    with open('/Users/liaol/Development/ninja-converter/server/base/testData/model_image.json') as rawData:
        rawImages = json.load(rawData)
        print(f"rawImages: {rawImages}")
        images = [image for image in rawImages if str(image.get('file_id')) == pk]
    return Response(images)


@api_view(['POST'])
def uploadImage(request):
    file = request.data.get('file')
    upload_data = cloudinary.uploader.upload(file)
    return Response({
        'status': 'success',
        'data': upload_data,
    }, status=201)
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
