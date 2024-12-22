import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { IncidentData } from "../../types/IncidentData";
const colors = [
    "rgba(255, 99, 132)",
    "rgba(54, 162, 235)",
    "rgba(255, 206, 86)",
    "rgba(75, 192, 192)",
    "rgba(153, 102, 255)",
    "rgba(255, 159, 64)",
];
export default function InformationAboutOrganizations() {
    const [dataFromApi, setData] = useState<IncidentData[]>([]);
    
    useEffect(() => {
        const getAttack = async () => {
            const response = await fetch(`http://localhost:3000/api/year/year-oranization?req=White extremists`) 
            const data = await response.json();
            console.log(data);
            
            setData(data as IncidentData[]);
            console.log(dataFromApi.map((item) => item.year));
            
        };
        getAttack();
    }, []);
    
    const data = {
        labels: dataFromApi.map((item) => item.year),
        datasets: [
            {
                data: dataFromApi.map((item) => item.totalIncidents),
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
            <Bar data={data} options={options} />
        </div>
    );
}
