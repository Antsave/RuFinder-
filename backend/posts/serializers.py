from rest_framework import serializers
from .models import Post, Comment

class PostSerializer(serializers.ModelSerializer):
    owner_username = serializers.ReadOnlyField(source='owner.username')

    image = serializers.ImageField(required=False, allow_null=True)
    class Meta:
        model = Post
        fields = ['id',
                  'title',
                  'description',
                  'category',
                  'location',
                  'image',
                  'owner',
                  'owner_username',
                  'created_at']
        read_only_fields = ['created_at', 'owner', 'owner_username']

    def validate_image(self, value):
        if value:
            max_size = 5*1024*1024
            if value.size > max_size:
                raise serializers.ValidationError('Image too large')

            allowed_extensions = ['image/jpg', 'image/jpeg', 'image/gif', 'image/png']
            if value.content_type not in allowed_extensions:
                raise serializers.ValidationError(f'Unsupported file type: {value.content_type}')
        return value

class CommentSerializer(serializers.ModelSerializer):
    owner_username = serializers.ReadOnlyField(source='owner.username')

    class Meta:
        model = Comment
        fields =  ['id', 'post', 'owner_username', 'owner', 'created_at', 'body']
        read_only_fields = ['created_at', 'owner', 'owner_username']
