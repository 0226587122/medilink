import { useAppointments, useCreateAppointment } from '../api/queries'
import { useState } from 'react'

export default function Appointments(){
  const { data } = useAppointments()
  const create = useCreateAppointment()
  const [form, setForm] = useState({ title:'', start:'', end:'' })

  const submit = () => {
    if(!form.title || !form.start || !form.end) return
    create.mutate(form as any)
    setForm({ title:'', start:'', end:'' })
  }

  return (
    <div style={{padding:24}}>
      <h2>Upcoming Appointments</h2>
      <ul>{data?.map(a => <li key={a.id}>{a.title} | {new Date(a.start).toLocaleString()}</li>)}</ul>
      <hr />
      <h3>Add Appointment</h3>
      <div style={{display:'grid', gap:8, maxWidth:420}}>
        <input placeholder="Title" value={form.title} onChange={e=>setForm(f=>({...f, title:e.target.value}))} />
        <label>Start</label>
        <input type="datetime-local" value={form.start} onChange={e=>setForm(f=>({...f, start:e.target.value}))} />
        <label>End</label>
        <input type="datetime-local" value={form.end} onChange={e=>setForm(f=>({...f, end:e.target.value}))} />
        <button onClick={submit}>Save</button>
      </div>
    </div>
  )
}