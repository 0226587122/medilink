from django.conf import settings
from django.db import models
class PatientProfile(models.Model):
    user = models.OneToOneField(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='patient_profile')
    date_of_birth = models.DateField(null=True, blank=True)
    language = models.CharField(max_length=32, default='English')
    def __str__(self): return f"Profile({self.user.username})"
class Clinic(models.Model):
    name = models.CharField(max_length=120)
    address = models.CharField(max_length=255)
    suburb = models.CharField(max_length=80, blank=True)
    phone = models.CharField(max_length=40, blank=True)
    lat = models.FloatField(null=True, blank=True)
    lng = models.FloatField(null=True, blank=True)
    open_hours = models.CharField(max_length=255, blank=True)
    def __str__(self): return self.name
class Appointment(models.Model):
    patient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='appointments')
    clinic = models.ForeignKey(Clinic, on_delete=models.SET_NULL, null=True, blank=True)
    title = models.CharField(max_length=120)
    start = models.DateTimeField()
    end = models.DateTimeField()
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
    class Meta: ordering = ['start']
class Medication(models.Model):
    patient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='medications')
    name = models.CharField(max_length=120)
    dose = models.CharField(max_length=60)
    form = models.CharField(max_length=60, blank=True)
    frequency = models.CharField(max_length=60)
    time_of_day = models.CharField(max_length=20, blank=True)
    start_date = models.DateField()
    end_date = models.DateField(null=True, blank=True)
    notes = models.TextField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)
class Reminder(models.Model):
    patient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='reminders')
    kind = models.CharField(max_length=20, choices=[('med','Medication'),('appt','Appointment')])
    payload = models.JSONField(default=dict)
    next_at = models.DateTimeField()
    sent = models.BooleanField(default=False)
class HealthMetric(models.Model):
    patient = models.ForeignKey(settings.AUTH_USER_MODEL, on_delete=models.CASCADE, related_name='metrics')
    kind = models.CharField(max_length=20, choices=[('bp','Blood Pressure'),('glucose','Glucose'),('mood','Mood')])
    value = models.CharField(max_length=40)
    measured_at = models.DateTimeField(auto_now_add=True)