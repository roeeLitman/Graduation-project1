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
        console.log(!lastyear);
        
        const response = await fetch(
            `http://localhost:3000/api/year/incident-trends?${
                !lastyear
                    ? `firstyear=${firstyear}`
                    : `firstyear=${firstyear}&lastyear=${lastyear}`
            }`
        )        
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
        <div className="ranking-attack-types">
            <Typography variant="h3"   id="demo-simple-select-label">Select year</Typography>
            <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={!selected ? year : selected}
                label="Age"
                onChange={handleChange}
            >
                <MenuItem value={"decade=true"}>10 years</MenuItem>
                <MenuItem value={"fiveyear=true"}>5 years</MenuItem>
                <MenuItem value={"Select one year"}>Select one year</MenuItem>
                <MenuItem value={"Select a range"}>Select a range</MenuItem>
            </Select>
            {selected === "Select a range" ? (
                <Stack>
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
                    <Button onClick={hndelOnclick}>send</Button>
                </Stack>
            ) : selected === "Select one year" ? (
                <Stack display={"flex"}>
                    <TextField
                        id="select one year"
                        type="number"
                        label="Standard"
                        variant="standard"
                        value={firstyear}
                        onChange={(e) => setFirstyear(e.target.value)}
                    />
                    <Button onClick={hndelOnclick}>send</Button>
                </Stack>
            ) : null}
            <Bar data={data} options={options} />
        </div>
    );
}
