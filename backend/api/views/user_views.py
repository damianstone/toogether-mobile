from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.serializers import UserSerializer
from django.contrib.auth.models import User

# return users
@api_view(['GET'])
def getUsers(request):
    users = User.objects.all() #query
    serializer = UserSerializer(users, many=True) # many = multiple objetcs 
    return Response(serializer.data)

