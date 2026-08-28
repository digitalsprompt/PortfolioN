from django.contrib import admin
from .models import Portfolio, Project

# Register your models here.
class PortfolioAdmin(admin.ModelAdmin):
    list_display = ('name', 'email', 'created_at')
    search_fields = ('name', 'email')


class ProjectAdmin(admin.ModelAdmin):
    list_display = ("title", "is_featured", "display_order", "created_at")
    list_filter = ("is_featured",)
    search_fields = ("title", "description", "tags")
    
admin.site.register(Portfolio, PortfolioAdmin)
admin.site.register(Project, ProjectAdmin)
