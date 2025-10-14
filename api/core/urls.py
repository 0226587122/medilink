from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import ClinicViewSet, AppointmentViewSet, MedicationViewSet, ReminderViewSet, HealthMetricViewSet
router = DefaultRouter()
router.register(r'clinics', ClinicViewSet)
router.register(r'appointments', AppointmentViewSet, basename='appointments')
router.register(r'medications', MedicationViewSet, basename='medications')
router.register(r'reminders', ReminderViewSet, basename='reminders')
router.register(r'metrics', HealthMetricViewSet, basename='metrics')
urlpatterns = [ path('', include(router.urls)) ]