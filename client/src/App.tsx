import React, { useEffect } from "react";
import { data, Route, Routes } from "react-router-dom";
import RankingAttackTypes from "./pages/RankingAttackTypes/RankingAttackTypes";
import { useAppDispatch } from "./redux/store";
import { getAttack } from "./redux/slices/attackSlice";
import FrequencyOfIncidents from "./pages/FrequencyOfIncidents/FrequencyOfIncidents";
export default function App() {

    return (
        <div>
            <Routes>
                <Route path="/" element={<RankingAttackTypes/>} />
                <Route path="/Frequency-of-incidents" element={<FrequencyOfIncidents/>} />
            </Routes>
        </div>
    );
}
