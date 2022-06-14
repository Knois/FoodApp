import { configureStore } from "@reduxjs/toolkit";
import isAuthReducer from "../redux/slices/auth/isAuthSlice";
import tokenReducer from "../redux/slices/auth/tokenSlice";
import needRefreshReducer from "../redux/slices/needRefreshSlice";
import userInfoReducer from "../redux/slices/auth/userInfoSlice";
import userInfoPropertiesReducer from "../redux/slices/auth/userInfoProperties";
import productCategoriesReducer from "../redux/slices/productCategoriesSlice";

export default configureStore({
  reducer: {
    isAuth: isAuthReducer,
    token: tokenReducer,
    productCategories: productCategoriesReducer,
    userInfo: userInfoReducer,
    userInfoProperties: userInfoPropertiesReducer,
    needRefresh: needRefreshReducer,
  },
});
