import { configureStore } from "@reduxjs/toolkit";
import CurrentWeather from "./weatherInfo/CurrentWeatherSlice";
import CitesWeather from "./weatherInfo/CitesWeatherSlice";
import MapWeather from "./weatherInfo/MapWeatherSlice";
import Setting from "../app/weatherInfo/SettingSlice";
const store = configureStore({
  reducer: {
    currentweather: CurrentWeather,
    citeweather: CitesWeather,
    mapweather: MapWeather,
    setting: Setting,
  },
});

export default store;
