from django.shortcuts import render
from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.decorators import api_view, permission_classes, authentication_classes

from django.contrib.auth.hashers import make_password

from Estates.models import *
from UserProfile.models import *

from django.conf import settings
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser, IsAuthenticatedOrReadOnly
from django.contrib.auth import authenticate, login
from rest_framework_simplejwt.tokens import RefreshToken

import os

# Create your views here.

@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def get_dashboard_information(request):
    propertiesInformation = {}

    houses = House.objects.all()
    lands = Land.objects.all()

    agents = Agent.objects.all()

    agentsRegistered = len(agents)

    properties_sold = 0
    properties_to_sell = 0

    properties_rented = 0
    properties_to_rent = 0

    properties_reserved = 0

    data = {
        "status": "failed"
    }

    for house in houses:
        status_id = house.status.id
        if status_id == 1:
            properties_to_sell += 1
        elif status_id == 2:
            properties_sold += 1
        elif status_id == 3:
            properties_rented += 1
        elif status_id == 4:
            properties_to_rent += 1
        elif status_id == 5:
            properties_reserved += 1

    for land in lands:
        status_id = land.status.id
        if status_id == 1:
            properties_to_sell += 1
        elif status_id == 2:
            properties_sold += 1
        elif status_id == 3:
            properties_rented += 1
        elif status_id == 4:
            properties_to_rent += 1
        elif status_id == 5:
            properties_reserved += 1


    data["status"] = "ok"
    data["propertiesToSell"] = properties_to_sell
    data["propertiesSold"] = properties_sold
    data["propertiesToRent"] = properties_to_rent
    data["propertiesRented"] = properties_rented
    data["propertiesReserved"] = properties_reserved
    data["agentsRegistered"] = agentsRegistered

    return Response(data)



@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def update_house_data(request):
    response = {
        "status": "failed"
    }

    data = request.data
    keys = data.keys()
    print(data)
    print("\n\n\n")
    files = request.FILES

    houseID = data["houseID"]
    bedroomCount = data["bedRoomCount"]
    bathRoomCount = data["bathRoomCount"]
    garageCount = data["garageCount"]
    floorCount = data["floorCount"]
    area = data["area"]
    price = data["price"]
    street = data["street"]
    city = data["city"]
    state = data["state"]
    country = data["country"]
    year_built = data["yearBuilt"]
    cooling = data["cooling"]
    heating = data["heating"]
    description = data["description"]
    title = data["title"]

    agentId = None

    if keys.__contains__("agentId"):
        agentId = data["agentId"]
    # images = data["images"]


    # print(keys)
    # print(data)
    print(files)

    house = House.objects.get(house_id=houseID)

    if agentId is not None:
        house.number_of_bedrooms=bedroomCount
        house.number_of_bathrooms=bathRoomCount
        house.number_of_garages=garageCount
        house.number_of_floors=floorCount
        house.area=area
        house.street=street
        house.price=price
        house.country=Country.objects.get(country_id=country)
        house.state=State.objects.get(id=state)
        house.city=City.objects.get(city_id=city)
        house.agent=agentId
        house.year_built=year_built
        house.cooling=cooling
        house.heating=heating
        house.description=description
        house.title=title
    else:
        house.number_of_bedrooms=bedroomCount
        house.number_of_bathrooms=bathRoomCount
        house.number_of_garages=garageCount
        house.number_of_floors=floorCount
        house.area=area
        house.street=street
        house.price=price
        house.country=Country.objects.get(country_id=country)
        house.state=State.objects.get(id=state)
        house.city=City.objects.get(city_id=city)
        house.year_built=year_built
        house.cooling=cooling
        house.heating=heating
        house.description=description
        house.title=title

    house.save()


    # print(dir(files))

    try:
        thumbnail = int(data["thumbnail"])
        for media in house.propertymedia_set.all():
            if media.media_id == thumbnail:
                media.is_thumbnail = True
            else:
                media.is_thumbnail = False
            media.save()
        house.save()
    except Exception as exception:
        print(exception)
        pass

    try:
        imagesToDelete = data.getlist("imagesToDelete[]")
        # print(imagesToDelete)
        for media in house.propertymedia_set.all():
            if imagesToDelete.__contains__(str(media.media_id)):
                os.remove(media.media_path.path)
                media.delete()
        house.save()
    except Exception as x:
        # print(x)
        pass

    if files.__len__() != 0:
        for key, value in files.items():
            print(key)
            media = PropertyMedia.objects.create(media_path=value, house=house, is_thumbnail=(key == "thumbnail"))

    response["status"] = "ok"

    return Response(response)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def delete_house(request):
    response = {"status": "failed"}
    house_id = request.data["id"]
    houses = House.objects.filter(house_id=house_id)
    print(houses)
    try:
        for house in houses:
            media_set = house.propertymedia_set.all()
            print(dir(media_set))
            for media in media_set:
                print(media.media_path.path)
                os.remove(media.media_path.path)

                media.delete()
            house.delete()
            # for media in media_set:
                # print(media)
            # print(dir(house))
    except Exception as e:
        print(e)
    response["status"] = "ok"
    return Response(response)


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def get_all_agents(request):
    response = {
        "status": "failed"
    }
    get_data = request.GET
    try:
        print(get_data["kw"])
    except:
        pass
    agents = []
    if get_data.__len__() != 0:
        users = User.objects.filter(username__icontains=get_data["kw"], first_name__icontains=get_data["kw"], email__icontains=get_data["kw"])
        print(users)
        for user in users:
            try:
                agent = Agent.objects.get(user=user)
                agents.append(agent)
            except:
                pass
    else:
        agents = Agent.objects.all()
    agents_information = []
    for agent in agents:
        user = agent.user
        profile_image = None
        try:
            profile_image = settings.DOMAIN + agent.profile_image.url
        except ValueError as e:
            pass

        agents_information.append(
            {
                "id": agent.id,
                "userName": user.username,
                "firstName": user.first_name,
                "lastName": user.last_name,
                "email": user.email,
                "profileImage": profile_image
            }
            )
    response["data"] = agents_information
    response["status"] = "ok"
    return Response(response)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def register_agent(request):
    response = {
        "status": "failed",
        "message": ""
    }
    data = request.data

    firstName = data["firstName"]
    lastName = data["lastName"]
    email = data["email"]
    password = data["password"]
    confirmationPassword = data["confirmationPassword"]

    if password == confirmationPassword:
        password = make_password(password)
        user = User.objects.create(first_name=firstName, last_name=lastName, username=firstName + "_" + lastName, email=email, password=password)
        if user is not None:
            image = None

            try:
                image = data["image"]
            except:
                pass

            agent = None

            if image is None:
                agent = Agent.objects.create(user=user)
            else:
                agent = Agent.objects.create(user=user, profile_image=image)
            
            if agent is not None:
                response["status"] = "ok"
    else:
        response["message"] = "passwords do not match"

    return Response(response)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def update_agent(request):
    response = {"status": "failed"}
    data = request.data

    agentID = data["id"]

    agent = Agent.objects.get(id=agentID)

    try:
        profileImage = data["profileImage"]
        agent.profile_image = profileImage
        agent.save()
    except:
        pass

    agent_user = User.objects.filter(id=agent.user.id)

    agent_user.update(
        username = data["agentUserName"],
        first_name = data["agentFirstName"],
        last_name = data["agentLastName"],
        email = data["agentEmail"]
    )

    response["status"] = "ok"
    return Response(response)


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def delete_agent(request):
    response = {
        "status": "failed"
    }

    data = request.data
    agent_ids = data["ids"]


    for agent_id in agent_ids:
        agent = Agent.objects.filter(id=agent_id)
        agent_user = User.objects.filter(id=agent[0].user.id)

        agent.delete()
        agent_user.delete()

    response["status"] = "ok"

    return Response(response)


@api_view(["POST"])
@permission_classes([AllowAny])
@authentication_classes([])
def log_admin_user_in(request):
    data = request.data

    response = {"status": "failed"}

    username = data['username']
    password = data["password"]

    user = authenticate(request, username=username, password=password)

    if user.is_superuser:
        login(request, user)
        refresh_token = RefreshToken.for_user(user)
        access_token = refresh_token.access_token
        response["access"] = str(access_token)
        response["refresh"] = str(refresh_token)
        response["status"] = "success"
    return Response(response)

