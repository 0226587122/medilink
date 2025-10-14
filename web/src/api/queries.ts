import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import api from './client'
import type { Appointment, Medication, Clinic } from '../types'

export const useClinics = () => useQuery({
  queryKey: ['clinics'],
  queryFn: async () => (await api.get<Clinic[]>('/clinics/')).data,
})

export const useMedications = () => useQuery({
  queryKey: ['medications'],
  queryFn: async () => (await api.get<Medication[]>('/medications/')).data,
})

export const useCreateMedication = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: Partial<Medication>) => api.post('/medications/', payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['medications'] }),
  })
}

export const useAppointments = () => useQuery({
  queryKey: ['appointments'],
  queryFn: async () => (await api.get<Appointment[]>('/appointments/')).data,
})

export const useCreateAppointment = () => {
  const qc = useQueryClient()
  return useMutation({
    mutationFn: (payload: Partial<Appointment>) => api.post('/appointments/', payload),
    onSuccess: () => qc.invalidateQueries({ queryKey: ['appointments'] }),
  })
}