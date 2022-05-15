# Generated by Django 4.0.3 on 2022-05-14 18:45

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('api', '0001_initial'),
    ]

    operations = [
        migrations.RemoveField(
            model_name='profile',
            name='photo',
        ),
        migrations.AddField(
            model_name='profile',
            name='photos',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='citylat',
            field=models.DecimalField(blank=True, decimal_places=6, default='-2.319', max_digits=9, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='citylong',
            field=models.DecimalField(blank=True, decimal_places=6, default='52.555', max_digits=9, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='description',
            field=models.TextField(blank=True, max_length=500, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='gender',
            field=models.CharField(blank=True, choices=[('MALE', 'Male'), ('FEMALE', 'Female')], default='BOTH', max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='is_group',
            field=models.BooleanField(blank=True, default=False, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='lastname',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='location',
            field=models.CharField(blank=True, default='', max_length=100, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='name',
            field=models.CharField(blank=True, max_length=200, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='show_gender',
            field=models.CharField(blank=True, choices=[('MALE', 'Men'), ('FEMALE', 'Women'), ('BOTH', 'Both')], default='FEMALE', max_length=10, null=True),
        ),
        migrations.AlterField(
            model_name='profile',
            name='university',
            field=models.CharField(blank=True, max_length=20, null=True),
        ),
    ]
