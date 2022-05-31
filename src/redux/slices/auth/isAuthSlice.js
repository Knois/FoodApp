import { createSlice } from "@reduxjs/toolkit";

export const isAuthSlice = createSlice({
  name: "isAuth",
  initialState: {
    value: false,
  },
  reducers: {
    setIsAuthTrue: (state) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the Immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.value = true;
    },
    setIsAuthFalse: (state) => {
      state.value = false;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setIsAuthTrue, setIsAuthFalse } = isAuthSlice.actions;

export default isAuthSlice.reducer;
