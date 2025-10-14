import { BrowserRouter, Routes, Route, Link, Navigate, useNavigate } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Medications from './pages/Medications'
import Appointments from './pages/Appointments'
import Clinics from './pages/Clinics'
import Analytics from './pages/Analytics'
function NavBar(){
  const nav = useNavigate()
  const logout = () => { localStorage.removeItem('access'); localStorage.removeItem('refresh'); nav('/login') }
  return (<div className="nav"><div className="brand"><Link to="/">MediLink NZ</Link></div><div className="right">
    <Link to="/meds">Meds</Link><Link to="/appts">Appts</Link><Link to="/clinics">Clinics</Link><Link to="/analytics">Analytics</Link>
    <button className="btn secondary" onClick={logout}>Logout</button></div></div>)
}
const isAuthed = () => !!localStorage.getItem('access')
function RequireAuth({ children }:{ children: JSX.Element }){ return isAuthed()? children : <Navigate to="/login" /> }
export default function App(){ return (<BrowserRouter>{isAuthed() && <NavBar/>}<Routes>
  <Route path="/login" element={<Login/>} />
  <Route path="/" element={<RequireAuth><Dashboard/></RequireAuth>} />
  <Route path="/meds" element={<RequireAuth><Medications/></RequireAuth>} />
  <Route path="/appts" element={<RequireAuth><Appointments/></RequireAuth>} />
  <Route path="/clinics" element={<RequireAuth><Clinics/></RequireAuth>} />
  <Route path="/analytics" element={<RequireAuth><Analytics/></RequireAuth>} />
  <Route path="*" element={<Navigate to="/" />} />
</Routes><div className="footer">© {new Date().getFullYear()} MediLink NZ · Blue/Gray</div></BrowserRouter>) }
