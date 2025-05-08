from django.db import models
from django.contrib.auth.models import User


# Create your models here.
class Country(models.Model):
    country_id = models.IntegerField(primary_key=True)
    county_name = models.CharField(max_length=50)
    country_iso_code = models.IntegerField()
    country_alpha_2_code = models.CharField(max_length=2)


class State(models.Model):
    id = models.IntegerField(primary_key=True)
    name = models.CharField(max_length=20)
    country = models.ForeignKey(Country, on_delete=models.CASCADE)


class City(models.Model):
    city_id = models.IntegerField(primary_key=True)
    city_name = models.CharField(max_length=20)
    # country = models.ForeignKey(Country, on_delete=models.CASCADE)
    state = models.ForeignKey(State, on_delete=models.CASCADE)


class ProfileMedia(models.Model):
    profile_media_id = models.IntegerField(primary_key=True)
    profile_media_path = models.FileField()


class Buyer(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    phone_number = models.CharField(max_length=50)
    city = models.ForeignKey(City, on_delete=models.DO_NOTHING)
    country = models.ForeignKey(Country, on_delete=models.DO_NOTHING)
    profile_image = models.OneToOneField(ProfileMedia, on_delete=models.CASCADE, null=True)


class Customer(models.Model):
    id = models.AutoField(primary_key=True)
    email = models.EmailField(max_length=100)


class Agent(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    profile_image = models.ImageField(null=True)


class HelpCenterUser(models.Model):
    id = models.AutoField(primary_key=True)
    user = models.OneToOneField(User, on_delete=models.CASCADE)
