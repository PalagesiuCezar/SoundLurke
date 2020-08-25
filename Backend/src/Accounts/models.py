from django.db import models
from django.contrib.auth.models import AbstractUser
from Accounts.utils.managers import UserManager
from django.utils.translation import ugettext_lazy as _
from django.utils import timezone
from Accounts.utils import choices
from django.conf import settings

from multiselectfield import MultiSelectField

from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail  

# Create your models here.

class User(AbstractUser):

    objects = UserManager()

    username = None
    email = models.EmailField(_('email address'), unique=True)

    last_online = models.DateTimeField(_('last online'), default=timezone.now)

    USERNAME_FIELD = 'email'
    REQUIRED_FIELDS = ['first_name', 'last_name']

    user_type = models.PositiveSmallIntegerField(choices=choices.USER_TYPE)

    def __str__(self):
        return str(self.email)


class Country(models.Model):
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name

class County(models.Model):
    country = models.ForeignKey(Country,on_delete=models.CASCADE)
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name

class City(models.Model):
    county = models.ForeignKey(County,on_delete=models.CASCADE)
    name = models.CharField(max_length=30)

    def __str__(self):
        return self.name

# class Likes(models.Model):
    # param:
    #     sender
    #     recevier

# class Follow(models.Model):
#    pass

# class Comments(models.Model):
#   pass

class Client(models.Model):
    
    class Meta:
        verbose_name = _('Client')
        verbose_name_plural = _('Clients')
        # ordering = ('sex',)

    user = models.ForeignKey(User,on_delete=models.CASCADE,related_name='client')

    sex = models.CharField(max_length=25,choices=choices.SEX,default='3')
    phone = models.CharField(_('phone number'), max_length=31, null=True)
    
    country = models.ForeignKey(Country, on_delete=models.SET_NULL, null=True)
    county = models.ForeignKey(County, on_delete=models.SET_NULL, null=True)
    city = models.ForeignKey(City, on_delete=models.SET_NULL, null=True)

    music_type = MultiSelectField(choices=choices.MUSIC_CHOICE,max_length=25,max_choices=5)

    profile_picture = models.ImageField(upload_to='images/profile_images_clients',blank=True,null=True)

    def __str__(self):
        return '{}'.format(self.user)

class Artist(models.Model):

    class Meta:
        verbose_name = _('Artist')
        verbose_name_plural = _('Artists')

    user = models.ForeignKey(User,on_delete=models.CASCADE, related_name='artist')

    sex = models.CharField(max_length=25,choices=choices.SEX,default='3')
    phone = models.CharField(_('phone number'), max_length=31, null=True)
    
    country = models.ForeignKey(Country, on_delete=models.SET_NULL, null=True)
    county = models.ForeignKey(County, on_delete=models.SET_NULL, null=True)
    city = models.ForeignKey(City, on_delete=models.SET_NULL, null=True)

    music_type = MultiSelectField(choices=choices.MUSIC_CHOICE,max_length=1024,max_choices=25)
    music_type_artist = models.CharField(choices=choices.MUSIC_CHOICE,max_length=25)

    merch_link = models.CharField(unique=False,blank=True,null=True,max_length=100,default="")

    caption = models.TextField(unique=False,blank=True,max_length=750,default="")
    social_media_bio = models.TextField(unique=False,null=True,blank=True,max_length=250,default="")

    profile_picture = models.ImageField(upload_to='images/profile_images_artist',blank=True,null=True)
    background_picture = models.ImageField(upload_to='images/background_artist',blank=True,null=True)
    
    def __str__(self):
        return '{}'.format(self.user)

class Organizer(models.Model):

    class Meta:
        verbose_name = _('Organizer')
        verbose_name_plural = _('Organizers')

    user = models.ForeignKey(User,on_delete=models.CASCADE, related_name='organizer')

    sex = models.CharField(max_length=25,choices=choices.SEX,default='3')
    phone = models.CharField(_('phone number'), max_length=31, null=True)
    
    country = models.ForeignKey(Country, on_delete=models.SET_NULL, null=True)
    county = models.ForeignKey(County, on_delete=models.SET_NULL, null=True)
    city = models.ForeignKey(City, on_delete=models.SET_NULL, null=True)

    music_type = MultiSelectField(choices=choices.MUSIC_CHOICE,max_length=1024,max_choices=25,null=True)

    caption = models.TextField(unique=False,blank=False,max_length=750,default="")

    profile_picture = models.ImageField(upload_to='images/profile_images_organizer',blank=True,null=True)
    background_picture = models.ImageField(upload_to='images/background_organizer',blank=True,null=True)
    
    def __str__(self):
        return '{}'.format(self.user)


@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):

    email_plaintext_message = "Click on the link down below to reset your password: \n http://127.0.0.1{}confirm \n ?token={}".format(reverse('password-reset:reset-password-request'), reset_password_token.key)

    send_mail(
        "Password Reset for {title}".format(title="SoundLurke"),
        email_plaintext_message,
        settings.EMAIL_HOST_USER,
        [reset_password_token.user.email]
    )
