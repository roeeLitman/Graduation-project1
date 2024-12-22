import React from 'react'
import { Route, Routes } from "react-router-dom";


export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<div>Home</div>}></Route>
      </Routes>
      </div>
  )
}
