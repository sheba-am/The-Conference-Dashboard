# Generated by Django 4.0.2 on 2022-07-28 11:12

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('mainApp', '0008_alter_paper_published'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='feedback',
            name='q1',
        ),
        migrations.RemoveField(
            model_name='feedback',
            name='q10',
        ),
        migrations.RemoveField(
            model_name='feedback',
            name='q2',
        ),
        migrations.RemoveField(
            model_name='feedback',
            name='q3',
        ),
        migrations.RemoveField(
            model_name='feedback',
            name='q4',
        ),
        migrations.RemoveField(
            model_name='feedback',
            name='q5',
        ),
        migrations.RemoveField(
            model_name='feedback',
            name='q6',
        ),
        migrations.RemoveField(
            model_name='feedback',
            name='q7',
        ),
        migrations.RemoveField(
            model_name='feedback',
            name='q8',
        ),
        migrations.RemoveField(
            model_name='feedback',
            name='q9',
        ),
        migrations.AddField(
            model_name='feedback',
            name='scores',
            field=models.CharField(blank=True, max_length=512, null=True),
        ),
    ]