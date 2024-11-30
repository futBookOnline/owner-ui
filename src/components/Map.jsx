import React, { useState } from "react";
import { MapContainer, TileLayer, Marker, useMapEvents } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Fix marker icon issue in Leaflet when using with React
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  iconUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  shadowUrl: "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
});

const Map = ({ location, onPositionChange }) => {
  const [markerPosition, setMarkerPosition] = useState([
    location.latitude,
    location.longitude,
  ]); // Initial position for Kathmandu

  // Handle map click to update marker position
  const MapClickHandler = () => {
    useMapEvents({
      click(event) {
        const { lat, lng } = event.latlng;
        setMarkerPosition([lat, lng]); // Update marker position
        console.log(`Marker set to: ${lat}, ${lng}`);
      },
    });
    return null; // This component doesn't render anything visible
  };

  // Handle marker drag to update its position
  const handleDragEnd = (event) => {
    const { lat, lng } = event.target.getLatLng();
    setMarkerPosition([lat, lng]); // Update marker position
    onPositionChange({longitude: lng, latitude: lat });
    console.log(`Marker dragged to: ${lat}, ${lng}`);
  };

  return (
    <MapContainer
      center={markerPosition} // Center the map at the marker's position
      zoom={17} // Initial zoom level
      style={{ height: "400px", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        // attribution="© OpenStreetMap contributors"
        maxZoom={19}
      />
      {/* Draggable marker */}
      <Marker
        position={markerPosition}
        draggable={true}
        eventHandlers={{
          dragend: handleDragEnd, // Handle drag event
        }}
      />
      {/* Handle map clicks */}
      <MapClickHandler />
    </MapContainer>
  );
};

export default Map;
