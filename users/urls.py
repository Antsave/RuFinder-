from django.urls import path
from .views import MeView, RegisterView
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView

urlpatterns = [
    path("me/", MeView.as_view(), name="users-me"),
    path("register/", RegisterView.as_view(), name="users-register"),
]
