import React, { useRef, useEffect, useState } from "react";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const OpenStreetMapClick = () => {
  const [x, setlocatio] = useState({ lat: 0, lng: 0 });
  const mapRef = useRef(null);
  useEffect(() => {
    // Initialize map only once
    if (mapRef.current && !mapRef.current._leaflet_id) {
      const map = L.map(mapRef.current).setView([20.5937, 78.9629], 5); // Center: India

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
      }).addTo(map);

      let marker = null;

      map.on("click", function (e) {
        const { lat, lng } = e.latlng;
        if (marker) {
          marker.setLatLng([lat, lng]);
        } else {
          marker = L.marker([lat, lng]).addTo(map);
        }
        alert(`Latitude: ${lat}\nLongitude: ${lng}`);
        setlocatio({
          lat: lat,
          lng: lng,
        });
      });
    }
  }, []);

  return (
    <div>
      <h1>Cite Weather {`${x.lat}||${x.lng}`}</h1>
      <div ref={mapRef} id="map" style={{ height: "400px", width: "100%" }} />
    </div>
  );
};

export default function MapWeather() {
  return <OpenStreetMapClick />;
}
