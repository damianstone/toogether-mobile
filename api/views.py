from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response

from .profiles_data import swipe_profiles
from .models import Profile, Group
from .serializers import ProfileSerializer
from django.contrib.auth.models import User


# user va ser igual a profile? 
# likes seran otro objecto aparte? 


# write the mtohods we gonna allow
@api_view(['GET'])
def getRoutes(request):
    return Response('Hello')


######################## SWIPE ##################################################

# get all of the groups and single profiles 
@api_view(['GET'])
def getProfiles(request):
    #.all return all of the profiles from our database
    # before to push data to the frontend we have to serialize the data
    profiles = Profile.objects.all() #query
    serializer = ProfileSerializer(profiles, many=True) # many = multiple objetcs 
    return Response(serializer.data)


######################## USER and USER PROFILE ####################################

# return users
@api_view(['GET'])
def getUsers(request):
    users = User.objects.all() #query
    serializer = ProfileSerializer(users, many=True) # many = multiple objetcs 
    return Response(serializer.data)


# create profile
@api_view(['POST'])
def createProfile(request): 
    return Response()

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

# create profile
@api_view(['POST'])
def createProfile(request):
    return 
    
# update user with the location, push notification token, 
@api_view(['PUT'])
def updateUser(request):
    return 
    
# update profile with any new information
@api_view(['PUT'])
def updateUser(request):
    return 

# update profile with any new information
@api_view(['DELET'])
def deleteUser(request):
    return 


######################## GROUP ##################################################

@api_view(['GET'])
def getGroups(request):
    groups = Group.objects.all()
    serializer = ProfileSerializer(groups, many=True)
    return Response(serializer.data)










