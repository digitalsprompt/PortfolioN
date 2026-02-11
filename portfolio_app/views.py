from urllib import request
from django.shortcuts import render, redirect
from .models import Portfolio
from .form import PortfolioForm
# from django.http import HttpResponse

# Create your views here.

def index(request):
    if request.method == 'POST':
        form = PortfolioForm(request.POST)
        if form.is_valid():
            form.save()
            return redirect('index')  # Redirect to a success page or the same page
        else:
            print("Form errors:", form.errors)  # Debug output
    else:
        form = PortfolioForm()
    return render(request, 'index.html', {'form': form})

# def info(request):
#     if request.method == 'POST':
#         form = PortfolioForm(request.POST)
#         if form.is_valid():
#             form.save()
#             return redirect('index')  # Redirect to a success page or the same page
#     else:
#         form = PortfolioForm()
#     return render(request, 'index.html', {'form': form})
    