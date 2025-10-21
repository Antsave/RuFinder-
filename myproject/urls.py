"""
URL configuration for myproject project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.2/topics/http/urls/
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
# RuFinder-/myproject/urls.py
# RuFinder-/myproject/urls.py

from django.contrib import admin
# Remove the unused HttpResponse import
from django.urls import path, include
from django.views.generic import TemplateView # Make sure this is imported
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from users.views import profile_view 
# Remove the simple 'home' function as it's no longer needed
# def home(_request):
#     return HttpResponse("RUFinder is live ✅")

urlpatterns = [
    # Change this line to directly render index.html
    path("", TemplateView.as_view(template_name="index.html"), name="home"),
    path("admin/", admin.site.urls),
    path("comingsoon/", TemplateView.as_view(template_name="comingsoon.html"), name="comingsoon.html"),
    path('api/', include('posts.urls')),
    path("api/users/", include("users.urls")),
    path("api/auth/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),
    # Add the path for the new profile view
    path("profile/", profile_view, name="profile"), # Connects /profile/ to your view
    # Add this line back in for login, logout, etc.
    path("accounts/", include("django.contrib.auth.urls")),

]

