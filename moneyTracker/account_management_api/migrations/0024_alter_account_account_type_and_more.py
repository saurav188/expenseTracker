# Generated by Django 5.1.3 on 2025-02-02 16:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account_management_api', '0023_alter_account_account_type_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='account_type',
            field=models.CharField(choices=[('WAL', 'Mobile Wallet'), ('INV', 'Investment'), ('SVG', 'Savings'), ('CHK', 'Checking')], default='CHK', max_length=3),
        ),
        migrations.AlterField(
            model_name='category',
            name='category_type',
            field=models.CharField(choices=[('TRN', 'Transfer'), ('EXP', 'Expense'), ('INC', 'Income')], default='EXP', max_length=3),
        ),
    ]
