import { useState } from 'react'
import { login } from '../api/auth'
import { useNavigate } from 'react-router-dom'
export default function Login(){
  const [u,setU]=useState(''); const [p,setP]=useState(''); const [err,setErr]=useState<string|null>(null); const nav=useNavigate()
  const submit=async(e:React.FormEvent)=>{ e.preventDefault(); try{ await login(u,p); nav('/') }catch{ setErr('Invalid credentials') } }
  return (<div className="container" style={{maxWidth:420, marginTop:64}}><div className="card" style={{display:'grid', gap:12}}>
    <h2 style={{margin:0,color:'var(--blue)'}}>MediLink NZ</h2><p style={{marginTop:-6,color:'var(--accent)'}}>Sign in with your account</p>
    <form onSubmit={submit} className="grid"><div><div className="label">Username</div><input className="input" value={u} onChange={e=>setU(e.target.value)} /></div>
    <div><div className="label">Password</div><input className="input" type="password" value={p} onChange={e=>setP(e.target.value)} /></div>
    {err && <small style={{color:'crimson'}}>{err}</small>}<button className="btn" type="submit">Sign in</button></form></div></div>) }
