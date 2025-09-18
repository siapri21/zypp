// MapMontpellier.tsx
import { useEffect, useRef } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function MapMontpellier() {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const mapRef = useRef<L.Map | null>(null);

  useEffect(() => {
    if (!containerRef.current || mapRef.current) return; // déjà initialisé

    const map = L.map(containerRef.current).setView([43.611, 3.877], 14);
    mapRef.current = map;

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 19,
    }).addTo(map);

    const stations = [
      { name: "Comédie", lat: 43.608, lng: 3.879, count: 12 },
      { name: "Gare St-Roch", lat: 43.604, lng: 3.881, count: 8 },
      { name: "Antigone", lat: 43.608, lng: 3.888, count: 5 },
    ];

    const mk = (c: number) =>
      L.divIcon({
        html: `<div style="width:36px;height:36px;border-radius:50%;border:2px solid #16a34a;display:flex;align-items:center;justify-content:center;background:#fff;color:#16a34a;font-weight:700">${c}</div>`,
        className: "",
        iconSize: [36, 36],
      });

    stations.forEach(s =>
      L.marker([s.lat, s.lng], { icon: mk(s.count) })
        .addTo(map)
        .bindPopup(`<strong>${s.name}</strong>`)
    );

    // cleanup pour remount/HMR
    return () => {
      map.remove();
      mapRef.current = null;
    };
  }, []);

  return <div ref={containerRef} style={{ height: "100vh", width: "100%" }} />;
}
