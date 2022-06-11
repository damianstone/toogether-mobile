from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.models import Profile
from api.serializers import ProfileSerializer
from django.contrib.auth.models import User

# create profile
@api_view(['POST'])
def createProfile(request): 
    name = request.data.get('name')
    return Response({'name': name})



# get all of the groups and single profiles 
@api_view(['GET'])
def getProfiles(request):
    #.all return all of the profiles from our database
    # before to push data to the frontend we have to serialize the data
    profiles = Profile.objects.all() #query
    serializer = ProfileSerializer(profiles, many=True) # many = multiple objetcs 
    return Response(serializer.data)

# get user by id
@api_view(['GET'])
def getProfile(request, pk):
    profile = Profile.objects.get(_id=pk)
    serializer = ProfileSerializer(profile, many=False)
    return Response(serializer.data)

# get all blocked user
@api_view(['GET'])
def getBlockedUsers(request, pk):
    return

# get all the likes
@api_view(['GET'])
def getLikes(request, pk):
    return