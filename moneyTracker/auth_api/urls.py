from django.urls import path, include
from rest_framework.urlpatterns import format_suffix_patterns
from .views import RegisterAPI, LoginAPI, UserDetailAPI

urlpatterns = [
    path('user/', RegisterAPI.as_view()),
    path('user/detail/', UserDetailAPI.as_view()),
    path('user/login/', LoginAPI.as_view()),
    path('user/password_reset/', include('django_rest_passwordreset.urls', namespace='password_reset'))
]

urlpatterns = format_suffix_patterns(urlpatterns)