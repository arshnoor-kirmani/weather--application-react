import { configureStore } from "@reduxjs/toolkit";
import CurrentWeather from "./weatherInfo/CurrentWeatherSlice";
import CitesWeather from "./weatherInfo/CitesWeatherSlice";
import MapWeather from "./weatherInfo/MapWeatherSlice";
const store = configureStore({
  reducer: {
    currentweather: CurrentWeather,
    citeweather: CitesWeather,
    mapweather: MapWeather,
  },
});

export default store;
