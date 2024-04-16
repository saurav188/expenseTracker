from django.urls import path
from rest_framework.urlpatterns import format_suffix_patterns
from .views import RegisterAPI, LoginAPI, UserDetailAPI

urlpatterns = [
    path('user/', RegisterAPI.as_view()),
    path('user/detail/', UserDetailAPI.as_view()),
    path('user/login/', LoginAPI.as_view()),
    # path('auth/<int:pk>/', views.snippet_detail),
]

urlpatterns = format_suffix_patterns(urlpatterns)