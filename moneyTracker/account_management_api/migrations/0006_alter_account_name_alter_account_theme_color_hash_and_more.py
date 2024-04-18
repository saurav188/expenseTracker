# Generated by Django 5.0.4 on 2024-04-17 12:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account_management_api', '0005_alter_account_user_id_alter_category_user_id'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='name',
            field=models.CharField(max_length=200, unique=True),
        ),
        migrations.AlterField(
            model_name='account',
            name='theme_color_hash',
            field=models.CharField(max_length=7, null=True, unique=True, verbose_name='Theme Color'),
        ),
        migrations.AlterField(
            model_name='category',
            name='name',
            field=models.CharField(max_length=200, unique=True),
        ),
        migrations.AlterField(
            model_name='category',
            name='theme_color_hash',
            field=models.CharField(max_length=7, null=True, unique=True, verbose_name='Theme Color'),
        ),
    ]
