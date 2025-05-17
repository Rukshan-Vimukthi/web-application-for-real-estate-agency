"""realestate_backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.0/topics/http/urls/
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
from django.urls import path, include
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from django.conf.urls.static import static
from . import settings



urlpatterns = [
    path('admin/', admin.site.urls),
    # path('authorization/', include('Authorization.urls')),
    path('chat/', include('chat.urls')),
    path('api/token/refresh', TokenRefreshView().as_view()),
    path('api/token', TokenObtainPairView().as_view()),
    # path('api/public/', include('api.urls')),
    path('api/v1/', include('api.urls')),
    path('api/v1/estates/', include('Estates.urls')),
    path('api/admin/', include('WebAdmin.urls')),
    path('api-auth/', include('rest_framework.urls')),
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
