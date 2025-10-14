from django.urls import path
from .views import UserListCreateView, MeView  # ensure these exist

urlpatterns = [
    path("", MeView.as_view(), name="users-root-redirect"),   # optional; change if you prefer list here
    path("me/", MeView.as_view(), name="users-me"),           # /api/users/me/
]
