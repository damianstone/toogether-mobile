from django.urls import path
from api.views import profile_views as views

# api/profiles/....
urlpatterns = [
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    # register / create new user
    path('register/', views.registerUser, name='register'),
    # get all profiles
    path('', views.getProfiles, name='profiles'),
    # particular profile
    path('<str:pk>/', views.getProfile, name='profile'),
    # update profile
    path('<str:pk>/', views.updateProfile, name='profile-update'),
]
