from django.contrib.auth.models import AbstractUser
from django.db import models

class User(AbstractUser):
    # add whatever you want later; this is just an example
    display_name = models.CharField(max_length=150, blank=True)
