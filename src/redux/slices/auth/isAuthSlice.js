import { createSlice } from "@reduxjs/toolkit";

export const isAuthSlice = createSlice({
  name: "isAuth",
  initialState: {
    value: false,
  },
  reducers: {
    setIsAuthTrue: (state) => {
      state.value = true;
    },
    setIsAuthFalse: (state) => {
      state.value = false;
    },
  },
});

export const { setIsAuthTrue, setIsAuthFalse } = isAuthSlice.actions;

export default isAuthSlice.reducer;
