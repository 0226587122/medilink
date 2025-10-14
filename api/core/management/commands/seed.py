from django.core.management.base import BaseCommand
from core.models import Clinic

SAMPLE = [
  {"name":"CityMed", "address":"8 Albert St, Auckland CBD", "suburb":"CBD", "phone":"09 377 5525"},
  {"name":"Local GP", "address":"Panmure", "suburb":"Panmure", "phone":"09 123 4567"}
]

class Command(BaseCommand):
    help = 'Seed sample clinics.'
    def handle(self, *args, **kwargs):
        for c in SAMPLE:
            Clinic.objects.get_or_create(name=c['name'], defaults=c)
        self.stdout.write(self.style.SUCCESS('Seeded clinics'))