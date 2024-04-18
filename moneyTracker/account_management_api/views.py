from django.shortcuts import render
from .serializer import AccountSerializer
from .models import Account, Category, Transaction
from django.http import Http404
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
# Create your views here.
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from rest_framework import permissions
from rest_framework.authentication import TokenAuthentication, BasicAuthentication
from rest_framework.permissions import IsAuthenticated
from django.db.models import Q
from rest_framework.pagination import PageNumberPagination
from django.core.paginator import Paginator

# Create your views here.
# account detail : api/acc/account/
class AccountAPI(APIView):
    authentication_classes = [TokenAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination


    def post(self, request, format=None):
        serializer = AccountSerializer(data=request.data,context={'request': request})
        if not serializer.is_valid():
            return Response({"status":False,"message":serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response({"status":True,"message":"account created successfully"}, status=status.HTTP_201_CREATED)

    def get(self, request, format=None):
        if 'id' in request.data.keys():
            try:
                obj = Account.objects.filter(user_id = request.user).get(id = request.data['id'])
            except:
                return Response({"status":False,"message":"requested data doesnot exist"}, status=status.HTTP_400_BAD_REQUEST)
            serializer = AccountSerializer(obj, many=False)
        else:
            try:
                objs = Account.objects.filter(user_id = request.user)
                if 'name' in request.data.keys():
                    objs = objs.filter(name__icontains=request.data['name'])
                if 'show_card' in request.data.keys():
                    objs = objs.filter(show_card=request.data['show_card'])
                if 'show_pie' in request.data.keys():
                    objs = objs.filter(show_pie=request.data['show_pie'])
                if 'show_line' in request.data.keys():
                    objs = objs.filter(show_line=request.data['show_line'])
            except:
                return Response({"status":False,"message":"requested data doesnot exist"}, status=status.HTTP_400_BAD_REQUEST)
            try:
                page = request.GET.get('page',1)
                page_size = 2
                paginator = Paginator(objs, page_size)
                serializer = AccountSerializer(paginator.page(page), many=True)
            except:
                return Response({"status":False,"message":"invalid page number"}, status=status.HTTP_400_BAD_REQUEST)
                
            
        return Response(serializer.data)

    def patch(self, request, format=None):
        try:
            obj = Account.objects.filter(user_id = request.user).get(id = request.data['id'])
            serializer = AccountSerializer(obj ,data=request.data, partial = True)
            if not serializer.is_valid():
                return Response({"status":False,"message":serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
            serializer.save()
        except:
            return Response({"status":False,"message":"requested data doesnot exist"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"status":True,"message":"account detail successfully updated"}, status=status.HTTP_201_CREATED)

    def delete(self, request, *args, **kwargs):
        try:
            pk = request.data['id']
            obj = Account.objects.filter(user_id = request.user).get(id = pk)
            obj.delete()
            return Response({"status":True,"message":"account successfully deleted"},status=status.HTTP_204_NO_CONTENT)
        except:
            return Response({"status":False,"message":"requested data doesnot exist"}, status=status.HTTP_400_BAD_REQUEST)
            