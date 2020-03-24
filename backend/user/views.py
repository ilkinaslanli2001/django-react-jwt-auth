from django.shortcuts import render
from django.http.response import HttpResponse
from rest_framework.generics import RetrieveAPIView
from rest_framework.permissions import IsAuthenticated
from .models import User
from .serializer import UserSerializer
from rest_framework_simplejwt.authentication import JWTAuthentication

class RetrieveUser(RetrieveAPIView):
    
    serializer_class = UserSerializer
    permission_classes = [IsAuthenticated]
    authentication_class = JWTAuthentication

    def get(self,request,pk):
        serializer = self.serializer_class(request.user)
        return HttpResponse(serializer.data)
    

