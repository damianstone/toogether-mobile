from django.urls import path
from . import views


urlpatterns = [
    # home
    path('', views.getRoutes, name='routes'),
    # products
    path('profiles/', views.getProducts, name='profiles'),
    # product
    path('profiles/<str:pk>/', views.getProduct, name='profile'),
]
