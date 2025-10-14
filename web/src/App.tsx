import { Routes, Route, Navigate, Link } from 'react-router-dom'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Medications from './pages/Medications'
import Appointments from './pages/Appointments'
import Clinics from './pages/Clinics'

const isAuthed = () => !!localStorage.getItem('access')

function RequireAuth({ children }: { children: JSX.Element }) {
  return isAuthed() ? children : <Navigate to="/login" />
}

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/" element={<RequireAuth><Dashboard /></RequireAuth>} />
      <Route path="/meds" element={<RequireAuth><Medications /></RequireAuth>} />
      <Route path="/appts" element={<RequireAuth><Appointments /></RequireAuth>} />
      <Route path="/clinics" element={<RequireAuth><Clinics /></RequireAuth>} />
      <Route path="*" element={<div style={{padding:24}}><h3>Not Found</h3><Link to="/">Go Home</Link></div>} />
    </Routes>
  )
}