# Generated by Django 3.2.9 on 2021-11-25 01:13

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('base', '0003_auto_20211124_2352'),
    ]

    operations = [
        migrations.RenameField(
            model_name='file',
            old_name='image_id',
            new_name='cover_image',
        ),
    ]
