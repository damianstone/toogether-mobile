# Generated by Django 4.0.3 on 2022-06-12 00:04

import django.contrib.auth.models
from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0005_remove_match_members_alter_profile_options_and_more'),
    ]

    operations = [
        migrations.AlterModelManagers(
            name='profile',
            managers=[
                ('objects', django.contrib.auth.models.UserManager()),
            ],
        ),
    ]
