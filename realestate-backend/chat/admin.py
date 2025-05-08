from django.contrib import admin
from .models import AgentBuyerMessage, HelpCenterCustomerChat, AgentBuyerContact

# Register your models here.
# admin.register(Chat)

@admin.register(HelpCenterCustomerChat)
class HelpCenterCustomerChatModel(admin.ModelAdmin):
    list_display = ["chat_id", "message"]

@admin.register(AgentBuyerMessage)
class AgentBuyerMessageModel(admin.ModelAdmin):
    list_display = ["id", "message"]


admin.site.register([AgentBuyerContact])
