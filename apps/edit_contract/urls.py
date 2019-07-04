from django.urls import path
from . import views

app_name = 'edit_contract'
urlpatterns = [
    path('', views.edit_contract, name='edit_contract'),
    path('save_contract/', views.save_contract, name='save_contract'),
    path('save_signature_two/', views.save_signature_two, name='save_signature_two'),
]