from rest_framework import serializers
from django.contrib.auth.models import User
from .models import Profile


# transform data into json 
# return las propiedades especificadas en fields cuando se llama 
class UserSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = User 
        # fields we want to return when we make a request of the user profiles
        fields = '__all__' # return all the fields of the default data user model
        
    # parameter: the serializer and the user object
    def get_name(self, obj):
        name = obj.name
        return name


# transform the data into json 
class ProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = Profile 
        fields = '__all__'
        


