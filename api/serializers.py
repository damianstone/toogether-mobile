from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile, Group


# transform the data into json 
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile 
        fields = '__all__'
        


