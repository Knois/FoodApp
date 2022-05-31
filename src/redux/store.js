import { configureStore } from '@reduxjs/toolkit'
import isAuthReducer from '../redux/slices/auth/isAuthSlice'

export default configureStore({
  reducer: {
    isAuth: isAuthReducer
  }
})