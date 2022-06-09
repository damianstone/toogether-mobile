from django.urls import path
from . import views


urlpatterns = [
    # home
    path('', views.getRoutes, name='routes'),
    #user
    path('users/', views.getUsers, name='users'),
    #user
    path('groups/', views.getGroups, name='groups'),
    # swipe profiles
    path('profiles/', views.getProfiles, name='profiles'),
    # particular profile
    path('profiles/<str:pk>/', views.getProfile, name='profile'),
]
