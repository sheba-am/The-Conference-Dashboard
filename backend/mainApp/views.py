import os
from django.http import HttpResponse
from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
from rest_framework import generics, permissions
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.hashers import make_password
from wsgiref.util import FileWrapper
import requests
from rest_framework import status
import json
from django.db import IntegrityError
from django.db.models import Q
from .models import BaseUser, Paper, FeedBack
from .serializers import UserSerializer, PaperSerializer, FeedBackSerializer


@api_view(['POST'])
def signup(request):
    try:
        data = request.data
        user = BaseUser.objects.create(
            username=data['username'].lower(),
            email=data['email'].lower(),
            password=make_password(data['password']),
            first_name = data['first_name'].lower(),
            last_name = data['last_name'].lower(),
            gender = data['gender'].lower(),
            SNN = data['SNN'].lower(),
            major = data['major'].lower(),
            degree = data['degree'].lower(),
            university = data['university'].lower(),
            country = data['country'].lower(),
            city = data['city'].lower(),
            status = data['status'].lower(),
        )
        serializer = UserSerializer(user,many=False)
        return Response(serializer.data)
    except IntegrityError as e: 
            return Response("username already registered")
@api_view(['POST'])
def login(request):
    print(request.data['username'].lower())
    print(request.data['password'])
    user = authenticate(request, username=request.data['username'].lower(), password=request.data['password'])
    print(user)
    if user is None:
            return Response("username and password don't match")
    else:
        serializer = UserSerializer(user,many=False)
        return Response(serializer.data)

#standard user options

@api_view(['POST'])
def getUsers(request):
    users = BaseUser.objects.all()
    serializer = UserSerializer(users,many=True)
    return Response(serializer.data)

@api_view(['POST'])
def viewPapers(request):
    data = request.data
    user = BaseUser.objects.get(username=data['username'])
    serializer = PaperSerializer(user.papers,many=True)
    return Response(serializer.data)

@api_view(['POST'])
def addPaper(request):
    data = request.data
    print(data)
    try:
        paper = Paper.objects.create(
            authors=data['authors'].lower(),
            language=data['language'].lower(),
            NOM=data['NOM'].lower(),
            field=data['field'].lower(),
            title=data['title'].lower(),
            summary=data['summary'].lower(),
            paperFile=data['paperFile'],
            MOP=data['MOP'].lower(),
        )
        allAuthors = data['authors'].split(",")
        for item in allAuthors:
            BaseUser.objects.get(username=item).papers.add(paper)
        serializer = PaperSerializer(paper,many=False)
        return Response(serializer.data)
    except IntegrityError as e:
        return Response("This title has already been registered.")

@api_view(['POST'])
def getPaperFile(request):
    data = request.data
    print(data)
    paper = Paper.objects.get(title=data['title'])

    # paperFile = open(paper.paperFile)
    response = HttpResponse(FileWrapper(paper.paperFile), content_type='application/force-download')
    response['Content-Disposition'] = 'attachment; filename="%s"' % str(paper.paperFile)
    return response

@api_view(['POST'])
def editPaper(request):
    data = request.data
    print(data)
    paper = Paper.objects.get(title=data['title'])
    paper.authors=data['authors'].lower()
    paper.language=data['language'].lower()
    paper.NOM=data['NOM'].lower()
    paper.field=data['field'].lower()
    paper.title=data['title'].lower()
    paper.summary=data['summary'].lower()
    paper.paperFile=data['paperFile']
    paper.MOP=data['MOP'].lower()
    paper.save(update_fields=['authors','judges','NOM','field','title','summary','paperFile','MOP'])

    user = BaseUser.objects.get(username=data['username'])
    papers = Paper.objects.filter(authors__contains=user)
    serializer = PaperSerializer(papers,many=True)
    return Response(serializer.data)

@api_view(['POST'])
def deletePaper(request):
    data = request.data
    paper = Paper.objects.get(title=data['title'])
    paper.delete()
    return Response("paper successfully deleted.")

@api_view(['POST'])
def EditInfo(request):
    data = request.data
    user = BaseUser.objects.get(username=data['username'])
    
    user.email=data['email'].lower()
    user.password=make_password(data['password'])
    user.first_name = data['first_name'].lower()
    user.last_name = data['last_name'].lower()
    user.gender = data['gender'].lower()
    user.SNN = data['SNN'].lower()
    user.major = data['major'].lower()
    user.degree = data['degree'].lower()
    user.university = data['university'].lower()
    user.country = data['country'].lower()
    user.city = data['city'].lower()
    user.field = data['field'].lower()
    user.save(update_fields=['email','password','first_name','last_name',
    'gender','SNN','major','degree','university','country','city','field'])
    serializer = UserSerializer(user,many=False)
    return Response(serializer.data)

#returns all feedbacks for a paper
@api_view(['POST'])
def viewAllFeedback(request):
    data = request.data
    paper = Paper.objects.get(title=data['title'].lower())
    feedback = FeedBack.objects.filter(paper=paper)
    serializer = FeedBackSerializer(feedback,many=True)
    return Response(serializer.data)

#return feedback of a paper made by a specific judge       
@api_view(['POST'])
def viewFeedback(request):
    data = request.data
    paper = Paper.objects.get(title=data['title'].lower())
    judge = BaseUser.objects.get(username=data['username'].lower())
    feedback = FeedBack.objects.get(Q(paper=paper) & Q(judge=judge))
    serializer = FeedBackSerializer(feedback,many=False)
    return Response(serializer.data)
        

#admin options


#view judges suitable for the article
@api_view(['POST'])
def viewJudges(request):
    data = request.data
    judges = BaseUser.objects.filter(Q(field=data['field']) & Q(status='judge'))
    serializer = UserSerializer(judges,many=True)
    return Response(serializer.data)
@api_view(['POST'])
def promoteToJudge(request):
    data = request.data
    user = BaseUser.objects.get(username=data['username'].lower())
    user.status = 'judge'
    user.save()
    serializer = UserSerializer(BaseUser.objects.all(),many=True)
    return Response(serializer.data)


@api_view(['POST'])
def viewAllPapers(request):
    papers = Paper.objects.all()
    serializer = PaperSerializer(papers,many=True)
    return Response(serializer.data)

@api_view(['POST'])
def viewAssignedJudge(request):
    data = request.data
    paper = Paper.objects.get(title=data['title'].lower())
    return Response(paper.judges)

@api_view(['POST'])
def assignJudge(request):
    data = request.data
    paper = Paper.objects.get(title=data['title'].lower())
    paper.judges = (paper.judges +"," + data['judges'] )
    paper.save()
    print(data['judges'].split(','))
    for item in data['judges'].split(','):
        print(item=='')
        if item != ',' and item != '':
            print("item")
            print(item)
            user = BaseUser.objects.get(username=item)
            user.papers.add(paper)
            user.save()
    serializer = PaperSerializer(paper,many=False)
    return Response(serializer.data)

@api_view(['POST'])
def publish(request):
    data = request.data
    paper = Paper.objects.get(title=data['title'].lower())
    paper.published = True
    paper.save()
    serializer = PaperSerializer(paper,many=False)
    return Response(serializer.data)

    


#judge options
@api_view(['POST'])
def sendFeedback(request):
    data = request.data
    feedback = FeedBack.objects.create(
        paper = Paper.objects.get(title=data['title'].lower()),
        judge = BaseUser.objects.get(username=data['username'].lower()),
        score = data['score'],
        status = data['status'].lower(),
        description = data['description'],
    )
    
    serializer = FeedBackSerializer(feedback,many=False)
    return Response(serializer.data)

