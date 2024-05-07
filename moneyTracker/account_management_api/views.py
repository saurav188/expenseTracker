from django.shortcuts import render
from .serializer import AccountSerializer, CategorySerializer, TransactionSerializer
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
        if request.GET.get('id'):
            try:
                obj = Account.objects.filter(user_id = request.user).get(id = request.GET.get('id'))
            except:
                return Response({"status":False,"message":"requested data doesnot exist"}, status=status.HTTP_400_BAD_REQUEST)
            serializer = AccountSerializer(obj, many=False)
            return Response({"status":True,"message":"account detail successfully updated","data":serializer.data}, status=status.HTTP_201_CREATED)
            
        else:
            try:
                objs = Account.objects.filter(user_id = request.user)
                if request.GET.get('name'):
                    objs = objs.filter(name__icontains=request.GET.get('name'))
                if request.GET.get('show_card'):
                    objs = objs.filter(show_card=request.GET.get('show_card'))
                if request.GET.get('show_pie'):
                    objs = objs.filter(show_pie=request.GET.get('show_pie'))
                if request.GET.get('show_line'):
                    objs = objs.filter(show_line=request.GET.get('show_line'))
            except:
                return Response({"status":False,"message":"requested data doesnot exist"}, status=status.HTTP_400_BAD_REQUEST)
            try:
                page = request.GET.get('page',1)
                page_size = 2
                paginator = Paginator(objs, page_size)
                serializer = AccountSerializer(paginator.page(page), many=True)
                return Response({"status":True,"message":"account detail successfully retried","num_pages":paginator.num_pages,"data":serializer.data}, status=status.HTTP_201_CREATED)
            except:
                return Response({"status":False,"message":"invalid page number"}, status=status.HTTP_400_BAD_REQUEST)
                
            
        # return Response({"status":True,"message":"account detail successfully updated","num_pages":paginator.num_pages,"data":serializer.data}, status=status.HTTP_201_CREATED)


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
            
# account detail : api/acc/category/
class CategoryAPI(APIView):
    authentication_classes = [TokenAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination


    def post(self, request, format=None):
        serializer = CategorySerializer(data=request.data,context={'request': request})
        if not serializer.is_valid():
            return Response({"status":False,"message":serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response({"status":True,"message":"category created successfully"}, status=status.HTTP_201_CREATED)

    def get(self, request, format=None):
        if 'id' in request.data.keys():
            try:
                obj = Category.objects.filter(user_id = request.user).get(id = request.data['id'])
            except:
                return Response({"status":False,"message":"requested data doesnot exist"}, status=status.HTTP_400_BAD_REQUEST)
            serializer = CategorySerializer(obj, many=False)
        else:
            try:
                objs = Category.objects.filter(user_id = request.user)
                if 'name' in request.data.keys():
                    objs = objs.filter(name__icontains=request.data['name'])
            except:
                return Response({"status":False,"message":"requested data doesnot exist"}, status=status.HTTP_400_BAD_REQUEST)
            try:
                page = request.GET.get('page',1)
                page_size = 2
                paginator = Paginator(objs, page_size)
                serializer = CategorySerializer(paginator.page(page), many=True)
            except:
                return Response({"status":False,"message":"invalid page number"}, status=status.HTTP_400_BAD_REQUEST)
                
            
        return Response(serializer.data)

    def patch(self, request, format=None):
        try:
            obj = Category.objects.filter(user_id = request.user).get(id = request.data['id'])
            serializer = CategorySerializer(obj ,data=request.data, partial = True)
            if not serializer.is_valid():
                return Response({"status":False,"message":serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
            serializer.save()
        except:
            return Response({"status":False,"message":"requested data doesnot exist"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"status":True,"message":"category detail successfully updated"}, status=status.HTTP_201_CREATED)

    def delete(self, request, *args, **kwargs):
        try:
            pk = request.data['id']
            obj = Category.objects.filter(user_id = request.user).get(id = pk)
            obj.delete()
            return Response({"status":True,"message":"category successfully deleted"},status=status.HTTP_204_NO_CONTENT)
        except:
            return Response({"status":False,"message":"requested data doesnot exist"}, status=status.HTTP_400_BAD_REQUEST)
            
# account detail : api/acc/transaction/
class TransactionAPI(APIView):
    authentication_classes = [TokenAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    pagination_class = PageNumberPagination


    def post(self, request, format=None):
        serializer = TransactionSerializer(data=request.data,context={'request': request})
        if not serializer.is_valid():
            return Response({"status":False,"message":serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
        serializer.save()
        return Response({"status":True,"message":"transaction created successfully"}, status=status.HTTP_201_CREATED)

    def get(self, request, format=None):
        if 'id' in request.data.keys():
            try:
                obj = Transaction.objects.filter(user_id = request.user).get(id = request.data['id'])
            except:
                return Response({"status":False,"message":"requested data doesnot exist"}, status=status.HTTP_400_BAD_REQUEST)
            serializer = TransactionSerializer(obj, many=False)
        else:
            try:
                objs = Transaction.objects.filter(user_id = request.user)
                if 'account_id' in request.data.keys():
                    objs = objs.filter(account_id=request.data['account_id'])
                if 'category_id' in request.data.keys():
                    objs = objs.filter(category_id=request.data['category_id'])
            except:
                return Response({"status":False,"message":"requested data doesnot exist"}, status=status.HTTP_400_BAD_REQUEST)
            try:
                page = request.GET.get('page',1)
                page_size = 2
                paginator = Paginator(objs, page_size)
                serializer = TransactionSerializer(paginator.page(page), many=True)
            except:
                return Response({"status":False,"message":"invalid page number"}, status=status.HTTP_400_BAD_REQUEST)
                
            
        return Response(serializer.data)

    def patch(self, request, format=None):
        try:
            obj = Transaction.objects.filter(user_id = request.user).get(id = request.data['id'])
            serializer = TransactionSerializer(obj ,data=request.data, partial = True)
            if not serializer.is_valid():
                return Response({"status":False,"message":serializer.errors}, status=status.HTTP_400_BAD_REQUEST)
            serializer.save()
        except:
            return Response({"status":False,"message":"requested data doesnot exist"}, status=status.HTTP_400_BAD_REQUEST)
        return Response({"status":True,"message":"transaction detail successfully updated"}, status=status.HTTP_201_CREATED)

    def delete(self, request, *args, **kwargs):
        try:
            pk = request.data['id']
            obj = Transaction.objects.filter(user_id = request.user).get(id = pk)
            obj.delete()
            return Response({"status":True,"message":"transaction successfully deleted"},status=status.HTTP_204_NO_CONTENT)
        except:
            return Response({"status":False,"message":"requested data doesnot exist"}, status=status.HTTP_400_BAD_REQUEST)
            