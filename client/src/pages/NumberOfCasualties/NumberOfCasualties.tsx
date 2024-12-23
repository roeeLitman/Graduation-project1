import React, { useEffect, useState } from "react";
import Map from "../../components/navBar/map/Map";
import topLocationDTO from "../../types/TopLoction";
import { current } from "@reduxjs/toolkit";
import { Button, Stack, TextField, Typography } from "@mui/material";

export default function NumberOfCasualties() {
    const [data, setData] = useState<topLocationDTO[]>([]);
    const [city, setCity] = useState<string>("");
    const [selectCyti, SetSelectCyti] = useState<boolean>(false);

    const handelOnClick = () => {
        SetSelectCyti(!selectCyti);
        setData([]);
    };

    useEffect(() => {
        const getTopLocations = async () => {
            const response = await fetch(
                `http://localhost:3000/api/location/top-location?city=${city}`
            );
            const datafromApi = await response.json();

            if (Array.isArray(datafromApi)) {
                setData((prevData) => [...prevData, ...datafromApi]);
            } else if (datafromApi) {                
                setData((prevData) => [...prevData, datafromApi]);
            }

        };
        getTopLocations();
    }, [selectCyti]);

    return (
        <Stack spacing={2} direction="column">
            <Stack
                direction={"row"}
                spacing={2}
                alignItems={"center"}
                justifyContent={"space-around"}
            >
                <Typography variant="h4" id="demo-simple-select-label">
                    Places with the highest average casualties
                </Typography>
                <Stack spacing={2} direction="row" padding={2}>
                    <TextField value={city} onChange={(e) => setCity(e.target.value)} variant="filled" label="enter city or nothing" />
                    <Button onClick={handelOnClick} variant="contained">Slect city</Button>
                </Stack>
            </Stack>
            <Stack>
                <Map data={data} />
            </Stack>
        </Stack>
    );
}
