import { useClinics } from '../api/queries'

export default function Clinics(){
  const { data } = useClinics()
  return (
    <div style={{padding:24}}>
      <h2>Clinics</h2>
      <ul>{data?.map(c => <li key={c.id}>{c.name} — {c.suburb} — {c.phone}</li>)}</ul>
      <p style={{marginTop:16}}>Add mapping later with Leaflet.</p>
    </div>
  )
}