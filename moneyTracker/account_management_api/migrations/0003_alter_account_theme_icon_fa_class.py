# Generated by Django 5.0.4 on 2024-04-17 11:57

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account_management_api', '0002_alter_account_balance_alter_account_description'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='theme_icon_fa_class',
            field=models.CharField(max_length=50, null=True, verbose_name='Theme Icon FA class'),
        ),
    ]