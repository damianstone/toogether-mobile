from django.urls import path
from api.views import group_views as views


urlpatterns = [
    path('', views.getGroups, name='groups'),
]
