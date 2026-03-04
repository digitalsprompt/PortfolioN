from django import forms
from .models import Portfolio, Project


class PortfolioForm(forms.ModelForm):
    class Meta:
        model = Portfolio
        fields = ["name", "email", "message"]


class ProjectForm(forms.ModelForm):
    class Meta:
        model = Project
        fields = [
            "title",
            "description",
            "image",
            "tags1",
            "tags2",
            "tags3",
            "project_url",
            "is_featured",
            "display_order",
        ]
