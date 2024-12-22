import React, { useEffect, useState } from "react";
import "./RankingAttackTypes.css";
import {
    Chart as ChartJS,
    BarElement,
    CategoryScale,
    LinearScale,
    Tooltip,
    Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { useAppDispatch, useAppSelector } from "../../redux/store";
import { getAttack } from "../../redux/slices/attackSlice";
import { attackType } from "../../types/attackType";
import { dataStatus } from "../../types/redux.typs";

ChartJS.register(BarElement, CategoryScale, LinearScale, Tooltip, Legend);


export default function RankingAttackTypes() {
  const [dataFromApi, setData] = useState([]);

  useEffect(() => {
    const getAttack = async () => {
      const response = await fetch( `http://localhost:3000/api/typesAttack/get-rating`)
      const data = await response.json()
      setData(data)      
    }
    getAttack()
  },[])

    const data = {
        labels: dataFromApi.map((item: attackType) => item.name), 
        datasets: [
            {
                label: "Sales", 
                data: dataFromApi.map((item: attackType) => item.casualties), 
                backgroundColor: "rgba(75, 192, 192, 0.2)",
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
    )
}
