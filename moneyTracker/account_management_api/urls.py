from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from .views import AccountAPI, CategoryAPI, TransactionAPI, TimeSeriesAPI

urlpatterns = [
    path('account/', AccountAPI.as_view()),
    path('category/', CategoryAPI.as_view()),
    path('transaction/', TransactionAPI.as_view()),
    path('time-series/', TimeSeriesAPI.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)