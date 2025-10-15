from rest_framework import serializers
from django.contrib.auth import get_user_model

User = get_user_model()

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ("id", "username", "email", "first_name", "last_name", "display_name")
        read_only_fields = ("id",)
class RegisterSerializer(serializers.ModelSerializer):
    password = serializers.CharField(write_only =True, min_length=8)
 
    class Meta:
        model = User
        # Allow username+email+password at minimum; add more if you want
        fields = ["id", "username", "email", "password", "first_name", "last_name", "display_name"]
        read_only_fields = ["id"]

    def create(self, validated_data):
            password = validated_data.pop("password")
            user = User(**validated_data)
            user.set_password(password)      # IMPORTANT: hashes the password
            user.save()
            return user