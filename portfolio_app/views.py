from django.shortcuts import render, redirect
from .models import *
from .form import PortfolioForm, ProjectForm


# Create your views here.
def index(request):
    if request.method == "POST":
        form = PortfolioForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect("index")
    else:
        form = PortfolioForm()

    projects = Project.objects.filter(is_featured=True)
    return render(request, "index.html", {"form": form, "projects": projects})


# def project_create(request):
#     if request.method == "POST":
#         form = ProjectForm(request.POST, request.FILES)
#         if form.is_valid():
#             form.save()
#             return redirect("project_create")
#     else:
#         form = ProjectForm()

#     projects = Project.objects.all()
#     return render(
#         request,
#         "project_form.html",
#         {
#             "form": form,
#             "projects": projects,
#         },
#     )
def index(request):
    projects = Project.objects.all()
    
    context = {
        'projects': projects
    }
    
    return render(request, 'index.html', context)