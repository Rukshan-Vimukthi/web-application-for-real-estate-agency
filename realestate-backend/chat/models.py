from django.db import models
from UserProfile.models import Customer, Agent, Buyer,HelpCenterUser
from django.contrib.auth.models import User
import datetime

# Create your models here.

class HelpCenterCustomerChat(models.Model):
    chat_id = models.AutoField(primary_key=True)
    customer = models.OneToOneField(Customer, null=True, on_delete=models.SET_NULL)
    hc_user = models.OneToOneField(HelpCenterUser, null=True, on_delete=models.SET_NULL)
    message = models.TextField(null=True, blank=True)
    date_time = models.DateTimeField(default=datetime.datetime.now())
    sent_from = models.OneToOneField(User, null=True, on_delete=models.SET_NULL)


class AgentBuyerContact(models.Model):
    id = models.AutoField(primary_key=True)
    agent = models.ForeignKey(Agent, null=True, on_delete=models.SET_NULL)
    buyer = models.ForeignKey(Buyer, null=True, on_delete=models.SET_NULL)


class AgentBuyerMessage(models.Model):
    id = models.AutoField(primary_key=True)
    agent = models.ForeignKey(Agent, on_delete=models.SET_NULL, null=True, blank=True)
    buyer = models.ForeignKey(Buyer, on_delete=models.SET_NULL, null=True, blank=True)
    message = models.TextField(null=True, blank=True)
    date_time = models.DateTimeField(default=datetime.datetime.now())
    sent_from = models.ForeignKey(User, null=True, on_delete=models.CASCADE)
    agent_buyer_contact = models.ForeignKey(AgentBuyerContact, on_delete=models.CASCADE, null=True, blank=True)

