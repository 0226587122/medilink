export type ID = number

export interface Clinic { id: ID; name: string; address: string; suburb?: string; lat?: number; lng?: number; phone?: string; open_hours?: string }
export interface Appointment { id: ID; clinic?: ID; title: string; start: string; end: string; notes?: string }
export interface Medication { id: ID; name: string; dose: string; form?: string; frequency: string; time_of_day?: string; start_date: string; end_date?: string; notes?: string }