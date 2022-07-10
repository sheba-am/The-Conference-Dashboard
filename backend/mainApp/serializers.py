from rest_framework import serializers
from .models import BaseUser, Paper, FeedBack

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = BaseUser
        fields = ['username', 'password', 'email',
        'first_name', 'last_name', 'gender', 'SNN',
        'major', 'degree', 'university', 'country',
        'city', 'status','field'
        ]

class PaperSerializer(serializers.ModelSerializer):
    class Meta:
        model = Paper
        fields = '__all__'

class FeedBackSerializer(serializers.ModelSerializer):
    class Meta:
        model = FeedBack
        fields = '__all__'