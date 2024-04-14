from django.db import models
from django.contrib.auth.models import User 

# Create your models here.
class User(User):
    profile_picture=models.ImageField(upload_to='img/user_profile_picture',null=True)
    phone_no=models.IntegerField(null=True)
    address=models.CharField(null=True,max_length=200)

    def __str__(self):
        return self.username