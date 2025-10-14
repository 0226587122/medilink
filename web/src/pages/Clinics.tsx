import { useClinics } from '../api/queries'
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet'
export default function Clinics(){
  const { data }=useClinics(); const center:[number,number]=[-36.8485,174.7633]
  return (<div className="container"><div className="grid">
    <div className="card"><h3 style={{marginTop:0,color:'var(--blue)'}}>Clinics</h3><ul className="list">{data?.map(c=><li key={c.id}><b>{c.name}</b> — {c.suburb} — {c.phone}</li>)}</ul></div>
    <div className="card"><h3 style={{marginTop:0,color:'var(--blue)'}}>Map</h3><div className="map">
      <MapContainer center={center} zoom={11} style={{height:'100%',width:'100%'}}><TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {data?.filter(c=>c.lat && c.lng).map(c=>(<Marker key={c.id} position={[c.lat!,c.lng!]}><Popup><b>{c.name}</b><br/>{c.address}</Popup></Marker>))}
      </MapContainer></div></div></div></div>)
}
