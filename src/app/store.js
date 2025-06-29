import { configureStore } from "@reduxjs/toolkit";
import CurrentWeather from "./weatherInfo/CurrentWeatherSlice";
const store = configureStore({
  reducer: {
    currentweather: CurrentWeather,
  },
});

export default store;
