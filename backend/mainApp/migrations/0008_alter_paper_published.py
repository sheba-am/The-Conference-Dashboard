# Generated by Django 4.0.2 on 2022-07-26 16:38

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainApp', '0007_alter_paper_dabirbakhsh_alter_paper_dabirconference_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='paper',
            name='published',
            field=models.BooleanField(default=False),
        ),
    ]
