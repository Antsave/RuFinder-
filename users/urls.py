from django.urls import path
from .views import MeView, UserListCreateView

urlpatterns = [
    path("", UserListCreateView.as_view(), name="users-list-create"),  # <- enables /api/users/
    path("me/", MeView.as_view(), name="users-me"),
]
