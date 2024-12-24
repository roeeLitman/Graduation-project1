import React, { useState } from "react";
import {
    MapContainer,
    TileLayer,
    useMapEvents,
    Marker,
    Popup,
} from "react-leaflet";
import { TextField, Button, Box } from "@mui/material";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

const customIcon = new L.Icon({
    iconUrl:
        "https://www.pngkit.com/png/detail/17-175946_location-vector-symbol-google-maps-marker-blue.png",
    iconSize: [25, 41],
    iconAnchor: [15, 45],
    popupAnchor: [0, -45],
});

export default function CreateNewEvent() {
    const [position, setPosition] = useState(null);
    const [formData, setFormData] = useState({
      latitude: '',
      longitude: '',
      field1: '',
      field2: '',
    });
  
    const [errors, setErrors] = useState({});
  
    const LocationMarker = () => {
      useMapEvents({
        click: (event) => {
          const { lat, lng, } = event.latlng;
          setPosition([lat, lng]);
          setFormData({ ...formData, latitude: lat, longitude: lng });
        },
      });
      return position === null ? null : (
        <Marker position={position}>
        <Popup>
          <Box component="form" onSubmit={()=>{}} sx={{ width: '200px' }}>
            <Button
            onClick={()=>{}}
              variant="contained"
              color="primary"
              fullWidth
              sx={{ marginTop: '10px' }}
            >
              Submit
            </Button>
          </Box>
        </Popup>
      </Marker>
      )
    };
  

    return (
        <MapContainer
          center={[51.505, -0.09]}
          zoom={13}
          style={{ height: '500px', width: '100%' }}
        >
            
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <LocationMarker/>
        </MapContainer>
      
    );
    

}
