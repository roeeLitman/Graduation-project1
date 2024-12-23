import React, { useEffect, useState } from "react";
import { EventData, OrganizationData } from "../../types/OrganizationData";
import { Button, MenuItem, Select, SelectChangeEvent, Stack, TextField } from "@mui/material";
import { Pie } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";
import Map from "../../components/navBar/map/Map";

ChartJS.register(
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);

const colors = [
    "rgba(255, 99, 132)",
    "rgba(54, 162, 235)",
    "rgba(255, 206, 86)",
    "rgba(75, 192, 192)",
    "rgba(153, 102, 255)",
    "rgba(255, 159, 64)",
];
export default function TopTerrorOrganizations() {
    const [data, setData] = useState<OrganizationData[] | EventData[]>([]);
    const [city, setCity] = useState<string>("");
    const [searchByCity, setSearchByCity] = useState<boolean>(false);
    const [displayTabelOrMap, setDisplayTabelOrMap] =
        useState<string>("show-table");
    const handleChange = (event: SelectChangeEvent<string>) => {
        setDisplayTabelOrMap(event.target.value);
    };

    const handelOnClick = () => {
        if(!city){
            setSearchByCity(false)
        }
        setSearchByCity(!searchByCity);
    };

    useEffect(() => {
        const getTopLocations = async () => {
            const response = await fetch(
                `http://localhost:3000/api/location/top-organization?city=${city}`
            );
            if (!response.ok) {
                
                throw new Error(response.statusText);
            }
            const datafromApi = await response.json();

            if (datafromApi[0] !==  "location not found") {                
                setData(datafromApi);
            }else{
                setSearchByCity(false)
            }
        };
        getTopLocations();
    }, [searchByCity]);

    const dataToPie = {
        labels: !searchByCity
            ? (data as EventData[]).map((item) => item.name)
            : (data as OrganizationData[]).map((item) => item.organization),
        datasets: [
            {
                data: !searchByCity
                    ? (data as EventData[]).map((item) => item.casualties)
                    : (data as OrganizationData[]).map(
                          (item) => item.totalEvents
                      ),
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
            <Stack spacing={2} direction="column">
                <TextField value={city} onChange={(e) => setCity(e.target.value)} />
                <Button onClick={() => handelOnClick()}>Search</Button>
            </Stack>

                
            {displayTabelOrMap === "show-table" ? (
                <Stack
                    spacing={2}
                    direction="column"
                    width={90 + "vw"}
                    height={90 + "vh"}
                >
                    <Pie data={dataToPie} options={options} />
                </Stack>
            ) : (
                <Stack
                    spacing={2}
                    direction="column"
                    width={90 + "vw"}
                    height={90 + "vh"}
                >
                    <Map data={data} />
                </Stack>
            )}
        </div>
    );
}
