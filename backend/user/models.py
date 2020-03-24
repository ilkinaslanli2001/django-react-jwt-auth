from django.db import models
from django.contrib.auth.models import AbstractBaseUser, BaseUserManager


import datetime


class MyAccountManager(BaseUserManager):
    def create_user(self, username, email, password):
        if not username:
            return ValueError("Username is required")
        if not email:
            return ValueError("Email is required")
        if not password:
            return ValueError("Password is required")

        user = self.model(
            username = username,
            email = self.normalize_email(email)
        )
        user.is_active = True
        user.set_password(password)
        user.save(using  = self._db)
        return user
    def create_superuser(self, username, email, password):
        if not email:
            return ValueError("Email is required")
        if not username:
            return ValueError("Username is required")
        
        if not password:
            return ValueError("Password is required")

        user = self.create_user(
            email = self.normalize_email(email),
            username = username,
            password = password,
            
        )
        
      
        user.is_admin = True
        user.is_staff = True
        user.is_superuser = True
        user.is_active = True
        user.save(using=self._db)
        return user

        

class User(AbstractBaseUser):
    username = models.CharField(unique=True,max_length = 256)
    email = models.EmailField()
    password = models.CharField(max_length=256)


    is_active = models.BooleanField(default=True)
    is_staff = models.BooleanField(default=False)
    is_superuser = models.BooleanField(default=False)
    is_admin = models.BooleanField(default=False)

    USERNAME_FIELD = 'username'
    REQUIRED_FIELDS = ['email']
    objects = MyAccountManager()
    def has_perm(self, perm, obj=None):
        return True
    
    def has_module_perms(self,app_label):
        return self.is_admin
    
   
    