from django.shortcuts import render
from django.http import JsonResponse

# Create your views here.
def getRoutes(request):
    routes = [
        '/api/files/',
        '/api/files/create',
        '/api/files/upload',
        '/api/files/<id>/',
        '/api/files/delete/<id>/',
        '/api/files/update/<id>/',
        '/api/images/'
        '/api/images/create'
    ]
    return JsonResponse(routes, safe=False)