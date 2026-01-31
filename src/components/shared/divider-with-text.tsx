"use client";

import { cn } from "@/lib/utils";

interface DividerWithTextProps {
  text: string;
  className?: string;
  lineColor?: string; // Tailwind border color
  textColor?: string; // Tailwind text color
}

export function DividerWithText({
  text,
  className,
  lineColor = "bg-gray-300",
  textColor = "text-gray-500",
}: DividerWithTextProps) {
  return (
    <div className={cn(`flex items-center gap-3`, className)}>
      <div className={cn(`flex-1 h-px`, lineColor)} />
      <span className={`text-sm font-medium ${textColor}`}>{text}</span>
      <div className={`flex-1 h-px ${lineColor}`} />
    </div>
  );
}
