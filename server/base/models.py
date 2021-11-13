from django.db import models
from django.contrib.auth.models import User
from cloudinary.models import CloudinaryField

# Create your models here.
class File(models.Model):
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    title = models.CharField(max_length=500, null=False, blank=False)
    size = models.IntegerField(null=False, blank=False)
    type = models.CharField(max_length=100, null=False, blank=False)
    image_id = models.ForeignKey('Image', on_delete=models.SET_NULL, null=True, blank=True)
    last_modified_date = models.DateTimeField(null=False, blank=True)
    created_datetime = models.DateTimeField(auto_now_add=True)
    
    def __str__(self):
        return self.title

class Image(models.Model):
    file_id = models.ForeignKey(File, on_delete=models.SET_NULL, null=True, blank=True)
    image = CloudinaryField('image')

    def __str__(self):
        return self.image_url
