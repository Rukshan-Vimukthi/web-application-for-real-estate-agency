from django.urls import path
from . import views

urlpatterns = [
    path('request_a_visit', views.request_a_visit),
    path("get_time_slots", views.get_time_slots),
]