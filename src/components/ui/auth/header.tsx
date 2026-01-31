import React from "react";
import { Poppins } from "next/font/google";
import { cn } from "@/lib/utils";

const font = Poppins({
  subsets: ["latin"],
  weight: "600",
});

interface IHeaderProps {
  title: string;
}
export const Header = ({ title }: IHeaderProps) => {
  return <h1 className={cn("w-full text-center", font.className)}>{title}</h1>;
};
