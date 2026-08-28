from django.urls import path
from . import views

urlpatterns = [
    path('', views.index, name='index'),
    # path('projects/new/', views.project_create, name='project_create'),
]
