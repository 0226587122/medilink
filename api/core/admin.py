from django.contrib import admin
from .models import Clinic, Appointment, Medication, Reminder, HealthMetric, PatientProfile
admin.site.register([Clinic, Appointment, Medication, Reminder, HealthMetric, PatientProfile])