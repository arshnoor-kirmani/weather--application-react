import React from "react";
import { Routes, Route, Router } from "react-router-dom";
import {
  Layout,
  CitesWeather,
  CurrentWeather,
  Setting,
  MapWeather,
} from "./components";
function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route path="" element={<CurrentWeather />} />
        <Route path="/cites" element={<CitesWeather />} />
        <Route path="/map" element={<MapWeather />} />
        <Route path="/setting" element={<Setting />} />
      </Route>
      <Route path="*" exact={true} element={<h1>Not Found</h1>} />
    </Routes>
  );
}

export default App;
