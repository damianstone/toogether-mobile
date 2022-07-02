from rest_framework import serializers
from .models import Profile
from rest_framework_simplejwt.tokens import RefreshToken

# TODO: install simplejwt


# transform data into json
# return las propiedades especificadas en fields cuando se llama
class ProfileSerializer(serializers.ModelSerializer):
    name = serializers.SerializerMethodField(read_only=True)
    id = serializers.SerializerMethodField(read_only=True)
    isAdmin = serializers.SerializerMethodField(read_only=True)
    email = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Profile
        fields = '__all__'

    def get_id(self, obj):
        return obj.id

    def get_isAdmin(self, obj):
        return obj.is_staff

    def get_email(self, obj):
        return obj.email

    # parameter: the serializer and the user object
    def get_name(self, obj):
        name = obj.name
        return name

# se pasa como parametro el otro serializer asi este serializer es solo
# una extencion del otro, el cual contiene las mismas propiedades que UserSerializer + token
class ProfileSerializerWithToken(ProfileSerializer):
    token = serializers.SerializerMethodField(read_only=True)

    class Meta:
        model = Profile
        fields = ['id', 'email', 'name', 'token', 'isAdmin']

    def get_token(self, obj):
        token = RefreshToken.for_user(obj)
        return str(token.access_token)
