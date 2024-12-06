from django.contrib import admin
from .models import Task

class TaskAdmin(admin.ModelAdmin):
    list_display = ('title', 'description', 'completed', 'created_at', 'updated_at')  # Fields to display
    search_fields = ('title', 'description')  # Allow searching by title and description

# Register the model with the custom admin options
admin.site.register(Task, TaskAdmin)


