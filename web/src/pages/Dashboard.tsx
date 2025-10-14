import { Link } from 'react-router-dom'
export default function Dashboard(){
  return (
    <div style={{padding:24}}>
      <h2>Kia ora — MediLink NZ</h2>
      <p>Quick links:</p>
      <ul>
        <li><Link to="/meds">My Medications</Link></li>
        <li><Link to="/appts">Appointments</Link></li>
        <li><Link to="/clinics">Clinics</Link></li>
      </ul>
    </div>
  )
}