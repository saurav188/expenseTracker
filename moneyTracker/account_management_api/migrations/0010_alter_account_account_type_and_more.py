# Generated by Django 5.0.7 on 2024-09-23 12:59

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account_management_api', '0009_transaction_trn_date_alter_account_account_type_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='account_type',
            field=models.CharField(choices=[('INV', 'Investment'), ('CHK', 'Checking'), ('SVG', 'Savings')], default='CHK', max_length=3),
        ),
        migrations.AlterField(
            model_name='category',
            name='category_type',
            field=models.CharField(choices=[('EXP', 'Expense'), ('INC', 'Income'), ('TRN', 'Transfer')], default='EXP', max_length=3),
        ),
    ]
