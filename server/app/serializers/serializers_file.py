from rest_framework import serializers
from app.models.models import File, Image


class FileSerializer(serializers.ModelSerializer):
    cover_image_url = serializers.SerializerMethodField()

    class Meta:
        model = File
        fields = '__all__'

    def get_cover_image_url(self, obj):
        cover_image = obj.cover_image
        if cover_image:
            image = Image.objects.filter(id=cover_image.id).first()
            cover_image_url = image.image_url
            return cover_image_url
