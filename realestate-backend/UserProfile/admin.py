from django.contrib import admin
from .models import Buyer, City, Country, HelpCenterUser, Agent, Customer, State


# Register your models here.
admin.site.register([Buyer, City, Country, HelpCenterUser, Agent, Customer, State])