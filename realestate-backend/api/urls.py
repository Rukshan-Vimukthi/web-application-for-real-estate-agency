from django.urls import path
from . import views


urlpatterns = [
    path('country-list', views.getCountryList),
    path('city-list', views.getCityList),
    path('state-list', views.getStateList),
    path('houses', views.get_house_list),
    path('lands', views.get_lands_list),

    path('user/register', views.register_user),
    path('user/login', views.log_user_in),
    path('user/profile-information', views.get_profile_information),
    path('user/history', views.get_user_history),
    path('user/houses', views.get_user_houses),
    path('user/lands', views.get_user_lands),

    path("user/chat/initialize", views.initialize_chat_),
    path("user/chat/get_contacts", views.get_chat_contact_list),
    path("user/chat/get_messages", views.get_messages),
    path("user/chat/send", views.send_message),

    path('houses/register', views.list_houses),
    path("admin/login", views.log_admin_user_in),
    
    path('anonymous/message/post', views.post_message_data),
    path('anonymous/message/get', views.get_message_data),
    path("anonymous/permission/chat/get", views.authorize_for_chat),

    path("cc/get_chats", views.get_active_chats),

    path("agent/login", views.agent_login),
    path("agent/authenticate", views.agent_authenticate),
]
