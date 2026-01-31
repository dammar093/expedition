import React from "react";
import { Button } from "@/components/ui/button";
import Link from "next/link";

interface IBackButtonProps {
  backButtonDescription?: string;
  backuttonLabel?: string;
  backButtonHref?: string;
}
export const BackButton = ({
  backButtonDescription,
  backButtonHref,
  backuttonLabel,
}: IBackButtonProps) => {
  return (
    <>
      <p className="text-center w-full">
        {backButtonDescription}{" "}
        <Link
          href={`${backButtonHref}`}
          className="capitalize hover:text-blue-600"
        >
          {backuttonLabel}
        </Link>
      </p>
    </>
  );
};
