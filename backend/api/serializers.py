from rest_framework import serializers
from .models import Profile, Photo
from rest_framework_simplejwt.tokens import RefreshToken


class PhotoSerializer(serializers.ModelSerializer):
    image = serializers.ImageField(
        max_length=None, use_url=True,
    )
    class Meta:
        model = Photo
        fields = ['id', 'image', 'profile']
    

# transform data into json
# return las propiedades especificadas en fields cuando se llama
class ProfileSerializer(serializers.ModelSerializer):
    token = serializers.SerializerMethodField(read_only=True)
    photos = PhotoSerializer(many=True, read_only=True)

    class Meta:
        model = Profile
        fields = ['id', 'email', 'firstname', 'lastname', 'token',
                  'birthday', 'age', 'university', 'description', 'photos', 'created_at']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)




# se pasa como parametro el otro serializer asi este serializer es solo
# una extencion del otro, el cual contiene las mismas propiedades que UserSerializer + token
class UserSerializer(ProfileSerializer):
    id = serializers.SerializerMethodField(read_only=True)
    firstname = serializers.SerializerMethodField()
    email = serializers.SerializerMethodField(read_only=True)
    is_superuser = serializers.SerializerMethodField(read_only=True)
    token = serializers.SerializerMethodField(read_only=True)
    created_at = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Profile
        fields = ['id', 'firstname', 'email',
                  'is_superuser', 'token', 'created_at']

    def get_id(self, obj):
        return obj.id

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)

    def get_firstname(self, obj):
        return obj.firstname

    def get_email(self, obj):
        return obj.email

    def get_is_superuser(self, obj):
        return obj.is_superuser

    def get_created_at(self, obj):
        return obj.created_at

