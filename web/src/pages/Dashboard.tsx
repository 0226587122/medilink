import { Link } from 'react-router-dom'
export default function Dashboard(){ return (<div className="container" style={{paddingTop:16}}>
  <div className="grid cols-2">
    <div className="card"><h3 style={{marginTop:0,color:'var(--blue)'}}>Quick Access</h3>
      <ul className="list"><li><Link to="/meds">My Medications</Link></li><li><Link to="/appts">Appointments</Link></li><li><Link to="/clinics">Clinics</Link></li><li><Link to="/analytics">Analytics</Link></li></ul>
    </div>
    <div className="card"><h3 style={{marginTop:0,color:'var(--blue)'}}>Kia ora!</h3><p>Mobile-friendly dashboard. Manage meds, appointments, clinics and analytics.</p></div>
  </div></div>) }
