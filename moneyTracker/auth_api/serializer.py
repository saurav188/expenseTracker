from rest_framework import serializers
from .models import User
from account_management_api.models import Category
from rest_framework.validators import UniqueValidator
from django.contrib.auth.password_validation import validate_password

class RegistrationSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(
            required=True,
            validators=[UniqueValidator(queryset=User.objects.all())]
        )

    # password = serializers.CharField(write_only=True, required=True, validators=[validate_password])
    password = serializers.CharField(write_only=True, required=True)
    password2 = serializers.CharField(write_only=True, required=True)

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name', 'address', 'phone_no', 'profile_picture')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True}
        }

    def validate(self, attrs):
        if 'password' in attrs.keys() and attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        print('*****************')
        user = User.objects.create(
            username=validated_data['username'],
            email=validated_data['email'],
            first_name=validated_data['first_name'],
            last_name=validated_data['last_name'],
        )
        
        user.set_password(validated_data['password'])
        
        categories = ['Bills', 'Credit', 'Eating', 'Health', 'Housing', 'leisure',
       'Mortgages', 'Other', 'Profit', 'Shopping', 'Taxes', 'Transfers',
       'Travels', 'Wages']
        for i in range(len(categories)):
            temp_cat = Category.objects.create(
                user_id = user,
                name = categories[i],
                description = '',
                category_type = 'EXP'
            )
            temp_cat.save()
        
        user.save()

        return user

class UserUpdateSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(validators=[UniqueValidator(queryset=User.objects.all())])

    class Meta:
        model = User
        fields = ('username', 'password', 'password2', 'email', 'first_name', 'last_name', 'address', 'phone_no', 'profile_picture')

    def validate(self, attrs):
        if attrs['password'] and attrs['password'] != attrs['password2']:
            raise serializers.ValidationError({"password": "Password fields didn't match."})

        return attrs

    def create(self, validated_data):
        user = User.objects.get(id = validated_data['id'])
        
        if validated_data['username']:
            user.username = validated_data['username']
        if validated_data['email']:
            user.email = validated_data['email']
        if validated_data['first_name']:
            user.first_name = validated_data['first_name']
        if validated_data['last_name']:
            user.last_name = validated_data['last_name']
        if validated_data['phone_no']:
            user.phone_no = validated_data['phone_no']
        if validated_data['address']:
            user.address = validated_data['address']
        if validated_data.get('profile_picture'):
            user.profile_picture = validated_data['profile_picture']
        if validated_data.get('password'):
            user.set_password(validated_data['password'])
        user.save()

        return user
    
class LoginSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()
