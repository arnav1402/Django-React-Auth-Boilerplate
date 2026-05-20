from django.urls import path, include
from .views import UserRegisterationView, UserLoginView, UserProfileView, UserForgotPassView, UserLogoutView

urlpatterns =[
    path("register/", UserRegisterationView.as_view(), name="register" ),
    path("login/", UserLoginView.as_view(), name="login" ),
    path("logout/", UserLogoutView.as_view(), name="logout" ),
    path("account/profile/", UserProfileView.as_view(), name="account/profile" ),
    path("account/forgot-password/", UserForgotPassView.as_view(), name="account/forgot_password" ),
]