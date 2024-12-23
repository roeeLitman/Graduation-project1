import React, { useEffect, useState } from "react";
import L from "leaflet";
import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import topLocationDTO from "../../../types/TopLoction";

const customIcon = new L.Icon({
    iconUrl:
        "https://www.pngkit.com/png/detail/17-175946_location-vector-symbol-google-maps-marker-blue.png",
    iconSize: [25, 41],
    iconAnchor: [15, 45],
    popupAnchor: [0, -45],
});

interface Props {
    data: topLocationDTO[];
}

export default function Map({ data }: Props) {
    console.log(data[0]);
    

    return (
        <div className="map-data">
            <MapContainer
                className="map"
                style={{
                    height: "83vh",
                    width: "100%",
                }}
                center={[31.7683, 35.2137]}
                zoom={4}
                scrollWheelZoom={true}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                <Marker icon={customIcon} position={[31.8517, 35.2656]}>
                    <Popup>TEST</Popup>
                </Marker>

                {data.length > 0 &&
                    data.map((item, index) => (
                        <Marker
                            key={index}
                            icon={customIcon}
                            position={[item.lat, item.long]}
                        >
                            <Popup>
                                {`${item.city ? ` אזור: ${item.city}` : ""}
                                ${
                                    item.organization
                                        ? ` אירגון: ${item.organization},`
                                        : ""
                                } 
                                ${item.name ? ` אירגון: ${item.name},` : ""} 
                                ${
                                    item.totalEvents
                                        ? ` מספר אירועים: ${item.totalEvents},`
                                        : ""
                                }
                                ${
                                    item.casualties
                                        ? ` מספר נפגעים: ${item.casualties}`
                                        : ""
                                }`}
                            </Popup>
                        </Marker>
                    ))}
            </MapContainer>
        </div>
    );
}
