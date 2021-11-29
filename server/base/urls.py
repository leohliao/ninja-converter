from django.urls import path
from . import views

urlpatterns = [
    path('', views.get_routes, name="routes"),
    path('files/', views.get_files, name="get_files"),
    path('file/<str:pk>', views.get_file, name="get_file"),
    path('file/<str:pk>/images', views.get_images, name="get_images"),
    path('file/upload/', views.upload_file, name="file_upload"),
    path('image/<str:pk>', views.get_image, name="get_image")
]
