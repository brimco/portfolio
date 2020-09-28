from django.contrib import admin

from .models import Project, ProjectImage

# Register your models here.

class ProjectImageInline(admin.TabularInline):
    model = ProjectImage

class ProjectAdmin(admin.ModelAdmin):
    model = Project
    inlines = [ProjectImageInline, ]

admin.site.register(Project, ProjectAdmin)
admin.site.register(ProjectImage)