from django.db import models


class Image(models.Model):
    file_id = models.ForeignKey('File', on_delete=models.SET_NULL, null=True, blank=True)

    image_url = models.URLField(null=False, blank=True)

    def __str__(self):
        return self.image_url
