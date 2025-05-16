from django.db import models
from UserProfile.models import *
from UserProfile.models import Agent


# Create your models here.
class EstateStatus(models.Model):
    id = models.IntegerField(primary_key=True)
    status = models.CharField(max_length=20)


class Land(models.Model):
    land_id = models.AutoField(primary_key=True)
    area = models.FloatField()
    latitude = models.FloatField(null=True)
    longitude = models.FloatField(null=True)
    address_line_1 = models.CharField(max_length=200, null=True)
    address_line_2 = models.CharField(max_length=200, null=True)
    price = models.FloatField(null=True)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    description = models.TextField(null=True, blank=True)
    status = models.ForeignKey(EstateStatus, on_delete=models.CASCADE, null=True, blank=True)
    available_date = models.DateField(null=True, blank=True)
    agent = models.ForeignKey(Agent, null=True, blank=True, on_delete=models.SET_NULL)


class House(models.Model):
    house_id = models.AutoField(primary_key=True)
    title = models.CharField(max_length=100, null=True)
    description = models.TextField(null=True)
    year_built = models.CharField(max_length=4, null=True)
    number_of_bedrooms = models.IntegerField()
    number_of_bathrooms = models.IntegerField()
    number_of_garages = models.IntegerField()
    number_of_floors = models.IntegerField()
    latitude = models.FloatField(null=True, blank=True)
    longitude = models.FloatField(null=True, blank=True)
    area = models.FloatField()
    street = models.CharField(max_length=200, null=True)
    price = models.FloatField()
    cooling = models.CharField(max_length=50, null=True)
    heating = models.CharField(max_length=50, null=True)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)
    state = models.ForeignKey(State, on_delete=models.CASCADE)
    city = models.ForeignKey(City, on_delete=models.CASCADE)
    status = models.ForeignKey(EstateStatus, on_delete=models.CASCADE)
    available_date = models.DateField(null=True, blank=True)
    description = models.TextField(null=True, blank=True)
    listed_date = models.DateField(null=True)
    zip_code = models.CharField(null=True, max_length=20)
    agent = models.ForeignKey(Agent, null=True, blank=True, on_delete=models.SET_NULL)


class PropertyMedia(models.Model):
    media_id = models.AutoField(primary_key=True)
    media_path = models.FileField(upload_to="MEDIA")
    land = models.ForeignKey(Land, on_delete=models.CASCADE, blank=True, null=True)
    house = models.ForeignKey(House, on_delete=models.CASCADE, blank=True, null=True)
    is_thumbnail = models.BooleanField()
