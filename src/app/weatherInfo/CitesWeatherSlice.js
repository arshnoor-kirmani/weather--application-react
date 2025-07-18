import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  success: false,
  loading: true,
};

const CitesWeatherSlice = createSlice({
  name: "citeweather",
  initialState,
  reducers: {
    setCitesWeather: (state, action) => {
      Object.assign(state, action.payload);
      state.success = true;
      state.loading = false;
    },
  },
});
export const { setCitesWeather } = CitesWeatherSlice.actions;
export default CitesWeatherSlice.reducer;
