import React, { useEffect, useState } from "react";
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
const colors = [
  'rgba(255, 99, 132)',  
  'rgba(54, 162, 235)',  
  'rgba(255, 206, 86)',  
  'rgba(75, 192, 192)',  
  'rgba(153, 102, 255)', 
  'rgba(255, 159, 64)',  
];


ChartJS.register(ArcElement,BarElement, CategoryScale, LinearScale, Tooltip, Legend);

export default function RankingAttackTypes() {
    const [dataFromApi, setData] = useState([]);

    useEffect(() => {
        const getAttack = async () => {
            const response = await fetch(
                `http://localhost:3000/api/typesAttack/get-rating/`
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
        <div className="ranking-attack-types">
            <Pie data={data} options={options} />
        </div>
    );
}

