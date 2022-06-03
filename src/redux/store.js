import { configureStore } from "@reduxjs/toolkit";
import isAuthReducer from "../redux/slices/auth/isAuthSlice";
import userInfoReducer from "../redux/slices/auth/userInfoSlice";
import productCategoriesReducer from "../redux/slices/productCategoriesSlice";

export default configureStore({
  reducer: {
    isAuth: isAuthReducer,
    productCategories: productCategoriesReducer,
    userInfo: userInfoReducer,
  },
});
