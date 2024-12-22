import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { EventData, IncidentData } from "../../types/IncidentData";
import { Button, MenuItem, Select, SelectChangeEvent, Stack, TextField, Typography } from "@mui/material";
const colors = [
    "rgba(255, 99, 132)",
    "rgba(54, 162, 235)",
    "rgba(255, 206, 86)",
    "rgba(75, 192, 192)",
    "rgba(153, 102, 255)",
    "rgba(255, 159, 64)",
];
export default function InformationAboutOrganizations() {
    const [dataFromApi, setData] = useState<IncidentData[] | EventData[]>([]);
    const [select, setSelected] = useState<string>("select-year");
    const [year, setYear] = useState<string>("");
    const [nameOfOrganization, setNameOfOrganization] = useState<string>("");
    const [newSearch, seNewSearch] = useState<boolean>(false);

        const handleChange = (event: SelectChangeEvent<string>) => {
                setYear("")
                setNameOfOrganization("")
                setSelected(event.target.value);
        };

        const handelOnClick =  () => {            
            seNewSearch(!newSearch);
        }

    useEffect(() => {
        const getAttack = async () => {
            const response = await fetch(
                `http://localhost:3000/api/year/year-oranization?req=${year? year : nameOfOrganization}`
            );
            const data = await response.json();
            setData(data as IncidentData[]);
        };
        getAttack();
    }, [newSearch]);

    const data = {
        labels: select === "select-year" ? dataFromApi.map((item) => item.organization) : dataFromApi.map((item) => item.year),
        datasets: [
            {
                data: select === "select-year" ? (dataFromApi as EventData[]).map((item) => item.totalEvents) : (dataFromApi as IncidentData[]).map((item) => item.totalIncidents),
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
        <Stack spacing={3} display={"flex"} alignItems={"center"}>
            <Typography variant="h3" id="demo-simple-select-label">
                information about organizations
            </Typography>
            <Select 
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={select}
                label="select"
                onChange={handleChange}
            >
                <MenuItem value={"select-year"}>select year</MenuItem>
                <MenuItem value={"select-organizations"}>select organizations</MenuItem>
            </Select>
            <Stack spacing={3} display={"flex"} alignItems={"center"}>
                {select === "select-year" && <TextField type="number" id="outlined-basic" label="enter year" variant="outlined" value={year} onChange={(e) => setYear(e.target.value)} />}
                {select === "select-organizations" && <TextField id="outlined-basic" label="enter name" variant="outlined" value={nameOfOrganization} onChange={(e) => setNameOfOrganization(e.target.value)}/>}
                <Button variant="contained" onClick={handelOnClick}>Search</Button>
            </Stack>

            <Stack height={100 + "vh"}  width={100 + "vw"} spacing={0} display={"flex"} alignItems={"center"}>
                <Bar data={data} options={options} />
            </Stack>
        </Stack>
    );
}
