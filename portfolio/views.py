from django.shortcuts import render
from django.http import HttpResponse, HttpResponseRedirect, JsonResponse
from django.core.mail import send_mail
import json
from os import getenv


# Create your views here.

def index(request):
    return render(request, 'index.html')

def projects(request):
    return render(request, 'projects.html')

def contact(request):
    message = ''
    message_class = None
    my_email = getenv('EMAIL_HOST_USER')
    if request.method == 'POST':
        data = request.POST
        success = send_mail(
            subject=f"Portfolio message from {data['name']}",
            message=f"Message from {data['name']} ({data['email']}): {data['message']}",
            from_email=data['email'], 
            recipient_list=[my_email],
        )

        if success:
            message = '✓ Email was sent.'
            message_class = 'success'
        else:
            message = f'email: {my_email}. There was an error sending the message. Please try again later or reach out another way.'
            message_class = 'failed'

    return render(request, 'contact.html', {'message': message, 'message_class': message_class, 'mail_link': f'mailto:{my_email}'})
