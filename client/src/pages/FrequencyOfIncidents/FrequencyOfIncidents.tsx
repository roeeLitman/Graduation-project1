import React, { useEffect, useState } from "react";
import { Pie, Bar, Line } from "react-chartjs-2";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";
import { AttackData } from "../../types/AttackData";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { Button, Stack, TextField, Typography } from "@mui/material";

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

export default function FrequencyOfIncidents() {
    const [dataFromApi, setData] = useState([]);
    const [year, setYear] = useState("decade=true");
    const [selected, setSelected] = useState("");
    const [firstyear, setFirstyear] = useState("");
    const [lastyear, setLastyear] = useState("");

    const handleChange = (event: SelectChangeEvent) => {
        if (
            event.target.value === "decade=true" ||
            event.target.value === "fiveyear=true"
        ) {
            setSelected("");
            return setYear(event.target.value);
        }
        setSelected(event.target.value);
    };

    const hndelOnclick = async () => {
        if(!firstyear)  return

        const response = await fetch(
            `http://localhost:3000/api/year/incident-trends?${
                !lastyear
                    ? `firstyear=${firstyear}`
                    : `firstyear=${firstyear}&lastyear=${lastyear}`
            }`
        );
        const data = await response.json();
        setData(data);
    };

    useEffect(() => {
        const getAttack = async () => {
            const response = await fetch(
                `http://localhost:3000/api/year/incident-trends?${year}`
            );
            const data = await response.json();
            console.log(year);

            setData(data);
        };
        getAttack();
    }, [year]);

    const data = {
        labels: dataFromApi.map((item: AttackData) => item.year),
        datasets: [
            {
                data: dataFromApi.map(
                    (item: AttackData) => item.listAmontType.length
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
        <Stack  sx={{backgroundColor: "#fff", padding: 3, borderRadius: 2, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", border: "1px solid #e0e0e0",}}
        spacing={2}
        direction="column"
        alignItems="space-between"
        justifyContent={"space-between"}
        >
            <Stack>
                <Typography variant="h4" id="demo-simple-select-label">
                    Incident Frequency by Year and Month
                </Typography>
            </Stack>
            <Stack>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={!selected ? year : selected}
                    label="Age"
                    onChange={handleChange}
                >
                    <MenuItem value={"decade=true"}>10 years</MenuItem>
                    <MenuItem value={"fiveyear=true"}>5 years</MenuItem>
                    <MenuItem value={"Select one year"}>
                        Select one year
                    </MenuItem>
                    <MenuItem value={"Select a range"}>Select a range</MenuItem>
                </Select>
            </Stack>
            {selected === "Select a range" ? (
                <Stack display={"flex"} spacing={2} alignItems={"center"} justifyContent={"space-between"}>
                    <TextField
                        id="standard-basic"
                        type="number"
                        label="first year"
                        variant="standard"
                        value={firstyear}
                        onChange={(e) => setFirstyear(e.target.value)}
                    />
                    <TextField
                        type="number"
                        id="last year"
                        label="Standard"
                        variant="standard"
                        value={lastyear}
                        onChange={(e) => setLastyear(e.target.value)}
                    />
                    <Button sx={{width: 30 + "%"}} variant="contained" onClick={hndelOnclick}>send</Button>
                </Stack>
            ) : selected === "Select one year" ? (
                <Stack display={"flex"} spacing={2} alignItems={"center"} justifyContent={"space-between"}>
                    <TextField
                        id="select one year"
                        type="number"
                        label="Standard"
                        variant="standard"
                        value={firstyear}
                        onChange={(e) => setFirstyear(e.target.value)}
                    />
                    <Button sx={{width: 30 + "%"}} variant="contained" onClick={hndelOnclick}>send</Button>
                </Stack>
            ) : null}
            <Stack justifyContent={"center"} alignItems={"center"} width={50 + "vw"} height={50 + "vh"}>
                <Bar data={data} options={options} />
            </Stack>
        </Stack >
    );
}
