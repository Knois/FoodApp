import { createSlice } from "@reduxjs/toolkit";

export const needRefreshSlice = createSlice({
  name: "needRefresh",
  initialState: {
    value: false,
  },
  reducers: {
    setNeedRefreshTrue: (state) => {
      state.value = true;
    },
    setNeedRefreshFalse: (state) => {
      state.value = false;
    },
  },
});

export const { setNeedRefreshTrue, setNeedRefreshFalse } =
  needRefreshSlice.actions;

export default needRefreshSlice.reducer;
