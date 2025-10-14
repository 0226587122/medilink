from django.core.management.base import BaseCommand
from django.contrib.auth.models import User
from django.utils import timezone
from datetime import timedelta
import random
from core.models import Appointment, Medication
class Command(BaseCommand):
    help='Create fake appointments and medications for charts.'
    def handle(self,*args,**kwargs):
        user = User.objects.first() or User.objects.create_superuser('admin','admin@example.com','admin')
        now = timezone.now()
        for i in range(60):
            dt = now - timedelta(days=random.randint(0,180))
            Appointment.objects.create(patient=user, title=f'GP visit {i}', start=dt, end=dt+timedelta(hours=1))
        for i in range(40):
            d = (now - timedelta(days=random.randint(0,180))).date()
            Medication.objects.create(patient=user, name=f'Med {i}', dose='5 mg', frequency='1x/day', start_date=d)
        self.stdout.write(self.style.SUCCESS('Fake data created'))
