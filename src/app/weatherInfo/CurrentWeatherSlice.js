import { createSlice } from "@reduxjs/toolkit";
const initialState = {};

const Currentweather = createSlice({
  name: "currentweather",
  initialState,
  reducers: {
    setCurrentWeather: (state, action) => {
      const resp = action.payload;
      state = resp;
    },
  },
});
export const { setCurrentWeather } = Currentweather.actions;
export default Currentweather.reducer;
