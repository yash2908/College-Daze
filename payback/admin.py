from django.contrib import admin
from django.contrib.auth.admin import UserAdmin
from .models import *

admin.site.register(User)
admin.site.register(Technoplayer1)
admin.site.register(Technoplayer2)
admin.site.register(Technoplayer3)
admin.site.register(Technoplayer4)
admin.site.register(Kenkenplayer)
admin.site.register(Mastermindplayer)
admin.site.register(Crosswordplayer)
admin.site.register(Mysteryplayer)

# Register your models here.
