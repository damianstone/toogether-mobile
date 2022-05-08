from django.shortcuts import render
from django.http import JsonResponse
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .profiles_data import swipe_profiles

# Create your views here.

# use functions instead of classes for the views
# is the same thing but with function you have more control of what u are doing


# write the mtohods we gonna allow
@api_view(['GET'])
def getRoutes(request):
    return Response('Hello')


@api_view(['GET'])
def getProducts(request):
    return Response(swipe_profiles)

# pk = id
@api_view(['GET'])
def getProduct(request, pk):
    # exact product that we wat to get
    profile = None
    for i in swipe_profiles:
        # we pass the id as an argument (in the url) and if the id exist so return it
        if i['_id'] == pk:
            profile = i
            break
    return Response(profile)
