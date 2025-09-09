from django.shortcuts import render

# Create your views here.
def index_page(request):
    return render(request, "index.html")

def inner_page(request):
    return render(request, "inner.html")