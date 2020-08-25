from django.shortcuts import render
from django.http import HttpResponse
from django.contrib.auth.signals import user_logged_in
from django.utils import timezone
from django.conf import settings

from rest_framework import generics, status, viewsets
from rest_framework.authentication import BasicAuthentication
from rest_framework.response import Response

from knox.models import AuthToken
from knox.views import LoginView as KnoxLoginView

from Accounts.utils.filters import UserFilter
from .serializers import (RegisterSerializer,UserSerializer,
                        ClientSerializer,ArtistSerializer,
                        OrganizerSerializer,CountrySerializer,
                        CountySerializer,CitySerializer, ChangePasswordSerializer)
                        
from .models import User,Client,Artist,Organizer,Country,County,City
from Accounts.utils.perminssions import IsClient,IsArtist,IsOrganizer,IsAuthenticated #overwrite [IsAuthenticated]

from django.core.mail import send_mail  

#
class index(generics.GenericAPIView):
    permission_classes = (IsClient,) 

    def get(self,request):
        return HttpResponse("it's working")
#

class BaseRegisterView(generics.GenericAPIView):

    def post(self, request):

        serializer = self.get_serializer(data=request.data)
        if serializer.is_valid():
            user = serializer.save()
            
            '''
            do a function with args to send email when needed
            '''
            
            send_mail(
                "Welcome to {title} {first_name} {last_name}".format(title="SoundLurke",first_name=serializer.data['first_name'],last_name=serializer.data['last_name']),
                'Cum sa fac confirm email.......//???',
                settings.EMAIL_HOST_USER,
                [serializer.data['email']]
            )

            if user:
                _, token = AuthToken.objects.create(user)
                return Response({'user': serializer.data,
                                 'token': token}, status=status.HTTP_201_CREATED)
        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

class RegisterView(BaseRegisterView):
    serializer_class = RegisterSerializer

class LoginView(KnoxLoginView):
    authentication_classes = [BasicAuthentication]

class UserViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    filter_class = UserFilter
    serializer_class = UserSerializer

#Password view

class ChangePasswordView(generics.UpdateAPIView):

    model = User
    serializer_class = ChangePasswordSerializer
    permission_classes = (IsAuthenticated,)

    def get_object(self, queryset=None):
        obj = self.request.user
        return obj

    def update(self, request, *args, **kwargs):
        self.object = self.get_object()
        serializer = self.get_serializer(data=request.data)

        if serializer.is_valid():
            
            if not self.object.check_password(serializer.data.get("old_password")):
                return Response({"old_password": ["Wrong password."]}, status=status.HTTP_400_BAD_REQUEST)
            
            self.object.set_password(serializer.data.get("new_password"))
            self.object.save()
            response = {
                'status': 'success',
                'code': status.HTTP_200_OK,
                'message': 'Password updated successfully',
                'data': []
            }

            return Response(response)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

#Profile views

class ClientView(viewsets.ModelViewSet):
    lookup_field = 'id'
    queryset = Client.objects.all()
    serializer_class = ClientSerializer

class ArtistView(viewsets.ModelViewSet):
    queryset = Artist.objects.all()
    serializer_class = ArtistSerializer

class OrganizerView(viewsets.ModelViewSet):
    queryset = Organizer.objects.all()
    serializer_class = OrganizerSerializer


#Nationality View

class CountryView(viewsets.ModelViewSet):
    queryset = Country.objects.all()
    serializer_class = CountrySerializer

class CountyView(viewsets.ModelViewSet):
    queryset = County.objects.all()
    serializer_class = CountySerializer

class CityView(viewsets.ModelViewSet):
    queryset = City.objects.all()
    serializer_class = CitySerializer
