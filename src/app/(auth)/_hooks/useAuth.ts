"use client";
import { useAppDispatch, useAppSelector } from '@/redux-store/hooks/redux'
import React, { useCallback } from 'react'
import { loginUserThunk, logoutUserThunk, registerUserThunk } from '../_redux/authSlice'
import { ILoginUserPayload } from '../login/_types/login'
import { IRegisterUserPayload } from '../register/_types/register';

export default function useAuth() {
  const { error, isLoading } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const loginUser = useCallback((data: ILoginUserPayload) => {
    dispatch(loginUserThunk(data))
  }, [dispatch])
  const registerUser = useCallback((data: IRegisterUserPayload) => {
    dispatch(registerUserThunk(data))
  }, [dispatch])
  const logoutUser = useCallback(() => {
    dispatch(logoutUserThunk())
  }, [dispatch])
  return { error, isLoading, loginUser, registerUser, logoutUser }
}
