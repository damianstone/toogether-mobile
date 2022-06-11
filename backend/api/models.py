import datetime
from django.db import models
from django.contrib.postgres.fields import ArrayField
from django.contrib.auth.models import User, AbstractUser
from django.contrib.auth.models import Group

# all of the models of the db 
# the connections 
# add to the admin file 
# migrations and check the user panel with the tables
# for images -> pip install pillow 

# USER MODEL
class Profile(models.Model):

    GENDER = (
        ("MALE", "Male"),
        ("FEMALE", "Female")
    )
    SHOW_GENDER = (
        ('MALE', 'Men'),
        ('FEMALE', 'Women'),
        ('BOTH', 'Both'),
    )
    
    user = models.ForeignKey(User, on_delete=models.SET_NULL, null=True)
    _id = models.AutoField(primary_key=True, editable=False)
    createdAt = models.DateTimeField(auto_now_add=True)
    is_group = models.BooleanField(default=False, null=True, blank=True)
    email = models.EmailField(max_length=200)
    name = models.CharField(max_length=200, null=True, blank=True)
    lastname = models.CharField(max_length=200, null=True, blank=True)
    photo = models.ImageField(null=True, blank=True)
    age = models.IntegerField(null=True, blank=True)
    birthday = models.DateField(null=True, blank=True)
    gender = models.CharField(max_length=10, choices=GENDER, default='BOTH', null=True, blank=True)
    description = models.TextField(max_length=500, null=True, blank=True)
    university = models.CharField(max_length=20, null=True, blank=True)
    show_gender = models.CharField(max_length=10, choices=SHOW_GENDER, default='FEMALE', null=True, blank=True)
    location = models.CharField(max_length=100, default='', null=True, blank=True)
    citylat = models.DecimalField(max_digits=9, decimal_places=6, default='-2.319', null=True, blank=True)
    citylong = models.DecimalField(max_digits=9, decimal_places=6, default='52.555', null=True, blank=True)

    def __str__(self):
        return str(self.name)

    
    

class Group(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    createdAt = models.DateTimeField(auto_now_add=True)
    is_group = models.BooleanField(default=True)
    total_members = models.IntegerField(null=False, blank=True, default=1)
    members = models.ManyToManyField(User, blank=True)
    share_link = models.SlugField()
    
    def __str__(self):
        return str(self.name)
    
    
class Match(models.Model):
    _id = models.AutoField(primary_key=True, editable=False)
    createdAt = models.DateTimeField(auto_now_add=True)
    members = models.ManyToManyField(User, blank=True)
    
    def __str__(self):
        return str(self.name)
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    
    