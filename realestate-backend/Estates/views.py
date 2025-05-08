from django.shortcuts import render
from django.http import JsonResponse
from .models import PropertyMedia

# Create your views here.


def updateImage(request, pk):
    print(dir(request))
    print(request)
    image = PropertyMedia.objects.get(media_id=pk)
    # image = PropertyMedia.objects.update(media_path)
    return JsonResponse({"status": "success"})
