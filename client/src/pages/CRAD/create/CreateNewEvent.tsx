import React, { useEffect, useRef, useState } from "react";
import {
    MapContainer,
    TileLayer,
    useMapEvents,
    Marker,
    Popup,
} from "react-leaflet";
import { TextField, Button, Box, Stack } from "@mui/material";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import { Incident } from "../../../types/Incident";

const customIcon = new L.Icon({
    iconUrl:
        "https://www.pngkit.com/png/detail/17-175946_location-vector-symbol-google-maps-marker-blue.png",
    iconSize: [25, 41],
    iconAnchor: [15, 45],
    popupAnchor: [0, -45],
});

export default function CreateNewEvent() {
    const [positionOnClick, setPositionOnClick] = useState<
        null | [number, number]
    >(null);
    const [markersOnMap, setMarkersOnMap] = useState<JSX.Element[] | null>(
        null
    );
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const popupRef = useRef<L.Popup>(null);

    const [formData, setFormData] = useState<Incident>({
        year: null,
        month: null,
        city: "",
        lat: null,
        long: null,
        attacktype: "",
        organization: "",
        casualties: null,
    });
    const createNewEvent = async () => {
        const response = await fetch(
            "http://localhost:3000/api/crud/create-event",
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            }
        );
        const datafromApi = await response.json();
        console.log(datafromApi);
    };

    useEffect(() => {
        const getEventsFromDb = async () => {
            const response = await fetch(
                "http://localhost:3000/api/crud/get-hundred/1"
            );
            const datafromApi = await response.json();
            if (Array.isArray(datafromApi)) {
                setMarkersOnMap(
                    datafromApi.map((item: Incident, index) => (
                        <Marker
                            key={index}
                            position={[item.lat!, item.long!]}
                            icon={customIcon}
                        >
                            <Popup>
                                <Box component="form" sx={{ width: "200px" }}>
                                    <Button
                                        onClick={() => {}}
                                        variant="contained"
                                        color="primary"
                                        fullWidth
                                        sx={{ marginTop: "10px" }}
                                    >
                                        Submit
                                    </Button>
                                </Box>
                            </Popup>
                        </Marker>
                    ))
                );
            }
        };
        getEventsFromDb();
    }, []);
;

    const LocationMarker = () => {
        useMapEvents({
            click: (e) => {
                const { lat, lng } = e.latlng;
                setPositionOnClick([lat, lng]);
                setFormData({ ...formData, lat: lat, long: lng });
            },
        });
        return positionOnClick === null ? null : (
            <Marker position={positionOnClick}>
                <Popup
                    closeOnEscapeKey={false}
                    autoClose={false}
                    closeOnClick={false}
                >
                    <Stack
                        spacing={2}
                        component="form"
                        onSubmit={() => {}}
                        sx={{ width: "300px" }}
                    >
                        <TextField
                            type="number"
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    year: parseInt(e.target.value),
                                });
                            }}
                            value={formData.year}
                            label="year"
                            size="small"
                        />
                        <TextField
                            type="number"
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    month: parseInt(e.target.value),
                                });
                            }}
                            value={formData.month}
                            label="month"
                            size="small"
                        />
                        <TextField
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    city: e.target.value,
                                });
                            }}
                            value={formData.city}
                            label="city"
                            size="small"
                        />
                        <TextField
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    attacktype: e.target.value,
                                });
                            }}
                            value={formData.attacktype}
                            label="attacktype"
                            size="small"
                        />
                        <TextField
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    organization: e.target.value,
                                });
                            }}
                            value={formData.organization}
                            label="organization"
                            size="small"
                        />
                        <TextField
                            onChange={(e) => {
                                setFormData({
                                    ...formData,
                                    casualties: parseInt(e.target.value),
                                });
                            }}
                            value={formData.casualties}
                            label="casualties"
                            size="small"
                        />
                        <Button
                            onClick={createNewEvent}
                            variant="contained"
                            color="primary"
                            fullWidth
                            sx={{ marginTop: "10px" }}
                        >
                            Submit
                        </Button>
                    </Stack>
                </Popup>
            </Marker>
        );
    };
    return (
        <MapContainer
            center={[51.505, -0.09]}
            zoom={13}
            style={{ height: "500px", width: "100%" }}
        >
            <TileLayer
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                attribution="&copy; OpenStreetMap contributors"
            />
            {markersOnMap}
            <LocationMarker />
        </MapContainer>
    );
}
