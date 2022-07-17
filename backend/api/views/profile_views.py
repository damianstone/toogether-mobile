from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import Profile, Photo
from api.serializers import ProfileSerializer, UserSerializer, PhotoSerializer
from django.contrib.auth.hashers import make_password

# simple json token
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView

# ----------------------- USER VIEWS --------------------------------

# TOKEN SERIALIZER
class MyTokenObtainPairSerializer(TokenObtainPairSerializer):
    def validate(self, attrs):
        data = super().validate(attrs)

        """
        se puede hacer de la siguinte manera (de forma manual)
            data['username'] = self.user.username
            data['email'] = self.user.email

            O se puede hacer mediante un for loop usando el serializer cn el token
        """

        serializer = UserSerializer(self.user).data
        for key, value in serializer.items():
            data[key] = value

        return data


# TOKEN VIEW
class MyTokenObtainPairView(TokenObtainPairView):
    serializer_class = MyTokenObtainPairSerializer


@api_view(['POST'])
def registerUser(request):
    # get the data sent from frontend
    data = request.data
    # dont allow users creations with the same data
    try:
        # create a new user data model
        user = Profile.objects.create(
            email=data['email'],
            password=make_password(data['password'])
        )
        # serialize with the token one to then automatically create the auth and refresh token for the new user
        serializer = UserSerializer(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exist'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


# get the internals fields
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getUsers(request):
    profiles = Profile.objects.all()
    serializer = UserSerializer(profiles, many=True)
    return Response(serializer.data)



@api_view(['DELETE'])
@permission_classes([IsAuthenticated])
def deleteUser(request, pk):
    userForDeletion = Profile.objects.get(id=pk)
    userForDeletion.delete()
    return Response('User was deleted')


# ----------------------- PROFILES VIEWS --------------------------------

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def createUserProfile(request):
    user = request.user
    serializer = ProfileSerializer(user, many=False)

    data = request.data
    print("THIS IS DATA ---> ", data) # {'firstname': ['DAMIAN'], 'lastname': ['STONEEE']}
    
    if data.get('firstname'): # when the value not exit return None
        user.firstname = data['firstname']
    else: 
        return Response({"detail": "problem with firstname"}, status=status.HTTP_400_BAD_REQUEST)
    if data.get('lastname'):
        user.lastname = data['lastname']
    else: 
        return Response({"detail": "problem with lastname"}, status=status.HTTP_400_BAD_REQUEST)
    
    user.save()

    return Response(serializer.data)


# Get all the profile users
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getProfiles(request):
    profiles = Profile.objects.all()
    serializer = ProfileSerializer(profiles, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getProfile(request, pk):
    # user = request.user  # need to receive the token in the headers to return the profile info
    profile = Profile.objects.get(id=pk)
    serializer = ProfileSerializer(profile, many=False)
    # return the user object including info like the personal token, email, username, etc
    return Response(serializer.data)


# ----------------------- PHOTOS VIEWS --------------------------------

@api_view(['POST'])
def uploadPhoto(request):
    data = request.data
    profile_id = data['profile_id']
    profile = Profile.objects.get(id=profile_id) # get the profile first by id to then added the image
    profile.photos = request.FILES.get('image') # add the image
    profile.save()
    return Response('Image was uploaded')

@api_view(['POST'])
@permission_classes([IsAuthenticated])
def addPhoto(request):
    profile = request.user # authentication
    
    # CHECK IF THE USER HAS ALREADY 5 PHOTOS UPLOADED
    # if len(profile.photos) > 5:
    #     message = {'detail': 'Already 5 photos'}
    #     return Response(message, status=status.HTTP_400_BAD_REQUEST)
        
    file = request.FILES.get('image') # add the image
    print(file) # works
    photo = Photo.objects.create(
        profile=profile,
        image=file
    )
    print(photo)
    serializer = PhotoSerializer(photo, many=False)
    return Response(serializer.data)
    


@api_view(['GET'])
@permission_classes([IsAdminUser])
def getPhotos(request):
    photos = Photo.objects.all()
    serializer = PhotoSerializer(photos, many=True)
    return Response(serializer.data);
    

# ----------------------- BLOCKED USERS --------------------------------

# get all blocked user
@api_view(['GET'])
def getBlockedProfiles(request, pk):
    return

# ----------------------- LIKES VIEWS --------------------------------

# get all the likes
@api_view(['GET'])
def getLikes(request, pk):
    return
