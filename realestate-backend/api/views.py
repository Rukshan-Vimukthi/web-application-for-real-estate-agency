from django.shortcuts import render
from django.core.files.storage import FileSystemStorage
from django.db.models import Q
from django.conf import settings

from rest_framework.decorators import api_view, permission_classes, authentication_classes
from rest_framework.response import Response
from rest_framework.permissions import IsAuthenticated, AllowAny, IsAdminUser, IsAuthenticatedOrReadOnly

from django.contrib.auth.models import User
from django.contrib.auth import authenticate, login
from UserProfile.models import *
from Estates.models import House, Land, PropertyMedia
from django.contrib.auth.models import User

from UserProfile.models import HelpCenterUser, Agent
from chat.models import AgentBuyerContact, AgentBuyerMessage

from django.core import serializers
from rest_framework_simplejwt.tokens import RefreshToken
from rest_framework_simplejwt.authentication import JWTAuthentication

from Estates.models import *

import datetime


@api_view(["GET"])
@permission_classes([AllowAny])
@authentication_classes([])
def getCountryList(request):
    # connection

    countries = Country.objects.all()
    country_list = []
    for country in countries:
        country_list.append({
            "id": country.country_id,
            "name": country.county_name
        })
    # data = serializers.serialize("json", countries)
        
    return Response({"data": country_list})


@api_view(["POST"])
@permission_classes([AllowAny])
@authentication_classes([])
def getStateList(request):
    # print(request.data)
    parameters = request.data
    # print(parameters)

    country_id = parameters["id"]
    # print(dir(request))
    # connection = Connection()

    country = Country.objects.get(country_id=country_id)
    states = State.objects.filter(country=country)
    state_list = []
    for state in states:
        state_list.append({
            "id": state.id,
            "name": state.name
        })
    print(state_list)
    return Response({"data": state_list})


@api_view(["POST"])
@permission_classes([AllowAny])
@authentication_classes([])
def getCityList(request):
    parameters = request.data
    # print(parameters)
    state_id = parameters["id"]
    # print(dir(request))
    # connection = Connection()

    state = State.objects.get(id=state_id)
    city_list = []
    if state is not None:
        cities = City.objects.filter(state=state)
        for city in cities:
            city_list.append({
                "id": city.city_id,
                "name": city.city_name
            })
        # result = serializers.serialize("json", city)
    return Response({"data": city_list})


@api_view(["POST"])
@permission_classes([AllowAny])
def register_user(request):
    print(dir(request))
    print(request.data)

    data = request.data['data']
    first_name = data["first_name"]
    last_name = data["last_name"]
    email = data["email"]
    phone = data["phone"]
    city_id = data["city_id"]
    country_id = data["country_id"]
    password = data["password"]

    # data_ = {
    #     "first_name": first_name,
    #     "last_name": last_name,
    #     "email": email,
    #     "phone": phone,
    #     "city_id": city_id,
    #     "country_id": country_id,
    #     "password": password
    # }

    status = "failed"
    if data is not None:
        user = User.objects.create_user(username=f"{first_name} {last_name}", first_name=first_name, last_name=last_name, email=email, password=password)
        city = City.objects.get(city_id=city_id)
        country = Country.objects.get(country_id=country_id)
        if user is not None:
    #         # accessToken = Token.objects.create(user=user)
            status = "na"
            buyer = Buyer()
            buyer.user = user
            buyer.phone_number = phone
            buyer.city = city
            buyer.country = country
            buyer.save()
            authenticated_user = authenticate(request=request, username=f"{first_name} {last_name}", password=password)
            print(authenticated_user)
            if authenticated_user is not None:
                status = "ok"

    return Response({"status": status, "username": f"{first_name} {last_name}"})


@api_view(["POST"])
@authentication_classes([])
@permission_classes([AllowAny])
def log_user_in(request):
    data = request.data
    print(data)
    email = data["email"]
    password = data["password"]

    status = "failed"
    refresh = None
    access = None
    try:
        user = User.objects.get(email=email)
        userName = user.username

        # print(user.check_password(password))
        
        # authenticated_user = authenticate(email=email, password=password)
        # print(authenticated_user)
        if user is not None:
            # login(request, authenticated_user)
            refresh = RefreshToken.for_user(user)
            access = refresh.access_token
            status = "success"
    except Exception as e:
        print(e)
    return Response({"status": status, "refresh": str(refresh), "access": str(access)})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_profile_information(request):
    return Response()


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_history(request):
    return Response()


@api_view(["GET"])
@permission_classes([IsAuthenticated])
def get_user_houses(request):
    return Response()


@api_view(["GET"])
def get_user_lands(request):
    return Response()


@api_view(["POST"])
@permission_classes([])
@authentication_classes([])
def get_house_list(request):
    data = request.data
    filter_data = {}
    try:
        filter_data = request.data["filters"]
    except:
        pass
    print(data)

    # print(request.GET)
    # filter_data = {}

    searchKeyword = None
    propertyType = None
    country = None
    state = None
    city = None
    forSelling = None
    forRenting = None
    minPrice = None
    maxPrice = None

    query = None

    try:
        searchKeyword = filter_data["searchKeyword"]
        propertyType = filter_data["propertyType"]
        country = filter_data["country"]
        state = filter_data["state"]
        city = filter_data["city"]
        forSelling = filter_data["forSelling"]
        forRenting = filter_data["fotRenting"]
        minPrice = filter_data["minPrice"]
        maxPrice = filter_data["maxPrice"]
    except:
        pass


    # if searchKeyword is not None:
    #     if query is not None:
    #         pass
    #     else:
    #         query = Q()
    # if propertyType is not None:
    #     if query is not None:
    #         pass
    #     else:
    #         query = Q()

    if country is not None and country != 0:
        try:
            country = Country.objects.get(country_id=country)
            if query is not None:
                query &= Q(country=country)
            else:
                query = Q(country=country)
        except:
            pass
    if state is not None and state != 0:
        try:
            state = State.objects.get(id=state)
            if query is not None:
                query &= Q(state=state)
            else:
                query = Q(state=state)
        except:
            pass
    if city is not None and city != 0:
        try:
            city = City.objects.get(city_id=city)
            if query is not None:
                query &= Q(city=city)
            else:
                query = Q(city=city)
        except:
            pass

    if forSelling is not None and forSelling == True:
        try:
            if query is not None:
                query &= Q(status=EstateStatus.objects.get(id=1))
            else:
                query = Q(status=EstateStatus.objects.get(id=1))
        except:
            pass

    if forRenting is not None and forRenting == True:
        try:
            if query is not None:
                query &= Q(status=EstateStatus.objects.get(id=4))
            else:
                query = Q(status=EstateStatus.objects.get(id=4))
        except:
            pass
    
    # if minPrice is not None:
    #     if query is not None:
    #         pass
    #     else:
    #         query = Q()
    # if maxPrice is not None:
    #     if query is not None:
    #         pass
    #     else:
    #         query = Q()
    

    # print(dir(house_objects))
    house_objects = None
    if filter_data.items().__len__() > 0:
        print("Found filters")
        house_objects = House.objects.filter(query)
        print("Houses filtered: ", house_objects)
    else:
        house_objects = House.objects.all()
        print(house_objects)
    
    data = {}
    json_data = []

    beds_set = set()
    baths_set = set()
    garages_set = set()
    floors_set = set()
    area_set = set()
    price_set = set()
    status_set = set()

    for house in house_objects:
        # house_data = str(serializers.serialize('json', house_objects))
        
        house_data_json = {
            "houseId": house.house_id,
            "numberOfBedrooms": house.number_of_bedrooms,
            "numberOfBathrooms": house.number_of_bathrooms,
            "numberOfGarages": house.number_of_garages,
            "numberOfFloors": house.number_of_floors,
            "area": house.area,
            "addressLine1": house.address_line_1,
            "addressLine2": house.address_line_2,
            "price": house.price,
            "country": {
                "id": house.country.country_id,
                "name": house.country.county_name
                },
            "city": {
                "id": house.city.city_id,
                "name": house.city.city_name
                },
            "status": house.status.status,
            "availableDate": str(house.available_date),
            "description": house.description
        }

        beds_set.add(house.number_of_bedrooms)
        baths_set.add(house.number_of_bathrooms)
        garages_set.add(house.number_of_garages)
        floors_set.add(house.number_of_floors)
        area_set.add(house.area)
        price_set.add(house.price)
        status_set.add(house.status.status)

        media_array = []
        for media in house.propertymedia_set.all():
            media_array.append({
                "mediaId": media.media_id,
                "mediaPath": settings.DOMAIN + media.media_path.url,
                # "land": media.land,
                "isThumbnail": media.is_thumbnail
            })

        house_data_json["media"] = media_array

        if house.agent is not None:
            house_data_json["agentId"] = house.agent.user.id
            house_data_json["agentUserName"] = house.agent.user.username
            house_data_json["agentFirstName"] = house.agent.user.first_name
            house_data_json["agentLastName"] = house.agent.user.last_name
            try:
                house_data_json["agentProfileImage"] = settings.DOMAIN + house.agent.profile_image.url
            except Exception as e:
                # print(e)
                house_data_json["agentProfileImage"] = None

        json_data.append(house_data_json)
        
        username = ""
        agent = house.agent
        if agent is not None:
            username = agent.user.username

        # media_data = str(serializers.serialize('json', house.propertymedia_set.all()))
        # data[house.house_id] = [house_data, media_data, username]

    summary = {}

    max_beds = 0
    max_baths = 0
    max_garages = 0
    max_floors = 0
    max_area = 0
    max_price = 0
    max_status = 0


    if len(beds_set) > 0:
        max_beds = max(beds_set)
    if len(beds_set) > 0:
        min_beds = min(beds_set)

    if len(baths_set) > 0:
        max_baths = max(baths_set)
    if len(baths_set) > 0:
        min_baths = min(baths_set)

    if len(garages_set) > 0:
        max_garages = max(garages_set)
    if len(garages_set) > 0:
        min_garages = min(garages_set)

    if len(floors_set) > 0:
        max_floors = max(floors_set)
    if len(floors_set) > 0:
        min_floors = min(floors_set)

    if len(area_set) > 0:
        max_area = max(area_set)
    if len(area_set) > 0:
        min_area = min(area_set)

    if len(price_set) > 0:
        max_price = max(price_set)
    if len(price_set) > 0:
        min_price = min(price_set)

    if len(status_set) > 0:
        max_status = max(status_set)
    if len(status_set) > 0:
        min_status = min(status_set)

        
    summary["beds"] = max_beds
    summary["baths"] = max_baths
    summary["garages"] = max_garages
    summary["floors"] = max_floors
    summary["area"] = max_area
    summary["price"] = max_price
    summary["status"] = max_status

    # print(data)
    # data["jsonData"] = json_data
    # serialized_data = serializers.serialize('json', house_objects)
    return Response({"data": json_data, "summary": summary, "status": "ok"})


@api_view(["GET"])
@permission_classes([AllowAny])
def get_lands_list(request):
    data = request.data
    print(data)
    return Response()




@api_view(["POST"])
@permission_classes([AllowAny])
def log_admin_user_in(request):
    data = request.data

    username = data['username']
    password = data["password"]

    user = authenticate(request, username=username, password=password)
    status = "failed"
    if user.is_superuser:
        login(request, user)
        status = "success"
    return Response({"status": status})


@api_view(["POST"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAdminUser])
def list_houses(request):
    data = request.data
    print(data)


    files = request.FILES

    bedRooms = data["bedRoomCount"]
    bathRooms = data["bathRoomCount"]
    garages = data["garageCount"]
    floors = data["floorCount"]
    area = data["area"]
    address = data["address"]
    price = data["price"]

    country = Country.objects.get(country_id=data["country"])
    city = City.objects.get(city_id=data["city"])

    house = None
    house = House.objects.create(
        number_of_bedrooms=bedRooms,
        number_of_bathrooms=bathRooms,
        number_of_garages=garages,
        number_of_floors=floors,
        area=area,
        address_line_1=address,
        address_line_2='',
        price=price,
        country=country,
        city=city,
        status=EstateStatus.objects.get(id=1)
    )

    if house is not None:
        for key, file in files.items():
            property_media = PropertyMedia.objects.create(
                media_path=file,
                house=house,
                is_thumbnail=key == "thumbnail"
            )


    data = {"status": "failed"}
    if house is not None:
        data["status"] = "ok"

    return Response(data)



@api_view(["POST"])
@permission_classes([AllowAny])
def post_message_data(request):
    message = request.data["message"]
    user_email = request.data["email"]
    print(message)
    # user_email = request.session.get("email")
    # print(request.session.items())
    # anonymousUser = AnonymousUser.objects.get(email=user_email)
    message_status = "not_sent"
    # if anonymousUser is not None:
    #     customer_message = CustomerMessage.objects.create(message=message, date_time=datetime.datetime.now())
    #     chat = Chat.objects.create(anonymousUser=anonymousUser, customer_message=customer_message)
    #     if customer_message is not None and chat is not None:
    #         message_status = "sent"

    return Response({"status": message_status})


@api_view(["GET"])
@permission_classes([AllowAny])
def get_message_data(request):
    return Response({"reply": "reply"})


@api_view(["POST"])
@permission_classes([AllowAny])
def authorize_for_chat(request):
    print(request.data)
    user_email = request.data["email"]
    request.session["email"] = user_email
    request.session.save()
    # anonymousUser = AnonymousUser.objects.get(email=user_email)
    # if anonymousUser is None:
        # anonymousUser = AnonymousUser.objects.create(email=user_email)

    # chat = Chat.objects.create(anonymousUser=anonymousUser)

    status = "failed"
    # if anonymousUser is not None:
        # status = "ok"
    # print(request.session.values())

    return Response({"status": status})



@api_view(['GET'])
@permission_classes([AllowAny])
def get_active_chats(request):
    return Response({})



@api_view(["POST"])
@permission_classes([AllowAny])
def agent_login(request):
    return Response({})



@api_view(["POST"])
@permission_classes([AllowAny])
def agent_authenticate(request):
    data = request.data
    agentUserName = data["username"]
    agentPassword = data["password"]

    user = authenticate(username=agentUserName, password=agentPassword)
    login(request, username=user.username, password=user.password)
    # user = User.object.get(username=agentUserName, password=agentPassword)
    status = {"status": "none"}
    if user is not None:
        agent = Agent.objects.get(user=user)
        if agent is not None:
            status["status"] = "ok"

    return Response({"data": status})


@api_view(["POST"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def initialize_chat_(request):
    data = request.data
    # print(dir(request))
    # print("Request data: ", request.data)
    agentID = data["agent_id"]
    status = "failed"

    try:
        user = User.objects.get(id=agentID)
        # print(dir(user))
        if user.agent is not None:
            agentObject = user.agent
            buyer = Buyer.objects.get(user=request.user)

            # print(agentObject)
            # print(buyer)

            agent_buyer_contact = None
            try:
                agent_buyer_contact = AgentBuyerContact.objects.get(agent=agentObject, buyer=buyer)
            except:
                agent_buyer_contact = AgentBuyerContact.objects.create(agent=agentObject, buyer=buyer)

            if agent_buyer_contact is not None:
                status = "ok"
    except Exception as e:
        print(e)
        pass
    return Response({"status": status})


@api_view(["GET"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def get_chat_contact_list(request):
    buyer = Buyer.objects.get(user=request.user)
    agentBuyerContacts = AgentBuyerContact.objects.filter(buyer=buyer)

    # print(agentBuyerContacts)
    contact_data = []
    for contact in agentBuyerContacts:
        # print(contact)
        contact_data.append({
            "agent_id": contact.agent.user.id,
            "agent_name": contact.agent.user.username,
            "contact_id": contact.id
        })

    return Response({"contacts": contact_data})


@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def get_messages(request):
    response = {"status": "failed"}

    data = request.data
    try:
        agent_chat_id = data["agentChatID"]
        buyer = Buyer.objects.get(user=request.user)
        agent_chat = AgentBuyerContact.objects.get(id=agent_chat_id)

        messages = []
        if agent_chat.buyer == buyer:
            print(agent_chat.agentbuyermessage_set.all())
            for message in agent_chat.agentbuyermessage_set.all():
                owner = "other"
                if message.sent_from == request.user:
                    owner = "me"

                messages.append({
                    "id": message.id,
                    "content": message.message,
                    "owner": owner
                })
        
        response["messages"] = messages
        response["status"] = "ok"
        print(messages)
        # print(agent_chat)
    except:
        pass

    return Response(response)



@api_view(["POST"])
@permission_classes([IsAuthenticated])
@authentication_classes([JWTAuthentication])
def send_message(request):
    response = {"status": "failed"}
    try:
        data = request.data
        agent = None
        buyer = None
        sender = request.user

        chat = AgentBuyerContact.objects.get(id=data["chatID"])
        
        message = AgentBuyerMessage.objects.create(
            agent=chat.agent,
            buyer=chat.buyer,
            message=data["message"],
            date_time=datetime.datetime.now(),
            sent_from=sender,
            agent_buyer_contact=chat)
        
        response["status"] = "ok"

    except Exception as exception:
        print(exception)
        pass
    return Response(response)
