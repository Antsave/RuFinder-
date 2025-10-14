from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Post(models.Model):
    CATEGORY_CHOICES = [
        ('L', 'Lost'),
        ('F', 'Found'),
    ]
    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=5, choices=CATEGORY_CHOICES)
    location = models.CharField(max_length=100)
    image = models.ImageField(upload_to='images/', blank=True, null=True)
    owner = models.ForeignKey(User, on_delete=models.CASCADE)
    created_at = models.DateTimeField(auto_now_add=True)
