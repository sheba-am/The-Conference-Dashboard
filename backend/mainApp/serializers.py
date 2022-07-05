from rest_framework import serializers
from .models import BaseUser

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = BaseUser
        fields = ['username', 'password', 'email',
        'first_name', 'last_name', 'gender', 'SNN',
        'major', 'degree', 'university', 'country',
        'city', 'status'
        ]