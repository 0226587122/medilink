import { useMedications, useCreateMedication } from '../api/queries'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

// …imports unchanged…
export default function Appointments(){
  const { data, isLoading, isError, error } = useAppointments()
  const create = useCreateAppointment()
  // …form code unchanged…

  return (
    <div className="container">
      <div className="grid cols-2">
        <div className="card">
          <h3 style={{marginTop:0,color:'var(--blue)'}}>Upcoming Appointments</h3>
          {isLoading && <div>Loading…</div>}
          {isError && <div style={{color:'crimson'}}>Error: {(error as any)?.message || 'Failed to load'}</div>}
          {!isLoading && !isError && (
            <ul className="list">{data?.map(a => <li key={a.id}><b>{a.title}</b> — {new Date(a.start).toLocaleString()}</li>)}</ul>
          )}
        </div>
        {/* form block the same; add disabled + error like above if you want */}
      </div>
    </div>
  )
}
