import { MapContainer, TileLayer, Polygon } from "react-leaflet";
import "leaflet/dist/leaflet.css";

const zones: [number, number][][] = [
  // zone exemple autour du centre de Montpellier
  [[43.615,3.85],[43.615,3.89],[43.61,3.89],[43.61,3.85]],
  [[43.61,3.88],[43.61,3.905],[43.6,3.905],[43.6,3.88]],
];

export default function CityMap(){
  return (
    <MapContainer center={[43.611, 3.877]} zoom={13} scrollWheelZoom={false}>
      <TileLayer
        attribution='&copy; OpenStreetMap'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      {zones.map((z,i)=>(
        <Polygon key={i} pathOptions={{ color: "#2563eb" }} positions={z} />
      ))}
    </MapContainer>
  );
}
