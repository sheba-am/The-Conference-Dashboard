# Generated by Django 4.0.2 on 2022-07-07 07:14

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainApp', '0007_alter_paper_judges'),
    ]

    operations = [
        migrations.AlterField(
            model_name='paper',
            name='summary',
            field=models.TextField(),
        ),
        migrations.AlterField(
            model_name='paper',
            name='title',
            field=models.CharField(max_length=512, unique=True),
        ),
    ]
