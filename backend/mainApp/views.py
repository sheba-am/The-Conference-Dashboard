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
    user = authenticate(request, username=request.data['username'].lower(), password=request.data['password'])
    print(user)
    if user is None:
            return Response("username and password don't match")
    else:
        serializer = UserSerializer(user,many=False)
        return Response(serializer.data)

#standard user options
@api_view(['POST'])
def addPaper(request):
    data = request.data
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
    serializer = PaperSerializer(paper,many=False)
    return Response(serializer.data)


def getPaperFile(request):
    # data = request.data
    paper = Paper.objects.get(title='music generation')

    # paperFile = open(paper.paperFile)
    response = HttpResponse(FileWrapper(paper.paperFile), content_type='application/force-download')
    response['Content-Disposition'] = 'attachment; filename="%s"' % str(paper.paperFile)
    return response

@api_view(['POST'])
def editPaper(request):
    data = request.data
    paper = Paper.objects.get(title=data['title'])
    result = setattr(paper, data['key'], data['value'].lower())
    paper.save()
    serializer = PaperSerializer(paper,many=False)
    return Response(serializer.data)

@api_view(['POST'])
def deletePaper(request):
    data = request.data
    paper = Paper.objects.get(title=data['title'])
    paper.delete()
    return Response("paper successfully deleted.")

@api_view(['POST'])
def viewInfo(request):
        data = request.data
        paper = Paper.objects.get(title=data['title'])
        serializer = PaperSerializer(paper,many=False)
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

@api_view(['POST'])
def promoteToJudge(request):
    data = request.data
    user = BaseUser.objects.get(username=data['username'].lower())
    user.status = 'judge'
    user.save()
    serializer = UserSerializer(user,many=False)
    return Response(serializer.data)


@api_view(['POST'])
def viewPapers(request):
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
    judge = BaseUser.objects.get(username=data['username'].lower())
    paper.judges = (paper.judges +"," + str(judge) )
    paper.save()
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

