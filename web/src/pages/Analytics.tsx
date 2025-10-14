import { useApptByMonth, useMedByMonth, useApptUpcoming } from '../api/queries'
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, BarChart, Bar } from 'recharts'
function fmtMonth(iso:string){ try{ return new Date(iso).toISOString().slice(0,7) }catch{return iso} }
export default function Analytics(){
  const { data: apptByMonth }=useApptByMonth(); const { data: medByMonth }=useMedByMonth(); const { data: upcoming }=useApptUpcoming()
  const apptData=(apptByMonth||[]).map(d=>({month:fmtMonth(d.month),count:d.count})); const medData=(medByMonth||[]).map(d=>({month:fmtMonth(d.month),count:d.count}))
  return (<div className="container"><div className="grid">
    <div className="card"><h3 style={{marginTop:0,color:'var(--blue)'}}>Upcoming Appointments</h3>
      <div style={{display:'flex',gap:16,flexWrap:'wrap'}}>
        <div className="kpi card"><div className="label">Next 7 days</div><div className="value">{upcoming?.next_7_days ?? 0}</div></div>
        <div className="kpi card"><div className="label">Next 30 days</div><div className="value">{upcoming?.next_30_days ?? 0}</div></div>
      </div></div>
    <div className="card"><h3 style={{marginTop:0,color:'var(--blue)'}}>Appointments by Month</h3><div style={{height:280}}>
      <ResponsiveContainer width="100%" height="100%"><LineChart data={apptData}>
        <CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="month"/><YAxis allowDecimals={false}/><Tooltip/><Line type="monotone" dataKey="count" />
      </LineChart></ResponsiveContainer></div></div>
    <div className="card"><h3 style={{marginTop:0,color:'var(--blue)'}}>Medications Added by Month</h3><div style={{height:280}}>
      <ResponsiveContainer width="100%" height="100%"><BarChart data={medData}>
        <CartesianGrid strokeDasharray="3 3"/><XAxis dataKey="month"/><YAxis allowDecimals={false}/><Tooltip/><Bar dataKey="count" />
      </BarChart></ResponsiveContainer></div></div></div></div>)
}
