from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from .views import AccountAPI, CategoryAPI, TransactionAPI

urlpatterns = [
    path('account/', AccountAPI.as_view()),
    path('category/', CategoryAPI.as_view()),
    path('transaction/', TransactionAPI.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)