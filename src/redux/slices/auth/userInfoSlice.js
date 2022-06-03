import { createSlice } from "@reduxjs/toolkit";

export const userInfoSlice = createSlice({
  name: "userInfo",
  initialState: {
    value: {
      email: "",
      id: "",
      roles: ["ROLE_USER"],
      user_properties: {
        birthday: "",
        gender: "",
        height: "",
        name: "",
        weight: "",
        dayLimitCal: "",
        targetWeight: "",
        targetWeightType: "",
        physicalActivityLevel: "",
      },
    },
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.value = action.payload;
    },
  },
});

export const { setUserInfo } = userInfoSlice.actions;

export default userInfoSlice.reducer;
