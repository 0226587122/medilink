import { useMedications, useCreateMedication } from '../api/queries'
import { useState } from 'react'

export default function Medications(){
  const { data } = useMedications()
  const create = useCreateMedication()
  const [form, setForm] = useState({ name:'', dose:'', frequency:'', start_date:'' })

  const submit = () => {
    if(!form.name || !form.dose || !form.frequency || !form.start_date) return
    create.mutate(form as any)
    setForm({ name:'', dose:'', frequency:'', start_date:'' })
  }

  return (
    <div style={{padding:24}}>
      <h2>My Medications</h2>
      <ul>{data?.map(m => <li key={m.id}>{m.name} — {m.dose} — {m.frequency}</li>)}</ul>
      <hr />
      <h3>Add Medication</h3>
      <div style={{display:'grid', gap:8, maxWidth:400}}>
        <input placeholder="Name" value={form.name} onChange={e=>setForm(f=>({...f, name:e.target.value}))} />
        <input placeholder="Dose (e.g., 5 mg)" value={form.dose} onChange={e=>setForm(f=>({...f, dose:e.target.value}))} />
        <input placeholder="Frequency (e.g., 2x/day)" value={form.frequency} onChange={e=>setForm(f=>({...f, frequency:e.target.value}))} />
        <input type="date" value={form.start_date} onChange={e=>setForm(f=>({...f, start_date:e.target.value}))} />
        <button onClick={submit}>Save</button>
      </div>
    </div>
  )
}