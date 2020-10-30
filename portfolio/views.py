from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.core.mail import send_mail
import json
from os import getenv, listdir, getcwd

from .models import Project

# Create your views here.

def index(request):
    return render(request, 'index.html')

def projects(request):
    projects = Project.objects.filter(active=True).order_by('order')
    return render(request, 'projects.html', {'projects': projects})

def contact(request):
    message = ''
    message_class = None
    my_email = getenv('EMAIL_HOST_USER')
    data = {'name': '', 'email': '', 'message': ''}

    if request.method == 'POST':
        data = request.POST
        if data['name'] == '' or data['email'] == '' or data['message'] == '':
            message = 'Please fill out every field before submitting.'
            message_class = 'failed'
        else:
            success = send_mail(
                subject=f"Portfolio message from {data['name']}",
                message=f"Message from {data['name']} ({data['email']}):\n\n {data['message']}",
                from_email=data['email'], 
                recipient_list=[my_email],
            )

            if success:
                message = '✓ Message was sent.'
                message_class = 'success'
            else:
                message = f'There was an error sending the message. Please <a href="mailto:{my_email}">send an email</a> instead.'
                message_class = 'failed'

    return render(request, 'contact.html', {
        'message': message, 
        'message_class': message_class,
        'name': data['name'],
        'email': data['email'],
        'form_message': data["message"],
    })