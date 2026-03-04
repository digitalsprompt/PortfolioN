from django.shortcuts import render, redirect
from .models import *
from .form import PortfolioForm, ProjectForm
from django.core.mail import send_mail
from django.template.loader import render_to_string


# Create your views here.
def index(request):
    if request.method == "POST":
        form = PortfolioForm(request.POST)
        if form.is_valid():
            
            html = render_to_string("contactform.html", {
                "name": form.cleaned_data["name"],
                "email": form.cleaned_data["email"], 
                "message": form.cleaned_data["message"]
                })
            
            send_mail(
                subject=f"New contact form submission from {form.cleaned_data['name']}",
                from_email=form.cleaned_data["email"],
                message=form.cleaned_data["message"],
                recipient_list=["arokoolafemi@gmail.com"],
                html_message=html,
            )
            
            return redirect("index")
    else:
        form = PortfolioForm()

    projects = Project.objects.all()
    return render(request, "index.html", {"form": form, "projects": projects})
