from django.urls import path
from api.views import profile_views as views


urlpatterns = [
    # swipe profiles
    path('', views.getProfiles, name='profiles'),
    # particular profile
    path('<str:pk>/', views.getProfile, name='profile'),
]
