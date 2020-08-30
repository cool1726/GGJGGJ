from django.contrib import admin
from .models import *
# Register your models here.

admin.site.register(Profile)

class FollowRelationAdmin(admin.ModelAdmin):
    list_display = ('follower', )

admin.site.register(FollowRelation, FollowRelationAdmin)
