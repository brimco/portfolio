from django.urls import path
from django.conf import settings
from django.conf.urls.static import static

from . import views  

app_name = "portfolio"
urlpatterns = [
    path("", views.index, name="index"),
    path('projects', views.projects, name='projects'),
    path('contact', views.contact, name='contact')
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
