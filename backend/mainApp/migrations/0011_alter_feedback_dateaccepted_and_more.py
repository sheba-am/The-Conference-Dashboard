# Generated by Django 4.0.2 on 2022-07-28 18:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainApp', '0010_feedback_dateaccepted_feedback_dateassigned'),
    ]

    operations = [
        migrations.AlterField(
            model_name='feedback',
            name='dateAccepted',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='feedback',
            name='dateAssigned',
            field=models.DateTimeField(auto_now_add=True, null=True),
        ),
    ]
