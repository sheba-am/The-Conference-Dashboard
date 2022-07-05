from django.urls import path
from . import views
urlpatterns = [

    #Auth
    path('signup',  views.signup),
    # path('logout', views.logoutuser, name='logout'),
    path('login', views.login, name='login'),
]
