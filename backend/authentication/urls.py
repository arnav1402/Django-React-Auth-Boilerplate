from django.urls import path, include
from .views import UserRegisterationView, UserLoginView, UserProfileView, UserForgotPassView

urlpatterns =[
    path("register/", UserRegisterationView.as_view(), name="register" ),
    path("login/", UserLoginView.as_view(), name="login" ),
    path("account/profile/", UserProfileView.as_view(), name="account/profile" ),
    path("account/forgot-password/", UserForgotPassView.as_view(), name="account/forgot_password" ),
]