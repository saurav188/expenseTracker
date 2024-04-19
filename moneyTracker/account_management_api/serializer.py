from rest_framework import serializers
from .models import Account
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from .models import Account, Category, Transaction
from auth_api.models import User

class AccountSerializer(serializers.ModelSerializer):

    class Meta:
        model = Account
        fields = (
            'id',
            'name',
            'description',
            'balance',
            'account_type',
            'show_card',
            'show_pie',
            'show_line',
            'theme_color_hash',
            'theme_icon_fa_class',
        )
        extra_kwargs = {
            'name': {'required': True},
            'account_type': {'required': True},
            'theme_color_hash': {'required': True},
        }
        
    def validate(self, attrs):
        if 'balance' in attrs.keys() and attrs['balance'] < 0:
            raise serializers.ValidationError({"balance": "Balance cannot be less than zero"})

        return attrs

    def create(self, validated_data):
        user = None
        request = self.context.get("request")
        if "user_id" in validated_data.keys() and validated_data['user_id']:
            user = User.objects.get(id = validated_data["user_id"])
        elif request and hasattr(request, "user"):
            user = request.user
        account = Account.objects.create(
            user_id=user,
            name=validated_data['name'],
            account_type=validated_data['account_type'],
            theme_color_hash=validated_data['theme_color_hash'],
        )
        
        if 'description' in validated_data.keys():
            account.description = validated_data['description']
        if 'balance' in validated_data.keys():
            account.balance = validated_data['balance']
        if 'show_card' in validated_data.keys():
            account.show_card = validated_data['show_card']
        if 'show_pie' in validated_data.keys():
            account.show_pie = validated_data['show_pie']
        if 'show_line' in validated_data.keys():
            account.show_line = validated_data['show_line']
        if 'theme_icon_fa_class' in validated_data.keys():
            account.theme_icon_fa_class = validated_data['theme_icon_fa_class']
            
        return account

class CategorySerializer(serializers.ModelSerializer):

    class Meta:
        model = Category
        fields = (
            'id',
            'name',
            'description',
            'category_type',
            'theme_color_hash',
        )
        extra_kwargs = {
            'name': {'required': True},
            'category_type': {'required': True},
            'theme_color_hash': {'required': True},
        }
        
    def validate(self, attrs):
        # if 'balance' in attrs.keys() and attrs['balance'] < 0:
        #     raise serializers.ValidationError({"balance": "Balance cannot be less than zero"})

        return attrs

    def create(self, validated_data):
        user = None
        request = self.context.get("request")
        if "user_id" in validated_data.keys() and validated_data['user_id']:
            user = User.objects.get(id = validated_data["user_id"])
        elif request and hasattr(request, "user"):
            user = request.user
        category = Category.objects.create(
            user_id=user,
            name=validated_data['name'],
            category_type=validated_data['category_type'],
            theme_color_hash=validated_data['theme_color_hash'],
        )
        
        if 'description' in validated_data.keys():
            category.description = validated_data['description']
            
        return category