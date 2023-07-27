from django.urls import path
from django.urls.converters import register_converter

from . import views

class SlugConverter:
    regex = r'selfie|group'

    def to_python(self, value):
        return value

    def to_url(self, value):
        return value

register_converter(SlugConverter, 'slug')

app_name = 'page'


urlpatterns = [
    path('', views.index_page, name='index'),
    path('intro/', views.intro_page, name='intro'),
    path('people/', views.people_page, name='people'),
    path('upload/<slug:slug>/', views.upload_page, name='upload'),
    path('upload/', views.upload, name='upload-form'),
    path('result/', views.result, name='result')
]
