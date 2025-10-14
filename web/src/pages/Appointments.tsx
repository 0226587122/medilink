import { useAppointments, useCreateAppointment } from '../api/queries'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
const ApptSchema=z.object({ title:z.string().min(1,'Required'), start:z.string().min(1,'Required'), end:z.string().min(1,'Required') })
export default function Appointments(){
  const { data }=useAppointments(); const create=useCreateAppointment()
  const { register, handleSubmit, reset, formState:{errors} }=useForm({ resolver:zodResolver(ApptSchema) })
  const onSubmit=(val:any)=>create.mutate(val as any,{ onSuccess:()=>reset() })
  return (<div className="container"><div className="grid cols-2">
    <div className="card"><h3 style={{marginTop:0,color:'var(--blue)'}}>Upcoming Appointments</h3><ul className="list">{data?.map(a=><li key={a.id}><b>{a.title}</b> — {new Date(a.start).toLocaleString()}</li>)}</ul></div>
    <div className="card"><h3 style={{marginTop:0,color:'var(--blue)'}}>Add Appointment</h3>
      <form onSubmit={handleSubmit(onSubmit)} className="grid"><div><div className="label">Title</div><input className="input" {...register('title')} />{errors.title && <small style={{color:'crimson'}}>{String(errors.title.message)}</small>}</div>
      <div><div className="label">Start</div><input className="input" type="datetime-local" {...register('start')} />{errors.start && <small style={{color:'crimson'}}>{String(errors.start.message)}</small>}</div>
      <div><div className="label">End</div><input className="input" type="datetime-local" {...register('end')} />{errors.end && <small style={{color:'crimson'}}>{String(errors.end.message)}</small>}</div>
      <button className="btn" type="submit">Save</button></form></div></div></div>) }
