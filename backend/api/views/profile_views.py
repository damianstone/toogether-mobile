from django.shortcuts import render
from rest_framework import status
from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated, IsAdminUser
from rest_framework.response import Response

from api.models import Profile
from api.serializers import ProfileSerializer, ProfileSerializerWithToken
from django.contrib.auth.hashers import make_password

# simple json token
from rest_framework_simplejwt.serializers import TokenObtainPairSerializer
from rest_framework_simplejwt.views import TokenObtainPairView


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

        serializer = ProfileSerializerWithToken(self.user).data
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
        serializer = ProfileSerializerWithToken(user, many=False)
        return Response(serializer.data)
    except:
        message = {'detail': 'User with this email already exist'}
        return Response(message, status=status.HTTP_400_BAD_REQUEST)


# Get all the profile users
@api_view(['GET'])
@permission_classes([IsAdminUser])
def getProfiles(request):
    profiles = Profile.objects.all()
    serializer = ProfileSerializerWithToken(profiles, many=True)
    return Response(serializer.data)


@api_view(['GET'])
@permission_classes([IsAuthenticated])
def getProfile(request, pk):
    # user = request.user  # need to receive the token in the headers to return the profile info
    profile = Profile.objects.get(id=pk)
    serializer = ProfileSerializerWithToken(profile, many=False)
    # return the user object including info like the personal token, email, username, etc
    return Response(serializer.data)


@api_view(['PUT'])
@permission_classes([IsAuthenticated])
# need to receive the token in the headers to return the profile info
def updateProfile(request, pk):
    #user = request.user
    user = Profile.objects.get(id=pk)
    serializer = ProfileSerializerWithToken(user, many=False)
    data = request.data

    user.name = data['name']

    # just if the password is not blank (so its optional)
    if data['password'] != '':
        user.password = make_password(data['password'])

    user.save()

    return Response(serializer.data)


# get all blocked user
@api_view(['GET'])
def getBlockedProfiles(request, pk):
    return


# get all the likes
@api_view(['GET'])
def getLikes(request, pk):
    return
