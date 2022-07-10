from django.urls import path
from api.views import profile_views as views

# api/users/....
urlpatterns = [
    
    # USER
    
    path('login/', views.MyTokenObtainPairView.as_view(), name='token_obtain_pair'),
    
    # register / create new user
    path('register/', views.registerUser, name='register'),
    
     # register / create new user
    path('delete/<str:pk>/', views.deleteUser, name='delete'),
    
    #get the users profiles with the django fields 
    path('', views.getUsers, name='users'),
    
    # PROFILE 
    
    # get all profiles
    path('profiles/', views.getProfiles, name='profiles'),
    
    # get profile by id
    path('profiles/profile/<str:pk>/', views.getProfile, name='profile'),
    
    path('profiles/create/', views.createUserProfile, name='profile-create'),
    
    path('profiles/upload/', views.uploadPhoto, name='add-photo'),
    
    # LIKES
    # url/api/profiles/give-like => need to check if there is already another like 
    # url/api/profiles/receive-like
    # url/api/profiles/list-likes
    
    # MATCH
    # url/api/profiles/list-matches
    
    
]
