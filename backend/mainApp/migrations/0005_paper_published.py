# Generated by Django 4.0.2 on 2022-07-07 06:52

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainApp', '0004_feedback'),
    ]

    operations = [
        migrations.AddField(
            model_name='paper',
            name='published',
            field=models.BooleanField(default=False, null=True),
        ),
    ]