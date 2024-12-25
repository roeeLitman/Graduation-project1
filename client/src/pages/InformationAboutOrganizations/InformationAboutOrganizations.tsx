import  { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { EventData, IncidentData } from "../../types/IncidentData";
import {
    Button,
    MenuItem,
    Select,
    SelectChangeEvent,
    Stack,
    TextField,
    Typography,
} from "@mui/material";
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
        setYear("");
        setNameOfOrganization("");
        setSelected(event.target.value);
    };

    const handelOnClick = () => {
        seNewSearch(!newSearch);
    };

    useEffect(() => {
        const getAttack = async () => {
            const response = await fetch(
                `https://graduation-project1-1.onrender.com/api/year/year-oranization?req=${
                    year ? year : nameOfOrganization
                }`
            );
            const data = await response.json();
            setData(data as IncidentData[]);
        };
        getAttack();
    }, [newSearch]);

    const data = {
        labels:
            select === "select-year"
                ? dataFromApi.map((item) => item.organization) as string[]
                : dataFromApi.map((item) => item.year.toString()),  
        datasets: [
            {
                data:
                    select === "select-year"
                        ? (dataFromApi as EventData[]).map(
                              (item) => item.totalEvents
                          )
                        : (dataFromApi as IncidentData[]).map(
                              (item) => item.totalIncidents
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
        <Stack
            sx={{
                backgroundColor: "#fff",
                padding: 3,
                borderRadius: 2,
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
                border: "1px solid #e0e0e0",
            }}
            className="ranking-attack-types"
            spacing={2}
            direction="column"
            alignItems="space-between"
            justifyContent={"space-between"}
        >
            <Stack>
                <Typography variant="h3" id="demo-simple-select-label">
                    Incident Summary by Organization and Year
                </Typography>
            </Stack>
            <Stack>
                <Select
                    labelId="demo-simple-select-label"
                    id="demo-simple-select"
                    value={select}
                    label="select"
                    onChange={handleChange}
                >
                    <MenuItem value={"select-year"}>select year</MenuItem>
                    <MenuItem value={"select-organizations"}>
                        select organizations
                    </MenuItem>
                </Select>
            </Stack>
            <Stack spacing={3} display={"flex"} alignItems={"center"}>
                {select === "select-year" && (
                    <TextField
                        type="number"
                        id="outlined-basic"
                        label="enter year"
                        variant="outlined"
                        value={year}
                        onChange={(e) => setYear(e.target.value)}
                    />
                )}
                {select === "select-organizations" && (
                    <TextField
                        id="outlined-basic"
                        label="enter name"
                        variant="outlined"
                        value={nameOfOrganization}
                        onChange={(e) => setNameOfOrganization(e.target.value)}
                    />
                )}
                <Button variant="contained" onClick={handelOnClick}>
                    Search
                </Button>
            </Stack>

            <Stack
                justifyContent={"center"}
                alignItems={"center"}
                width={50 + "vw"}
                height={50 + "vh"}
            >
                <Bar data={data} options={options} />
            </Stack>
        </Stack>
    );
}
