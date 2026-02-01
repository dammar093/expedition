import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { ILoginUserPayload } from "../login/_types/login"
import axios from "axios"
import { IRegisterUserPayload } from "../register/_types/register";


// initial state type
interface IAuthState {
  error: string | null;
  isLoading: boolean;
}

// initial state of auth
const initialState: IAuthState = {
  error: null,
  isLoading: false
}

//async thunk for login user
export const loginUserThunk = createAsyncThunk<
  void,              // ✅ success return type
  ILoginUserPayload,          // ✅ payload type
  { rejectValue: string }     // ✅ error type
>(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      await axios.post("/api/v1/auth/login", payload)
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || "Invalid credentials")
    }
  }
)

//async thunk for register user
export const registerUserThunk = createAsyncThunk<
  void,              // ✅ success return type
  IRegisterUserPayload,          // ✅ payload type
  { rejectValue: string }     // ✅ error type
>(
  "auth/register",
  async (payload, { rejectWithValue }) => {
    try {
      await axios.post("/api/v1/auth/register", payload)
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || "Something went wrong")
    }
  }
)
//async thunk for logout user
export const logoutUserThunk = createAsyncThunk<
  void,              // ✅ success return type
  void,          // ✅ payload type
  { rejectValue: string }     // ✅ error type
>(
  "auth/logout",
  async (_, { rejectWithValue }) => {
    try {
      await axios.post("/api/v1/auth/logout")
    } catch (error: any) {
      return rejectWithValue(error.response.data.message || "Faield to logout")
    }
  }
)
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {},
  extraReducers: ((builder) => {
    // login user builder
    builder.addCase(loginUserThunk.pending, (state: IAuthState) => {
      state.error = null;
      state.isLoading = true;
    })
      .addCase(loginUserThunk.fulfilled, (state: IAuthState) => {
        state.error = null;
        state.isLoading = false;
      })
      .addCase(loginUserThunk.rejected, (state: IAuthState, action) => {
        state.error = action.payload ?? "Invalid credentials";
        state.isLoading = false;
      })
    // user register builder
    builder.addCase(registerUserThunk.pending, (state: IAuthState) => {
      state.error = null;
      state.isLoading = true;
    })
      .addCase(registerUserThunk.fulfilled, (state: IAuthState) => {
        state.error = null;
        state.isLoading = false;
      })
      .addCase(registerUserThunk.rejected, (state: IAuthState, action) => {
        state.error = action.payload ?? "Something went wrong";
        state.isLoading = false;
      })
    // user logout builder
    builder.addCase(logoutUserThunk.pending, (state: IAuthState) => {
      state.error = null;
      state.isLoading = true;
    })
      .addCase(logoutUserThunk.fulfilled, (state: IAuthState) => {
        state.error = null;
        state.isLoading = false;
      })
      .addCase(logoutUserThunk.rejected, (state: IAuthState, action) => {
        state.error = action.payload ?? "Something went wrong";
        state.isLoading = false;
      })
  })
})

export default authSlice.reducer