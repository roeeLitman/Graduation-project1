import React from "react";
import { data, Route, Routes } from "react-router-dom";
import RankingAttackTypes from "./pages/RankingAttackTypes/RankingAttackTypes";
import FrequencyOfIncidents from "./pages/FrequencyOfIncidents/FrequencyOfIncidents";
import NavBar from "./components/navBar/NavBar";
import InformationAboutOrganizations from "./pages/InformationAboutOrganizations/InformationAboutOrganizations";
import NumberOfCasualties from "./pages/NumberOfCasualties/NumberOfCasualties";
import TerrorHighestCasualties from "./pages/terrorHighestCasualties/TerrorHighestCasualties";
import TopTerrorOrganizations from "./pages/TopTerrorOrganizations/TopTerrorOrganizations";
import { Stack } from "@mui/material";
export default function App() {
    return (
        <Stack width={100 + "vw"} height={100 + "vh"}>
            <NavBar />
            <Stack alignItems={"center"} justifyContent={"center"} >
                <Routes>
                    <Route path="/" element={<RankingAttackTypes />} />
                    <Route
                        path="/Frequency-of-incidents"
                        element={<FrequencyOfIncidents />}
                    />
                    <Route
                        path="/information-on-organizations"
                        element={<InformationAboutOrganizations />}
                    />
                    <Route
                        path="/Number-of-casualties"
                        element={<NumberOfCasualties />}
                    />
                    <Route
                        path="/terror-highest-casualties"
                        element={<TerrorHighestCasualties />}
                    />
                    <Route
                        path="/top-terror-organizations"
                        element={<TopTerrorOrganizations />}
                    />
                </Routes>
            </Stack>
        </Stack>
    );
}
