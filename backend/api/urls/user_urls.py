from django.urls import path
from api.views import user_views as views


urlpatterns = [
    #user
    path('', views.getUsers, name='users'),
]
