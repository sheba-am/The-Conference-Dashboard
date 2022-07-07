from django.contrib import admin
from .models import BaseUser, Paper, FeedBack

admin.site.register(BaseUser)
admin.site.register(Paper)
admin.site.register(FeedBack)