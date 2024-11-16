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
import datetime
import pytz
from .utils import get_time_series

utc=pytz.UTC

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
            return Response({"status":True,"message":"account detail retrieved successfully","data":serializer.data}, status=status.HTTP_200_OK)
            
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
                return Response({"status":True,"message":"account detail successfully retried","num_pages":paginator.num_pages,"data":serializer.data}, status=status.HTTP_200_OK)
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
        return Response({"status":True,"message":"account detail successfully updated"}, status=status.HTTP_200_OK)

    def delete(self, request, *args, **kwargs):
        try:
            pk = request.GET.get('id')
            obj = Account.objects.filter(user_id = request.user).get(id = pk)
            obj.delete()
            return Response({"status":True,"message":"account successfully deleted"},status=status.HTTP_200_OK)
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
        if request.GET.get('id'):
            try:
                obj = Category.objects.filter(user_id = request.user).get(id = request.GET.get('id'))
            except:
                return Response({"status":False,"message":"requested data doesnot exist"}, status=status.HTTP_400_BAD_REQUEST)
            serializer = CategorySerializer(obj, many=False)
            return Response({"status":True,"message":"category detail successfully updated","data":serializer.data}, status=status.HTTP_200_OK)
        else:
            try:
                objs = Category.objects.filter(user_id = request.user)
                if request.GET.get('name'):
                    objs = objs.filter(name__icontains=request.GET.get('name'))
            except:
                return Response({"status":False,"message":"requested data doesnot exist"}, status=status.HTTP_400_BAD_REQUEST)
            try:
                page = request.GET.get('page',1)
                page_size = 2
                paginator = Paginator(objs, page_size)
                serializer = CategorySerializer(paginator.page(page), many=True)
                return Response({"status":True,"message":"category detail successfully retried","num_pages":paginator.num_pages,"data":serializer.data}, status=status.HTTP_200_OK)
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
            pk = request.GET.get('id')
            obj = Category.objects.filter(user_id = request.user).get(id = pk)
            obj.delete()
            return Response({"status":True,"message":"category successfully deleted"},status=status.HTTP_200_OK)
        except:
            return Response({"status":False,"message":"requested data doesnot exist"}, status=status.HTTP_400_BAD_REQUEST)

class TimeSeriesAPI(APIView):
    authentication_classes = [TokenAuthentication, BasicAuthentication]
    permission_classes = [IsAuthenticated]
    
    def get(self, request, format= None):
        num_days = 30
        objs = Transaction.objects.filter(user_id = request.user)
        amts = []
        dates = []
        for obj in objs:
            if False:
                continue
            amts.append(obj.amount)
            dates.append(obj.trn_date)
        combined = list(zip(dates, amts))
        combined_sorted = sorted(combined, key=lambda x: x[0])
        sorted_trn_date, sorted_trn_amt = zip(*combined_sorted)
        sorted_trn_date = list(sorted_trn_date)
        sorted_trn_amt = list(sorted_trn_amt)
        i = 0
        temp_date = utc.localize(datetime.datetime.now()-datetime.timedelta(30))
        while sorted_trn_date[i] < temp_date:
            i+=1 
        sorted_trn_amt = sorted_trn_amt[i:]
        sorted_trn_date = sorted_trn_date[i:]
        day_amt_hash = {}
        for i in range(len(sorted_trn_amt)):
            if sorted_trn_date[i].date() in day_amt_hash.keys():
                day_amt_hash[sorted_trn_date[i].date()] += sorted_trn_amt[i]
            else:
                day_amt_hash[sorted_trn_date[i].date()] = sorted_trn_amt[i]

        trns = []
        for dt in range(1, num_days+1):
            day = (temp_date + datetime.timedelta(dt)).date()
            if day in day_amt_hash.keys():
                trns.append(day_amt_hash[day])
            else:
                trns.append(0.0)
        forecast = get_time_series(trns)

        return Response({
                "status":True,
                "message":"forecasting successfully",
                "data":forecast
            },
            status = status.HTTP_200_OK
        )

            
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
            pk = request.GET.get('id')
            obj = Transaction.objects.filter(user_id = request.user).get(id = pk)
            if obj:
                obj.delete()
                return Response({"status":True,"message":"transaction successfully deleted"},status=status.HTTP_200_OK)
            else:
                return Response({"status":False,"message":"Requested transaction doesnot exist"}, status=status.HTTP_400_BAD_REQUEST)
        except:
            return Response({"status":False,"message":"Exception occured while deleting"}, status=status.HTTP_400_BAD_REQUEST)
            