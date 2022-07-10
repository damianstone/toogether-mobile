import datetime
import uuid
from django.utils import timezone
from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import CustomUserManager


class Profile(AbstractBaseUser, PermissionsMixin):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    email = models.CharField(max_length=200, unique=True)
    firstname = models.CharField(max_length=200, null=True)
    lastname = models.CharField(max_length=200, null=True)
    password = models.CharField(max_length=200)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    created_at = models.DateTimeField(default=timezone.now)
    birthday = models.DateTimeField(null=True)
    age = models.PositiveIntegerField(null=True)
    university = models.TextField(max_length=40, null=True)
    description = models.TextField(max_length=500, null=True)
    
    images = ArrayField(models.ImageField(null=True, blank=True),size=5, null=True)

    USERNAME_FIELD = 'email'
    # requred for creating user
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def get_full_name(self): # que hace esto?
        return self.firstname + self.lastname


class Photo(models.Model):
    profile=models.ForeignKey(Profile, default=None, on_delete=models.CASCADE)
    image=models.ImageField(null=True, blank=True)
    
    

class Like(models.Model):
    profile = models.ForeignKey(Profile, on_delete=models.SET_NULL, null=True)
    created_at = models.DateTimeField(default=timezone.now)
    
    def __str__(self):
        return '{} : {}'.format(self.profile_id_1, self.profile_id_2)
    
    
