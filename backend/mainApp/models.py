from django.db import models
from django.contrib.auth.models import AbstractUser


class Paper(models.Model):
    authors = models.CharField(max_length=64)
    judges = models.CharField(max_length=64, blank=True)
    language = models.CharField(max_length=64)
    #number of pages
    NOM = models.CharField(max_length=64)
    field = models.CharField(max_length=64)
    subfields = models.CharField(max_length=2048, null=True)
    title = models.CharField(max_length=512, unique=True)
    summary = models.TextField()
    paperFile = models.FileField(upload_to='papers/', max_length=254)
    #method of presentation
    MOP = models.CharField(max_length=64)
    published = models.BooleanField(default=None, null=True)
    dabirKhane = models.BooleanField(default=None, null=True)
    dabirBakhsh = models.BooleanField(default=None, null=True)
    dabirConference = models.BooleanField(default=None, null=True)
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
    #papers that are submitted by the user
    userPapers = models.ManyToManyField(to=Paper, blank=True, related_name='userPapers')
    #papers that should be judged by this user
    judgePapers = models.ManyToManyField(to=Paper, blank=True, related_name='judgePapers')
    field = models.CharField(max_length=64, null=True)
    subfields = models.CharField(max_length=2048, null=True)

    def __str__(self):
        return self.username


class FeedBack(models.Model):
    paper = models.ForeignKey(Paper, blank=True, on_delete=models.DO_NOTHING, related_name='paper')
    judge = models.ForeignKey(BaseUser, blank=True, on_delete=models.DO_NOTHING, related_name='judge')
    # score = models.CharField(max_length=10, null=True, blank=True)
    # status = models.CharField(max_length=20, null=True, blank=True)
    q1 = models.IntegerField(null=True, blank=True)
    q2 = models.IntegerField(null=True, blank=True)
    q3 = models.IntegerField(null=True, blank=True)
    q4 = models.IntegerField(null=True, blank=True)
    q5 = models.IntegerField(null=True, blank=True)
    q6 = models.IntegerField(null=True, blank=True)
    q7 = models.IntegerField(null=True, blank=True)
    q8 = models.IntegerField(null=True, blank=True)
    q9 = models.IntegerField(null=True, blank=True)
    q10 = models.IntegerField(null=True, blank=True)
    description = models.CharField(blank=True, max_length=2048)

    def __str__(self):
        return (str(self.paper) + "_" + str(self.judge))

