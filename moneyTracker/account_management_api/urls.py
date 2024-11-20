from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from .views import AccountAPI, CategoryAPI, TransactionAPI, TimeSeriesAPI, ExpenseClassification, CategoryDonut

urlpatterns = [
    path('account/', AccountAPI.as_view()),
    path('category/', CategoryAPI.as_view()),
    path('transaction/', TransactionAPI.as_view()),
    path('time-series/', TimeSeriesAPI.as_view()),
    path('expense-classification/', ExpenseClassification.as_view()),
    path('category-donut/', CategoryDonut.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)