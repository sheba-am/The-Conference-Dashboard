# Generated by Django 4.0.2 on 2022-08-05 17:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainApp', '0015_remove_paper_daysleft_remove_paper_judges_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='paper',
            name='dabirBakhsh',
            field=models.CharField(blank=True, default=None, max_length=2048, null=True),
        ),
        migrations.AlterField(
            model_name='paper',
            name='dabirKhane',
            field=models.CharField(blank=True, default=None, max_length=2048, null=True),
        ),
    ]
