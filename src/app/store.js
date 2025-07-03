import { configureStore } from "@reduxjs/toolkit";
import CurrentWeather from "./weatherInfo/CurrentWeatherSlice";
import CitesWeather from "./weatherInfo/CitesWeatherSlice";
const store = configureStore({
  reducer: {
    currentweather: CurrentWeather,
    citeweather: CitesWeather,
  },
});

export default store;
