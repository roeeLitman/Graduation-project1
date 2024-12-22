import React, { useEffect, useState } from "react";
import { Pie, Bar } from "react-chartjs-2";
import { Chart as ChartJS, BarElement,CategoryScale,LinearScale,Tooltip,Legend,ArcElement,} from "chart.js";
ChartJS.register(ArcElement,BarElement, CategoryScale, LinearScale, Tooltip, Legend);

const colors = [
    'rgba(255, 99, 132, 0.2)',  // אדום עם שקיפות 20%
    'rgba(54, 162, 235, 0.2)',  // כחול עם שקיפות 20%
    'rgba(255, 206, 86, 0.2)',  // צהוב עם שקיפות 20%
    'rgba(75, 192, 192, 0.2)',  // ירוק עם שקיפות 20%
    'rgba(153, 102, 255, 0.2)', // סגול עם שקיפות 20%
    'rgba(255, 159, 64, 0.2)',  // כתום עם שקיפות 20%
  ];

export default function FrequencyOfIncidents() {

        const [dataFromApi, setData] = useState([]);
    
        useEffect(() => {
            const getAttack = async () => {
                const response = await fetch(
                    `http://localhost:3000/api/year/incident-trends`
                );
                const data = await response.json();
                setData(data);
            };
            getAttack();
        }, []);
            const data = {
                labels: dataFromApi.map((item: any) => item.name),
                datasets: [
                    {
                        label: "Sales",
                        data: dataFromApi.map((item: any) => item.casualties),
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
            <Bar data={data} options={options} />
        </div>
    );
}
