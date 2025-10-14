from rest_framework import viewsets, permissions
from rest_framework.decorators import action
from rest_framework.response import Response
from django.db.models import Count
from django.db.models.functions import TruncMonth
from django.utils import timezone
from datetime import timedelta
from .models import Clinic, Appointment, Medication, Reminder, HealthMetric
from .serializers import ClinicSerializer, AppointmentSerializer, MedicationSerializer, ReminderSerializer, HealthMetricSerializer
class ClinicViewSet(viewsets.ModelViewSet):
    queryset = Clinic.objects.all()
    serializer_class = ClinicSerializer
    permission_classes = [permissions.IsAuthenticated]
class AppointmentViewSet(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self): return Appointment.objects.filter(patient=self.request.user)
    def perform_create(self, serializer): serializer.save(patient=self.request.user)
    @action(detail=False, methods=['get'])
    def by_month(self, request):
        qs = self.get_queryset().annotate(month=TruncMonth('start')).values('month').annotate(count=Count('id')).order_by('month')
        return Response(list(qs))
    @action(detail=False, methods=['get'])
    def upcoming(self, request):
        now = timezone.now(); in7 = now + timedelta(days=7); in30 = now + timedelta(days=30)
        qs = self.get_queryset()
        return Response({'next_7_days': qs.filter(start__gte=now, start__lte=in7).count(), 'next_30_days': qs.filter(start__gte=now, start__lte=in30).count()})
class MedicationViewSet(viewsets.ModelViewSet):
    serializer_class = MedicationSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self): return Medication.objects.filter(patient=self.request.user)
    def perform_create(self, serializer): serializer.save(patient=self.request.user)
    @action(detail=False, methods=['get'])
    def by_month(self, request):
        qs = self.get_queryset().annotate(month=TruncMonth('start_date')).values('month').annotate(count=Count('id')).order_by('month')
        return Response(list(qs))
class ReminderViewSet(viewsets.ModelViewSet):
    serializer_class = ReminderSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self): return Reminder.objects.filter(patient=self.request.user)
    def perform_create(self, serializer): serializer.save(patient=self.request.user)
class HealthMetricViewSet(viewsets.ModelViewSet):
    serializer_class = HealthMetricSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self): return HealthMetric.objects.filter(patient=self.request.user)
    def perform_create(self, serializer): serializer.save(patient=self.request.user)