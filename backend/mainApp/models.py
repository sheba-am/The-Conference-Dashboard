from django.db import models
from django.contrib.auth.models import AbstractUser


class Paper(models.Model):
    authors = models.CharField(max_length=64)
    judges = models.CharField(max_length=64)
    language = models.CharField(max_length=64)
    #number of pages
    NOM = models.CharField(max_length=64)
    field = models.CharField(max_length=64)
    title = models.CharField(max_length=64)
    summary = models.CharField(max_length=64)
    paperFile = models.CharField(max_length=64)
    #method of presentation
    MOP = models.CharField(max_length=64)

class BaseUser(AbstractUser):
    username = models.CharField(max_length=64, unique=True)
    first_name = models.CharField(max_length=64)
    last_name = models.CharField(max_length=64)
    gender = models.CharField(max_length=64)
    SNN = models.CharField(max_length=64)
    major = models.CharField(max_length=64)
    degree = models.CharField(max_length=64)
    university = models.CharField(max_length=64)
    country = models.CharField(max_length=64)
    city = models.CharField(max_length=64)
    email = models.CharField(max_length=64)
    password = models.CharField(max_length=64)
    status = models.CharField(max_length=64)
    papers = models.ManyToManyField(to=Paper, blank=True)