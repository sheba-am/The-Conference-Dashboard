# Generated by Django 4.0.2 on 2022-07-23 15:32

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainApp', '0001_initial'),
    ]

    operations = [
        migrations.AlterField(
            model_name='feedback',
            name='description',
            field=models.CharField(blank=True, max_length=2048),
        ),
    ]
