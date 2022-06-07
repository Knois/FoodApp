import { createSlice } from "@reduxjs/toolkit";

export const userInfoPropertiesSlice = createSlice({
  name: "userInfoProperties",
  initialState: {
    value: {
      birthday: "",
      gender: "",
      height: "",
      weight: "",
      dayLimitCal: "",
      targetWeight: "",
      targetWeightType: "",
      physicalActivityLevel: "",
    },
  },
  reducers: {
    setUserInfoProperties: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUserInfoProperties } = userInfoPropertiesSlice.actions;

export default userInfoPropertiesSlice.reducer;
