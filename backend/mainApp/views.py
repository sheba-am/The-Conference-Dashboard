import os
from django.shortcuts import render
from django.http import HttpResponseRedirect
from django.contrib.auth.forms import AuthenticationForm
from django.contrib.auth.decorators import login_required
from rest_framework import generics, permissions
from .serializers import UserSerializer
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from django.contrib.auth import login, logout, authenticate
from django.contrib.auth.hashers import make_password
import requests
from rest_framework import status
import json
from django.db import IntegrityError
from django.db.models import Q
from .models import BaseUser


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
