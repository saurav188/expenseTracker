from django.shortcuts import render
from .serializer import RegistrationSerializer, LoginSerializer
from .models import User
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
# Create your views here.
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token

# user creation : api/auth/user/
class RegisterAPI(APIView):
    def post(self, request, format=None):
        serializer = RegistrationSerializer(data=request.data)
        if not serializer.is_valid():
            return Response({"status":False,"message":serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response({"status":True,"message":"user registered successfully"}, status=status.HTTP_201_CREATED)

# user login : api/auth/user/login
class LoginAPI(APIView):
    def post(self, request, format=None):
        data = request.data
        serializer = LoginSerializer(data=data)
        if not serializer.is_valid():
            return Response({"status":False,"message":serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        # serializer.save()
        user = authenticate(username = serializer.data['username'], password = serializer.data['password'])
        if not user:
            return Response({"status":False,"message":serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

        token , _ = Token.objects.get_or_create(user=user)
        
        return Response({"status":True, "message":"login successful", "token":str(token)}, status=status.HTTP_201_CREATED)

