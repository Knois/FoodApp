import { createSlice } from "@reduxjs/toolkit";

export const productCategoriesSlice = createSlice({
  name: "productCategories",
  initialState: {
    arr: [
      {
        id: "other",
        name: "Остальное",
      },
    ],
  },
  reducers: {
    setProductCategories: (state, action) => {
      state.arr = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setProductCategories } = productCategoriesSlice.actions;

export default productCategoriesSlice.reducer;
