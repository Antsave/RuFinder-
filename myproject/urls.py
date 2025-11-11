from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView # For the homepage
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

# Import the views.py file from the same directory
from . import views 

# Import Django's built-in authentication views (for LogoutView)
from django.contrib.auth import views as auth_views

urlpatterns = [
    # --- Your Web Page URLs ---
    path("", TemplateView.as_view(template_name="index.html"), name="home"),
    path("login/", views.login_view, name="login"),
    path("profile/", views.profile_view, name="profile"),
    path("logout/", auth_views.LogoutView.as_view(), name="logout"),

    # --- Your Other URLs ---
    path("admin/", admin.site.urls),
    
    # This path was in your 'kpatel0717' branch, assuming you still need it
    path("comingsoon/", TemplateView.as_view(template_name="comingsoon.html"), name="comingsoon"),
    
    # --- Your API URLs ---
    path('api/', include('posts.urls')),
    path("api/users/", include("users.urls")),
    path("api/auth/token/", TokenObtainPairView.as_view(), name="token_obtain_pair"),
    path("api/auth/token/refresh/", TokenRefreshView.as_view(), name="token_refresh"),

    # This was in your 'kpatel0717' branch, but our new login view replaces it
    # path("accounts/", include("django.contrib.auth.urls")), 
]