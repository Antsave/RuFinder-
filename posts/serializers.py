from rest_framework import serializers
from .models import Post, Comment

class PostSerializer(serializers.ModelSerializer):
    owner_username = serializers.ReadOnlyField(source='owner.username')
    class Meta:
        model = Post
        fields = ['id', 'title', 'description', 'category', 'location', 'image', 'owner', 'owner_username', 'created_at']
        read_only_fields = ['created_at', 'owner', 'owner_username']

class CommentSerializer(serializers.ModelSerializer):
    owner_username = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Comment
        fields =  ['id', 'post', 'owner_username', 'owner', 'created_at', 'body']
        read_only_fields = ['created_at', 'owner', 'owner_username']
