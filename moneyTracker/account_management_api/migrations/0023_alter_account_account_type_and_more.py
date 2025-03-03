# Generated by Django 5.1.3 on 2025-02-02 16:16

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account_management_api', '0022_alter_account_account_type_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='account_type',
            field=models.CharField(choices=[('CHK', 'Checking'), ('SVG', 'Savings'), ('INV', 'Investment'), ('WAL', 'Mobile Wallet')], default='CHK', max_length=3),
        ),
        migrations.AlterField(
            model_name='category',
            name='category_type',
            field=models.CharField(choices=[('EXP', 'Expense'), ('INC', 'Income'), ('TRN', 'Transfer')], default='EXP', max_length=3),
        ),
    ]
