from django.db import models
from django.contrib.auth.models import AbstractUser


class Paper(models.Model):
    authors = models.CharField(max_length=64)
    judges = models.CharField(max_length=64, blank=True)
    language = models.CharField(max_length=64)
    #number of pages
    NOM = models.CharField(max_length=64)
    field = models.CharField(max_length=64)
    title = models.CharField(max_length=512, unique=True)
    summary = models.TextField()
    paperFile = models.FileField(upload_to='papers/', max_length=254)
    #method of presentation
    MOP = models.CharField(max_length=64)
    published = models.BooleanField(default=False, null=True)
    
    def __str__(self):
        return self.title

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
    password = models.CharField(max_length=2048)
    status = models.CharField(max_length=64)
    papers = models.ManyToManyField(to=Paper, blank=True)
    field = models.CharField(max_length=64, null=True)

    def __str__(self):
        return self.username


class FeedBack(models.Model):
    paper = models.ForeignKey(Paper, blank=True, on_delete=models.DO_NOTHING, related_name='paper')
    judge = models.ForeignKey(BaseUser, blank=True, on_delete=models.DO_NOTHING, related_name='judge')
    score = models.CharField(max_length=10)
    status = models.CharField(max_length=20)
    description = models.CharField(max_length=2048)

    def __str__(self):
        return (str(self.paper) + "_" + str(self.judge))

