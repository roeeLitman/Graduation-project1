import React from "react";
import { Route, Routes } from "react-router-dom";
import RankingAttackTypes from "./pages/RankingAttackTypes/RankingAttackTypes";
export default function App() {
    return (
        <div>
            <Routes>
                <Route path="/" element={<RankingAttackTypes/>} />
            </Routes>
        </div>
    );
}
