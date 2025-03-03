# Generated by Django 5.1.3 on 2024-11-20 14:42

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('account_management_api', '0018_alter_account_account_type_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='account',
            name='account_type',
            field=models.CharField(choices=[('SVG', 'Savings'), ('CHK', 'Checking'), ('INV', 'Investment')], default='CHK', max_length=3),
        ),
        migrations.AlterField(
            model_name='category',
            name='category_type',
            field=models.CharField(choices=[('INC', 'Income'), ('TRN', 'Transfer'), ('EXP', 'Expense')], default='EXP', max_length=3),
        ),
    ]
