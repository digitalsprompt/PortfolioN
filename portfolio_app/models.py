from django.db import models
from cloudinary.models import CloudinaryField

# Create your models here.

class Portfolio(models.Model):
    name = models.CharField(max_length=100)
    email = models.EmailField(null=True, blank=True)
    message = models.TextField(null=True, blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.name
    
class Project(models.Model):
    title = models.CharField(max_length=150)
    description = models.TextField()
    image = CloudinaryField('image', blank=True, null=True)
    tags1 = models.CharField(
        max_length=255,
        blank=True,
        help_text="Comma-separated tags (e.g. React, Node.js, MongoDB).",
    )
    tags2 = models.CharField(
        max_length=255,
        blank=True,
        help_text="Comma-separated tags (e.g. React, Node.js, MongoDB).",
    )
    tags3 = models.CharField(
        max_length=255,
        blank=True,
        help_text="Comma-separated tags (e.g. React, Node.js, MongoDB).",
    )
    project_url = models.URLField(blank=True)
    is_featured = models.BooleanField(default=True)
    display_order = models.PositiveIntegerField(default=0)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["display_order", "-created_at"]

    def __str__(self):
        return self.title
