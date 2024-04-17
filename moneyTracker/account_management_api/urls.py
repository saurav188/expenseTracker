from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns

urlpatterns = [
    # path('user/', RegisterAPI.as_view()),
]

urlpatterns = format_suffix_patterns(urlpatterns)