"use client";
import { useAppDispatch, useAppSelector } from '@/redux-store/hooks/redux'
import React, { useCallback } from 'react'
import { loginUserThunk, logoutUserThunk, registerUserThunk } from '../_redux/authSlice'
import { ILoginUserPayload } from '../login/_types/login'
import { IRegisterUserPayload } from '../register/_types/register';
import { useRouter } from 'next/navigation';

export default function useAuth() {
  const router = useRouter();
  const { error, isLoading } = useAppSelector((state) => state.auth)
  const dispatch = useAppDispatch()
  const loginUser = useCallback((data: ILoginUserPayload) => {
    dispatch(loginUserThunk(data)).unwrap().then(() => {
      router.refresh()
    })
  }, [dispatch])
  const registerUser = useCallback((data: IRegisterUserPayload) => {
    dispatch(registerUserThunk(data)).unwrap().then(() => {
      router.push("/login")
    })
  }, [dispatch])
  const logoutUser = useCallback(() => {
    dispatch(logoutUserThunk()).unwrap().then(() => {
      router.refresh()
    })
  }, [dispatch])
  return { error, isLoading, loginUser, registerUser, logoutUser }
}
