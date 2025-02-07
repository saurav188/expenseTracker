from django.db import models
from django.contrib.auth.models import User 

# Create your models here.
# class BaseUser(User):
#     profile_picture=models.ImageField(upload_to='img/user_profile_picture',null=True, blank=True)
#     phone_no=models.IntegerField(null=True, blank=True)
#     address=models.CharField(null=True,max_length=200,blank=True)

#     def __str__(self):
#         return self.username

from django.dispatch import receiver
from django.urls import reverse
from django_rest_passwordreset.signals import reset_password_token_created
from django.core.mail import send_mail, EmailMessage

@receiver(reset_password_token_created)
def password_reset_token_created(sender, instance, reset_password_token, *args, **kwargs):

    # the below like concatinates your websites reset password url and the reset email token which will be required at a later stage
    # email_plaintext_message = "Open the link to reset your password" + " " + "{}{}".format(instance.request.build_absolute_uri("http://localhost:3000/api/auth/user/password_reset/confirm/?token="), reset_password_token.key)
    email_plaintext_message = "Open the link to reset your password" + " " + "{}{}".format(instance.request.build_absolute_uri("http://localhost:3000/password-reset-confirm/?token="), reset_password_token.key)
    
    """
        this below line is the django default sending email function, 
        takes up some parameter (title(email title), message(email body), from(email sender), to(recipient(s))
    """
    send_mail(
        # title:
        "Password Reset for {title}".format(title=" Expense Tracker "),
        # message:
        email_plaintext_message,
        # from:
        "no-reploy@expenseTracker.com",
        # to:
        [reset_password_token.user.email],
        fail_silently=False,
    )