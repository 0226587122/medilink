import { useState } from 'react'
import { login } from '../api/auth'
import { useNavigate } from 'react-router-dom'

export default function Login(){
  const [u,setU]=useState('')
  const [p,setP]=useState('')
  const [err,setErr]=useState<string|null>(null)
  const nav=useNavigate()
  const submit = async () => {
    try{
      await login(u,p)
      nav('/')
    }catch(e:any){
      setErr('Invalid credentials')
    }
  }
  return (
    <div style={{maxWidth:440, margin:'4rem auto', display:'grid', gap:12}}>
      <h1>MediLink NZ</h1>
      <input placeholder="Username" value={u} onChange={e=>setU(e.target.value)} />
      <input placeholder="Password" type="password" value={p} onChange={e=>setP(e.target.value)} />
      <button onClick={submit}>Login</button>
      {err && <small style={{color:'crimson'}}>{err}</small>}
    </div>
  )
}