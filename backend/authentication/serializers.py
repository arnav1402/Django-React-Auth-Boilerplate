from  rest_framework import serializers
from .models import User
from django.contrib.auth.tokens import PasswordResetTokenGenerator

class UserRegisterationSerializer(serializers.ModelSerializer):
    password2 = serializers.CharField(style={'input_type':'password', 'write_only':True})
    class Meta:
        model = User
        fields =[
            "email",
            "first_name",
            "last_name", 
            "tc", 
            "password",
            "password2",
        ]
        extra_kwargs ={
            'password':{'write_only':True}
        }
    
    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        if password!=password2:
            raise serializers.ValidationError("passwords dont match")
        return attrs
    
    def create(self, validated_data):
        return User.objects.create_user(**validated_data)

class UserLoginSerializer(serializers.ModelSerializer):
    email = serializers.EmailField(max_length=255)
    class Meta:
        model = User
        fields = [
            'email',
            'password',
        ]

class UserProfileSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = [
            'id', 
            'email',
            'first_name', 
            'last_name',        
        ]

class UserForgotPassSerializer(serializers.ModelSerializer):
    password = serializers.CharField(max_length=200, write_only=True, style={'input_type':'password'})
    password2 = serializers.CharField(max_length=200, write_only=True, style={'input_type':'password'})
    class Meta:
        model = User
        fields =[
            "password", 
            "password2"
        ]
    def validate(self, attrs):
        password = attrs.get('password')
        password2 = attrs.get('password2')
        user = self.context.get('user')
        if password!=password2:
            raise serializers.ValidationError("passwords dont match")
        return attrs
    
    def save(self):
        password = self.validated_data['password']
        user = self.context['user']
        user.set_password(password)
        user.save()
        return user