from django.contrib.auth import get_user_model
from rest_framework.generics import CreateAPIView, RetrieveUpdateAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from .serializers import RegisterSerializer, UserSerializer
from django.contrib.auth.decorators import login_required
from django.shortcuts import render

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
    
# Add this new view for the profile page
@login_required # Protect the view
def profile_view(request):
    # The request.user object is automatically available in templates
    # when the user is logged in, thanks to Django's auth middleware.
    # No need to explicitly pass it in the context here unless you
    # want to add extra profile-specific data later.
    return render(request, 'profile.html')