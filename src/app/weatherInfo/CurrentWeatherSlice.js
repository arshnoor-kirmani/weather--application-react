import { createSlice } from "@reduxjs/toolkit";
const initialState = {
  success: false,
  loading: true,
};

const Currentweather = createSlice({
  name: "currentweather",
  initialState,
  reducers: {
    setCurrentWeather: (state, action) => {
      Object.assign(state, action.payload);
      state.success = true;
      state.loading = false;
    },
  },
});
export const { setCurrentWeather } = Currentweather.actions;
export default Currentweather.reducer;
