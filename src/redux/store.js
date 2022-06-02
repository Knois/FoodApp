import { configureStore } from "@reduxjs/toolkit";
import isAuthReducer from "../redux/slices/auth/isAuthSlice";
import productCategoriesReducer from "../redux/slices/productCategoriesSlice";

export default configureStore({
  reducer: {
    isAuth: isAuthReducer,
    productCategories: productCategoriesReducer,
  },
});
