import React from "react";
import { FiAlertTriangle } from "react-icons/fi";

interface IErrorMessage {
  message?: string;
}
export default function ErroMessage({ message }: IErrorMessage) {
  if (!message) return null;
  return (
    <div className="bg-amber-700/15 text-amber-700 p-3 flex gap-1 items-center">
      <FiAlertTriangle />
      {message}
    </div>
  );
}
