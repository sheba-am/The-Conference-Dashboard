# Generated by Django 4.0.2 on 2022-07-13 16:43

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainApp', '0008_alter_paper_summary_alter_paper_title'),
    ]

    operations = [
        migrations.AlterField(
            model_name='baseuser',
            name='password',
            field=models.CharField(max_length=2048),
        ),
    ]
