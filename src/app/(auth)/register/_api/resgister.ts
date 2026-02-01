import { IRegisterUserPayload } from "../_types/register";
import axios from "axios";

export async function registerUser(values: IRegisterUserPayload) {
  try {
    return await axios.post("/api/v1/auth/register", values)
  } catch (error: any) {
    return error.message
  }
}