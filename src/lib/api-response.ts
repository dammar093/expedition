import { NextResponse } from "next/server";

interface ISuccessProps {
  data?: any;
  message?: string;
  status?: number;
}
interface IErrorProps {
  message?: string;
  status?: number;
}

export const success = ({ data, message = "Success", status = 200 }: ISuccessProps) =>
  NextResponse.json({ message, data }, { status });

export const error = ({ message, status = 500 }: IErrorProps) =>
  NextResponse.json({ status: message, message }, { status });
