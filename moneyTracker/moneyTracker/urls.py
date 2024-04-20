"""
URL configuration for moneyTracker project.

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/5.0/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from auth_api import urls as auth_api_urls
from account_management_api import urls as acc_mgmt_urls

urlpatterns = [
    path('', include('admin_volt.urls')),
    path('admin/', admin.site.urls),
    path('api/auth/', include(auth_api_urls)),
    path('api/acc/', include(acc_mgmt_urls)),
    path('api-auth/', include('rest_framework.urls')),
]
