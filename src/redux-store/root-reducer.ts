import { configureStore } from '@reduxjs/toolkit'
import { combineReducers } from 'redux';
import authReducer from "@/app/(auth)/_redux/authSlice"

export const rootReducer = combineReducers({
  auth: authReducer
})

