import React from "react";
import { FiCheckCircle } from "react-icons/fi";

interface ISuccessMessage {
  message?: string;
}
export default function SuccessMessage({ message }: ISuccessMessage) {
  if (!message) return null;
  return (
    <div className="bg-green-700/15 text-green-700 p-3 flex gap-1 items-center">
      <FiCheckCircle />
      {message}
    </div>
  );
}
