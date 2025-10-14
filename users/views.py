from django.contrib.auth import get_user_model
from rest_framework import generics, permissions
from .serializers import UserSerializer  # make sure you have this

User = get_user_model()

class UserListCreateView(generics.ListCreateAPIView):
    queryset = User.objects.all().order_by("id")
    serializer_class = UserSerializer
    permission_classes = [permissions.AllowAny]  # or tighten as needed
