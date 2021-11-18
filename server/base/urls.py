from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('files/', views.getFiles, name="get_files"),
    path('file/<str:pk>', views.getFile, name="get_file"),
    path('file/<str:pk>/images', views.getImages, name="get_images"),
    path('file/upload/', views.uploadFile, name="file_upload"),
    path('image/<str:pk>', views.getImage, name="get_image")
]
