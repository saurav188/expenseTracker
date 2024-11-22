from rest_framework import serializers
from .models import Account
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password
from .models import Account, Category, Transaction
from auth_api.models import User
import datetime

class AccountSerializer(serializers.ModelSerializer):
    balance = serializers.ReadOnlyField()

    class Meta:
        model = Account
        fields = [
            'id',
            'name',
            'description',
            'balance',
            'account_type',
            # 'show_card',
            # 'show_pie',
            # 'show_line',
            # 'theme_color_hash',
            # 'theme_icon_fa_class',
        ]
        extra_kwargs = {
            'name': {'required': True},
            'account_type': {'required': True},
            'theme_color_hash': {'required': False},
        }
        
    def validate(self, attrs):
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
            description = validated_data['description'],
            account_type=validated_data['account_type'],
        )
        
        if 'description' in validated_data.keys():
            account.description = validated_data['description']
            
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

class TransactionSerializer(serializers.ModelSerializer):
    account_id = serializers.PrimaryKeyRelatedField(queryset=Account.objects.all(), write_only=True)
    account_name = serializers.SerializerMethodField(read_only=True)
    category_id = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), write_only=True)
    category_name = serializers.SerializerMethodField(read_only=True)
    
    class Meta:
        model = Transaction
        fields = (
            'id',
            'account_id',
            'account_name',  # To display account name in GET requests
            'category_id',
            'category_name',  # To display category name in GET requests
            'amount',
            'trn_date',
            'note',
        )
        extra_kwargs = {
            'account_id': {'required': True},
            'category_id': {'required': True},
            'amount': {'required': True},
            'trn_date': {'required': False},
        }

    def get_account_name(self, obj):
        return str(obj.account_id)  # Assuming account_id has a __str__() method returning rec name

    def get_category_name(self, obj):
        return str(obj.category_id)  # Assuming category_id has a __str__() method returning rec name
   
     
    def validate(self, attrs):
        if 'amount' in attrs.keys() and attrs['amount'] < 0:
            raise serializers.ValidationError({"amount": "amount cannot be less than zero"})
        return attrs

    def create(self, validated_data):
        user = None
        request = self.context.get("request")
        if "user_id" in validated_data.keys() and validated_data['user_id']:
            user = User.objects.get(id = validated_data["user_id"])
        elif request and hasattr(request, "user"):
            user = request.user
        if 'trn_date' not in validated_data.keys():
            validated_data['trn_date'] = datetime.datetime.now()
        transaction = Transaction.objects.create(
            user_id=user,
            account_id=validated_data['account_id'],
            category_id=validated_data['category_id'],
            amount=validated_data['amount'],
            trn_date=validated_data['trn_date']
        )
        
        if 'note' in validated_data.keys():
            transaction.note = validated_data['note']
            
        return transaction