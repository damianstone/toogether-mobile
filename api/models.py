from enum import auto
from django.db import models
from django.contrib.auth.models import User


# USER MODEL
class UserModel(models.Model):

    MALE = 'Male'
    FEMALE = 'Female'

    MEN = 'Men' 
    WOMEN = 'Women'
    BOTH = 'Both'

    GENDER_CHOICES = [(MALE, 'Male'), (FEMALE, 'Female'), ('Tree'), ('Chair')]
    SHOW_GENDER_CHOICES = [(MEN, 'Men'), (WOMEN, 'Women'), (BOTH, 'Both'), ]

    # id is by default with django
    date = models.DateTimeField(auto_now_add=True, blank=True)

    # Profile info
    email = models.EmailField(max_length=200)
    name = models.CharField(max_length=200)
    lastname = models.CharField(max_length=200)
    age = models.DateField(null=True, blank=True)
    gender = models.Choices(
        max_length=10,
        choices=GENDER_CHOICES,
        default='Whats',
    )
    photos = models.ImageField(upload_to="user/photos/", null=True, blank=True)
    description = models.CharField(max_length=500)
    university = models.CharField(max_length=20)

    # settings
    show_gender = models.Choices(
        max_length=10,
        choices=SHOW_GENDER_CHOICES,
        default='Both',
    )
    distance = models.PositiveIntegerField()

    # permissions
    
    
    # WHAT MORE SHOULD WE RETURN

    def __str__(self):
        return self.name


    def age(self):
        import datetime
        return int((datetime.date.today() - self.birthday).days / 365.25  )


class MatchModel(models.Model): 
    #id by default django
    date = models.DateTimeField(auto_now_add=True, blank=True)

