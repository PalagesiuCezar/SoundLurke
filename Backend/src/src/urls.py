"""src URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path,include

from rest_framework import routers
from Accounts.urls import user_routes,profile_routes
from django.conf import settings
from django.conf.urls.static import static

user_router = routers.DefaultRouter()
prof_router = routers.DefaultRouter()

for p in profile_routes:
    prof_router.register(p[0],p[1])

for r in user_routes:
    user_router.register(r[0],r[1])


urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/',include(user_router.urls)),
    path('api/auth/',include(prof_router.urls)),
    path('api/auth/',include('Accounts.urls')),
]

if settings.DEBUG:
  urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
