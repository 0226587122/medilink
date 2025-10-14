from rest_framework import viewsets, permissions
from .models import Clinic, Appointment, Medication, Reminder, HealthMetric
from .serializers import ClinicSerializer, AppointmentSerializer, MedicationSerializer, ReminderSerializer, HealthMetricSerializer

class ClinicViewSet(viewsets.ModelViewSet):
    queryset = Clinic.objects.all()
    serializer_class = ClinicSerializer
    permission_classes = [permissions.IsAuthenticated]

class AppointmentViewSet(viewsets.ModelViewSet):
    serializer_class = AppointmentSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return Appointment.objects.filter(patient=self.request.user)
    def perform_create(self, serializer):
        serializer.save(patient=self.request.user)

class MedicationViewSet(viewsets.ModelViewSet):
    serializer_class = MedicationSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return Medication.objects.filter(patient=self.request.user)
    def perform_create(self, serializer):
        serializer.save(patient=self.request.user)

class ReminderViewSet(viewsets.ModelViewSet):
    serializer_class = ReminderSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return Reminder.objects.filter(patient=self.request.user)
    def perform_create(self, serializer):
        serializer.save(patient=self.request.user)

class HealthMetricViewSet(viewsets.ModelViewSet):
    serializer_class = HealthMetricSerializer
    permission_classes = [permissions.IsAuthenticated]
    def get_queryset(self):
        return HealthMetric.objects.filter(patient=self.request.user)
    def perform_create(self, serializer):
        serializer.save(patient=self.request.user)