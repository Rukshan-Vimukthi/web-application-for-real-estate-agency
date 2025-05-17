from django.contrib import admin
from .models import House, Land, PropertyMedia, EstateStatus, PropertyVisitTimeSlots, PropertyVisitRequest
from django.contrib.auth.mixins import PermissionRequiredMixin
from django.views.generic.detail import DetailView
from django.urls import path, reverse
from django.utils.html import format_html
from .views import updateImage
from django.conf import settings
import os

# Register your models here.

@admin.register(House)
class HouseAdmin(admin.ModelAdmin):
    list_display = ['house_id', 'house', 'street', 'detail']
    # fields = ['propertymedia.thumbnail', 'media']
    
    def get_urls(self):
        return [
            path(
                '<pk>/detail',
                self.admin_site.admin_view(HouseView.as_view()),
                name=f"houses"
            ),
            path('<pk>/detail/update', updateImage),
            *super().get_urls()
        ]
    
    def detail(self, obj: House) -> str:
        url = reverse("admin:houses", args=[obj.pk])
        return format_html(f'<a href="{url}">Advanced</a>')
    
    def house(self, obj: House) -> str:
        # print(obj.propertymedia_set.all().filter(is_thumbnail=True)[0])
        try:
            image = obj.propertymedia_set.all().filter(is_thumbnail=True)[0]
            image = str(settings.MEDIA_URL + image.media_path.name)
        except:
            image = ''
        return format_html(f'<div style="background-image: url({image}); background-size: cover; width: 200px; height: 100px;"/>')


# @admin.register(PropertyMedia)
# class PropertyMediaAdmin(admin.ModelAdmin):
#     list_display = []


admin.site.register([Land, PropertyMedia, EstateStatus, PropertyVisitTimeSlots, PropertyVisitRequest])


class HouseView(PermissionRequiredMixin, DetailView):
    permission_required = "houses.view_house"
    template_name = "admin/Estates/House/house-detail.html"
    model = House
