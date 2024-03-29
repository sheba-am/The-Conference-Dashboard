from rest_framework import serializers
from .models import BaseUser, Paper, FeedBack

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = BaseUser
        fields = ['username', 'password', 'email',
        'first_name', 'last_name', 'gender', 'SNN',
        'major', 'degree', 'university', 'country',
        'city', 'status','field', 'subfields'
        ]

class PaperSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paper
        fields = '__all__'

class FeedBackSerializer(serializers.ModelSerializer):
    judge = serializers.CharField(source='judge.username')
    paper = serializers.CharField(source='paper.title')
    class Meta:
        model = FeedBack
        fields = '__all__'