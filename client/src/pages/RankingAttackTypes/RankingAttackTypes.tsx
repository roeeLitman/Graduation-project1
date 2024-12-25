import { useEffect, useState } from "react";
import "./RankingAttackTypes.css";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
    ArcElement,
} from "chart.js";
import { Pie } from "react-chartjs-2";
import { attackType } from "../../types/attackType";
import { Stack, Typography } from "@mui/material";
const colors = [
    "rgba(255, 99, 132)",
    "rgba(54, 162, 235)",
    "rgba(255, 206, 86)",
    "rgba(75, 192, 192)",
    "rgba(153, 102, 255)",
    "rgba(255, 159, 64)",
];

ChartJS.register(
    ArcElement,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend
);

export default function RankingAttackTypes() {
    const [dataFromApi, setData] = useState([]);

    useEffect(() => {
        const getAttack = async () => {
            const response = await fetch(
                `https://graduation-project1-1.onrender.com/api/typesAttack/get-rating/`
            );
            const data = await response.json();
            setData(data);
        };
        getAttack();
    }, []);

    const data = {
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
        <Stack
            sx={{backgroundColor: "#fff", padding: 3, borderRadius: 2, boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)", border: "1px solid #e0e0e0",}}
            
            className="ranking-attack-types"
            spacing={2}
            direction="column"
            alignItems="space-between"
            justifyContent={"space-between"}
        >
            <Stack>
                <Typography variant="h3">
                    Deadliest Attack Types Analysis
                </Typography>
            </Stack>
            <Stack justifyContent={"center"} alignItems={"center"} width={80 + "vw"} height={80 + "vh"}  >
                <Pie data={data} options={options} />
            </Stack>
        </Stack>
    );
}
