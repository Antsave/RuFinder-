from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import RegisterSerializer, UserSerializer

User = get_user_model()

class RegisterView(CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny]
    serializer_class = RegisterSerializer

class MeView(RetrieveUpdateAPIView):
    permission_classes = [IsAuthenticated]     # must be logged in
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user
