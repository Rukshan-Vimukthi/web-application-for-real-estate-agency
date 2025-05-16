from django.urls import path
from .views import *

urlpatterns = [
    path("dashboard/information/fetch", get_dashboard_information),
    path("house/update", update_house_data),
    path("house/delete", delete_house),
    path("agents/get", get_all_agents),
    path("agents/register", register_agent),
    path("agent/update", update_agent),
    path("agents/delete", delete_agent),
    path("login", log_admin_user_in),
]
