import os

from django.shortcuts import render, redirect
from django.conf import settings
from django.http import JsonResponse
from django.urls import reverse

from .models import Person
from utils.json import parse_data


def index_page(request):
    return redirect('page:intro')


def intro_page(request):
    return render(request, 'intro.html')


def people_page(request):
    context = {}
    filepath = os.path.join(settings.BASE_DIR, 'pages', 'fixture', 'people.json')
    people_data = parse_data(filepath)
    people = []
    for person_data in people_data:
        people.append(
            Person.json_to_model(person_data)
        )
    context['people'] = people

    return render(request, 'people.html', context=context)


def upload_page(request, slug):
    context = {
        "slug": slug
    }

    return render(request, 'upload.html', context=context)


def upload(request):
    if request.method == 'POST' and request.FILES:
        file = request.FILES['file']
        sex = request.POST.get('sex')
        print(file)
        print(sex)

        return JsonResponse({"success": True, "redirect_url": reverse('page:result')})
    else:
        return JsonResponse({"success": False, "error": "Invalid request"})


def result(request):
    return render(request, 'result.html')
