# posts/models.py
from django.conf import settings
from django.db import models

class Post(models.Model):
    CATEGORY_CHOICES = [
        ('L', 'Lost'),
        ('F', 'Found'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=1, choices=CATEGORY_CHOICES)  # 'L' or 'F' -> length 1
    location = models.CharField(max_length=100)
    image = models.ImageField(upload_to='images/', blank=True, null=True)
    owner = models.ForeignKey(
        settings.AUTH_USER_MODEL,           # <- key change
        on_delete=models.CASCADE,
        related_name="posts",               # nice to have
    )
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
