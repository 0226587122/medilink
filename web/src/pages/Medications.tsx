import { useMedications, useCreateMedication } from '../api/queries'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const MedSchema = z.object({
  name: z.string().min(1,'Required'),
  dose: z.string().min(1,'Required'),
  frequency: z.string().min(1,'Required'),
  start_date: z.string().min(1,'Required'),
})

export default function Medications(){
  const { data, isLoading, isError, error } = useMedications()
  const create = useCreateMedication()
  const { register, handleSubmit, reset, formState:{ errors } } = useForm({ resolver: zodResolver(MedSchema) })

  const onSubmit = (val:any) => create.mutate(val as any, { onSuccess: ()=> reset() })

  return (
    <div className="container">
      <div className="grid cols-2">
        <div className="card">
          <h3 style={{marginTop:0,color:'var(--blue)'}}>My Medications</h3>
          {isLoading && <div>Loading…</div>}
          {isError && <div style={{color:'crimson'}}>Error: {(error as any)?.message || 'Failed to load'}</div>}
          {!isLoading && !isError && (
            <ul className="list">{data?.map(m => <li key={m.id}><b>{m.name}</b> — {m.dose} — {m.frequency}</li>)}</ul>
          )}
        </div>
        <div className="card">
          <h3 style={{marginTop:0,color:'var(--blue)'}}>Add Medication</h3>
          <form onSubmit={handleSubmit(onSubmit)} className="grid">
            <div><div className="label">Name</div><input className="input" {...register('name')} />{errors.name && <small style={{color:'crimson'}}>{String(errors.name.message)}</small>}</div>
            <div><div className="label">Dose</div><input className="input" {...register('dose')} />{errors.dose && <small style={{color:'crimson'}}>{String(errors.dose.message)}</small>}</div>
            <div><div className="label">Frequency</div><input className="input" {...register('frequency')} />{errors.frequency && <small style={{color:'crimson'}}>{String(errors.frequency.message)}</small>}</div>
            <div><div className="label">Start Date</div><input className="input" type="date" {...register('start_date')} />{errors.start_date && <small style={{color:'crimson'}}>{String(errors.start_date.message)}</small>}</div>
            <button className="btn" type="submit" disabled={create.isPending}>
              {create.isPending ? 'Saving…' : 'Save'}
            </button>
            {create.isError && <small style={{color:'crimson'}}>Save failed</small>}
          </form>
        </div>
      </div>
    </div>
  )
}
