from django.urls import path
from . import views

urlpatterns = [
    path('', views.getRoutes, name="routes"),
    path('files/', views.getFiles, name="files"),
    path('file/<str:pk>', views.getFile, name="file"),
    path('file/<str:pk>/images', views.getImages, name="images"),
    path('image/upload', views.uploadImage, name="image")
]
