from django.contrib.auth import authenticate
import logging

from rest_framework import fields,serializers
from rest_framework.validators import UniqueValidator

from .models import User,Artist,Client,Country,County,City,Organizer

from Accounts.utils import choices

from utils.serializers import DynamicFieldsModelSerializer
from utils.functions import exclude_fields

logger = logging.getLogger(__name__)


# AbstractUser

class RegisterSerializer(serializers.ModelSerializer):

    email = serializers.EmailField(required=True,
                                   validators=[UniqueValidator(queryset=User.objects.all())]
    )

    class Meta:
        model = User
        fields = ('email', 'first_name', 'last_name','password','user_type')

        extra_kwargs = {
            'password': {'write_only': True}
        }

    def create(self, validated_data):

        user = User.objects.create_user(validated_data['email'], password=validated_data['password'],
                                        **exclude_fields(validated_data, exclude=('email', 'password')))
        user.save()
        return user

class UserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        exclude = ('password', 'groups', 'user_permissions')
# Password

class ChangePasswordSerializer(serializers.Serializer):
    
    model = User
    
    old_password = serializers.CharField(required=True)
    new_password = serializers.CharField(required=True)
    

# Profiles

class ClientSerializer(serializers.ModelSerializer):

    music_type = fields.MultipleChoiceField(choices=choices.MUSIC_CHOICE)

    class Meta:
        model = Client
        fields = '__all__' 
        # ordering = ('user','cnp',)

class ArtistSerializer(serializers.ModelSerializer):

    music_type = fields.MultipleChoiceField(choices=choices.MUSIC_CHOICE)

    class Meta:
        model = Artist
        fields = '__all__'

class OrganizerSerializer(serializers.ModelSerializer):

    music_type = fields.MultipleChoiceField(choices=choices.MUSIC_CHOICE)

    class Meta:
        model = Organizer
        fields = '__all__'


#  Nationality

class CountrySerializer(serializers.ModelSerializer):

    class Meta:
        model = Country
        fields = '__all__'

class CountySerializer(serializers.ModelSerializer):

    class Meta:
        model = County
        fields = '__all__'

class CitySerializer(serializers.ModelSerializer):

    class Meta:
        model = City
        fields = '__all__'


# class AppointmentSerializer(serializers.ModelSerializer):

#     class Meta:
#         model = Appointment
#         fields = '__all__'