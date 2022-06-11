from django.shortcuts import render
from rest_framework.decorators import api_view
from rest_framework.response import Response

from api.models import Profile, Group
from api.serializers import ProfileSerializer, UserSerializer
from django.contrib.auth.models import User

@api_view(['GET'])
def getGroups(request):
    groups = Group.objects.all()
    serializer = ProfileSerializer(groups, many=True)
    return Response(serializer.data)


