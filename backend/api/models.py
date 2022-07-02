# USER MODEL
import datetime
from django.utils import timezone
from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import AbstractBaseUser, PermissionsMixin
from .managers import CustomUserManager

class Profile(AbstractBaseUser, PermissionsMixin):
    name = models.CharField(max_length=200, null=True)
    email = models.CharField(max_length=200, unique=True)
    token = models.TextField(max_length=8000, null=True)
    password = models.CharField(max_length=200)
    is_staff = models.BooleanField(default=False)
    is_active = models.BooleanField(default=True)
    date_joined = models.DateTimeField(default=timezone.now)
    date_joined = models.DateTimeField(default=timezone.now)

    USERNAME_FIELD = 'email'
    # requred for creating user
    REQUIRED_FIELDS = []

    objects = CustomUserManager()

    def get_full_name(self):
        return self.name
