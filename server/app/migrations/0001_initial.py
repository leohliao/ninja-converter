# Generated by Django 3.2.9 on 2021-11-29 15:15

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='File',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('title', models.CharField(max_length=500)),
                ('size', models.IntegerField()),
                ('type', models.CharField(max_length=100)),
                ('last_modified_date', models.DateTimeField(blank=True)),
                ('created_datetime', models.DateTimeField(auto_now_add=True)),
                ('total_pages', models.IntegerField(default=0)),
            ],
        ),
        migrations.CreateModel(
            name='Image',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('image_url', models.URLField(blank=True)),
                ('file_id', models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='app.file')),
            ],
        ),
        migrations.AddField(
            model_name='file',
            name='cover_image',
            field=models.ForeignKey(blank=True, null=True, on_delete=django.db.models.deletion.SET_NULL, to='app.image', verbose_name='Cover Image'),
        ),
        migrations.AddField(
            model_name='file',
            name='user',
            field=models.ForeignKey(null=True, on_delete=django.db.models.deletion.SET_NULL, to=settings.AUTH_USER_MODEL),
        ),
    ]
