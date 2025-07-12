import { createSlice } from "@reduxjs/toolkit";
const initialState = {};

const SettingSlice = createSlice({
  name: "setting",
  initialState,
  reducers: {
    setSetting: (state, action) => {
      if (Array.isArray(action.payload) && action.payload.length === 2) {
        const [key, value] = action.payload;
        state[key] = value;
        localStorage.setItem("unite_setting", JSON.stringify(state));
      }
    },
    setPreSetting: (state, action) => {
      Object.assign(state, action.payload);
      localStorage.setItem("unite_setting", JSON.stringify(state));
    },
  },
});
export const { setSetting, setPreSetting } = SettingSlice.actions;
export default SettingSlice.reducer;
