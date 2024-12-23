import React, { useEffect, useState } from "react";
import { OrganizationData } from "../../types/OrganizationData";
import { MenuItem, Select, SelectChangeEvent, Stack } from "@mui/material";
import { Pie } from "react-chartjs-2";

export default function TopTerrorOrganizations() {
    const [data, setData] = useState<OrganizationData[]>([]);
    const [nameOfLocation, setNameOfLocation] = useState<string>("");
    const [displayTabelOrMap, setDisplayTabelOrMap] =
        useState<string>("show-table");
    const handleChange = (event: SelectChangeEvent<string>) => {
        setDisplayTabelOrMap(event.target.value);
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
                setData((prevData) => [...prevData, ...datafromApi]);
            }
        };
        getTopLocations();
    }, []);

    const dataToPie = {
        labels: dataFromApi.map((item: attackType) => item.name),
        datasets: [
            {
                label: "Sales",
                data: dataFromApi.map((item: attackType) => item.casualties),
                backgroundColor: colors,
                borderColor: "rgba(75, 192, 192, 1)",
                borderWidth: 1,
            },
        ],
    };

    const options = {
        responsive: true,
        plugins: {
            legend: {
                display: true,
            },
            tooltip: {
                enabled: true,
            },
        },
    };
    return (
        <div>
            <Stack spacing={2} direction="column">
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={displayTabelOrMap}
                    label="select"
                    onChange={(e) => {
                        handleChange(e);
                    }}
                >
                    <MenuItem value={"show-table"}>Show table</MenuItem>
                    <MenuItem value={"show-map"}>Show map </MenuItem>
                </Select>
            </Stack>
            {displayTabelOrMap === "show-table" ? (
                <Stack>
                    <Pie data={dataToPie} options={options} />
                </Stack>
            ) : null}
        </div>
    );
}
