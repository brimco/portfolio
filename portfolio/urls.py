from django.urls import path

from . import views  

app_name = "appname"
urlpatterns = [path("", views.index, name="index")]