# Generated by Django 5.1.3 on 2024-11-20 14:39

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('auth_api', '0003_remove_user_date_joined_remove_user_email_and_more'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='user',
            name='address',
        ),
        migrations.RemoveField(
            model_name='user',
            name='phone_no',
        ),
        migrations.RemoveField(
            model_name='user',
            name='profile_picture',
        ),
    ]