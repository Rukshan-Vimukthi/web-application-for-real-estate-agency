from django.shortcuts import render
from django.http import JsonResponse
from .models import PropertyMedia

from rest_framework_simplejwt.authentication import JWTAuthentication
from rest_framework.response import Response
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.decorators import api_view, authentication_classes, permission_classes

from Estates.models import PropertyVisitRequest, House, PropertyVisitTimeSlots

from datetime import datetime

# Create your views here.


def updateImage(request, pk):
    print(dir(request))
    print(request)
    image = PropertyMedia.objects.get(media_id=pk)
    # image = PropertyMedia.objects.update(media_path)
    return JsonResponse({"status": "success"})


@api_view(["GET"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def get_time_slots(request):
    response = {"status": "failed"}
    time_slots = []
    for time_slot in PropertyVisitTimeSlots.objects.all():
        time_slots.append({
            "id": time_slot.id,
            "timeSlot": time_slot.time_slot
        })

    response["data"] = time_slots
    response["status"] = "ok"
    print(response)
    return Response(response)



@api_view(["POST"])
@authentication_classes([JWTAuthentication])
@permission_classes([IsAuthenticated])
def request_a_visit(request):
    response = {"status": "failed"}
    data = request.data

    try:
        buyer = request.user.buyer

        fullname = buyer.user.first_name + ' ' + buyer.user.last_name
        email = request.user.email
        phone = buyer.phone_number
        date = data["date"]
        time_slot = data["timeSlot"]
        time = data["time"]
        extra_note = data["extraNote"]
        property_id = data["propertyID"]

        print(data)

        property = House.objects.get(house_id=property_id)
        time_slot = PropertyVisitTimeSlots.objects.get(id=time_slot)

        property_request_visit = PropertyVisitRequest.objects.create(
            date=datetime.strptime(date, "%Y-%m-%d").date(),
            time_slot=time_slot,
            time=datetime.strptime(time, "%H:%M").time(),
            extra_note=extra_note,
            buyer=buyer,
            property=property,
        )


    except Exception as e:
        print(e)
        pass
    return Response(response)
