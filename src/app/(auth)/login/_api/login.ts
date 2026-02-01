import { ILoginUserPayload } from "../_types/login";
import axios from "axios";

export async function loginUser(values: ILoginUserPayload) {
  try {
    return await axios.post("/api/v1/auth/login", values)
  } catch (error: any) {

    return error.message
  }
}