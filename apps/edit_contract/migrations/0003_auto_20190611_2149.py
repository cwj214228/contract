# Generated by Django 2.0 on 2019-06-11 13:49

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('edit_contract', '0002_auto_20190602_2118'),
    ]

    operations = [
        migrations.AlterField(
            model_name='contract',
            name='uid',
            field=models.CharField(max_length=128, primary_key=True, serialize=False),
        ),
    ]
