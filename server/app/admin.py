from django.contrib import admin
from .models.models import File, Image

# Register your models here.
admin.site.register(File)
admin.site.register(Image)