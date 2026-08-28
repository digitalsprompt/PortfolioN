from django.shortcuts import render, redirect
from django.conf import settings
from django.contrib import messages
import resend
from .models import *
from .form import PortfolioForm, ProjectForm

# Create your views here.
def index(request):
    if request.method == "POST":
        form = PortfolioForm(request.POST)
        if form.is_valid():
            try:
                resend.Emails.send({
                    "from": settings.RESEND_FROM_EMAIL,
                    "to": [settings.CONTACT_RECIPIENT_EMAIL],
                    "subject": f"New message from {form.cleaned_data['name']}",
                    "html": f"""
                        <h3>New Contact Message</h3>
                        <p><strong>Name:</strong> {form.cleaned_data["name"]}</p>
                        <p><strong>Email:</strong> {form.cleaned_data["email"]}</p>
                        <p><strong>Message:</strong> {form.cleaned_data["message"]}</p>
                    """,
                })
            except Exception:
                messages.error(
                    request,
                    "Your message could not be sent right now because the email service is unavailable.",
                )
            else:
                messages.success(request, "Your message has been sent successfully.")
                return redirect("index")
    else:
        form = PortfolioForm()

    projects = Project.objects.all()
    return render(request, "index.html", {"form": form, "projects": projects})
