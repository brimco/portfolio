# Generated by Django 3.1 on 2020-10-30 18:53

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('portfolio', '0009_auto_20201030_1129'),
    ]

    operations = [
        migrations.AddField(
            model_name='projectimage',
            name='name',
            field=models.TextField(blank=True, default=''),
        ),
    ]
