import { Button, Stack, TextField, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import Map from "../../components/navBar/map/Map";
import { LocationData } from "../../types/LocationData";

export default function TerrorHighestCasualties() {
    const [data, setData] = useState<LocationData[]>([]);
    const [nameOfOrganiztion, setNameOfOrganiztion] = useState<string>("");
    const [selectOrganztion, SetSelectCyti] = useState<boolean>(false);

    const handelOnClick = () => {
        SetSelectCyti(!selectOrganztion);
        setData([]);
    };

    useEffect(() => {
        const getTopLocations = async () => {
            const response = await fetch(
                `http://localhost:3000/api/location//top-location-for-organization?organization=${nameOfOrganiztion}`
            );
            if (!response.ok) {
                throw new Error(response.statusText);
            }
            const datafromApi = await response.json();

            if (Array.isArray(datafromApi)) {
                const datafromApiWithOrganization = datafromApi.map((item) => ({
                    ...item,
                    organization: nameOfOrganiztion,
                }));
                setData((prevData) => [
                    ...prevData,
                    ...datafromApiWithOrganization,
                ]);
            }
        };
        getTopLocations();
    }, [selectOrganztion]);
    return (
        <Stack sx={{backgroundColor: "#fff", padding: 3, borderRadius: 2, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", border: "1px solid #e0e0e0",}}
        width={60 + "vw"} >
            <Stack
                direction={"row"}
                spacing={2}
                alignItems={"center"}
                justifyContent={"space-around"}
            >
                <Typography variant="h4" id="demo-simple-select-label">
                    Regions with Deadliest Attacks by Organization
                </Typography>
                <Stack spacing={2} direction="row" padding={2}>
                    <TextField
                        value={nameOfOrganiztion}
                        onChange={(e) => setNameOfOrganiztion(e.target.value)}
                        variant="filled"
                        label="enter name of trore organization"
                    />
                    <Button onClick={handelOnClick} variant="contained">
                        Select organization
                    </Button>
                </Stack>
            </Stack>
            <Stack>
                <Map data={data} />
            </Stack>
        </Stack>
    );
}
