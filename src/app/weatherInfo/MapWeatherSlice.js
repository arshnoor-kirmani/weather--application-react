import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  success: false,
  loading: true,
};

const MapWeatherSlice = createSlice({
  name: "citeweather",
  initialState,
  reducers: {
    setMapWeather: (state, action) => {
      Object.assign(state, action.payload);
      state.success = true;
      state.loading = false;
      console.log("Update State", state.current_weather);
    },
  },
});
export const { setMapWeather } = MapWeatherSlice.actions;
export default MapWeatherSlice.reducer;
