from django.urls import path
from .views import index
from django.urls import path , include
from django.conf.urls import url

from knox import views as knox_views

from .views import ( RegisterView,UserViewSet, 
LoginView,ClientView,ArtistView,OrganizerView,
CountryView,CountyView,CityView,ChangePasswordView)

user_routes = [
    (r'users', UserViewSet),
]

profile_routes = [
    (r'client',ClientView),
    (r'artist',ArtistView),
    (r'organizer',OrganizerView),
    (r'country',CountryView),
    (r'county',CountyView),
    (r'city',CityView),
]

urlpatterns = [
    path('test-permission/', index.as_view()),
    path('register/', RegisterView.as_view(), name="register"),
    path('login/', LoginView.as_view(), name="login"),
    path('logout/', knox_views.LogoutView.as_view(), name="knox_logout"),
    path('logoutall/', knox_views.LogoutAllView.as_view(), name="knox_logoutall"),
    path('password-change/',ChangePasswordView.as_view(),name="password_change"),
    path('password-reset/', include('django_rest_passwordreset.urls', namespace='password-reset')),
]