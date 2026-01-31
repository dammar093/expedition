"use client";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Image from "next/image";
import React from "react";
import { Header } from "./header";
import { Social } from "./social";
import { DividerWithText } from "@/components/shared/divider-with-text";
import { BackButton } from "./back-button";

interface ICardWrapperProps {
  children: React.ReactNode;
  headerLabel: string;
  backButtonLable?: string;
  backButtonHref?: string;
  backButtonDescription?: string;
  showSocial?: boolean;
}
export const CardWrapper = ({
  children,
  headerLabel,
  backButtonLable,
  backButtonHref,
  backButtonDescription,
  showSocial,
}: ICardWrapperProps) => {
  return (
    <Card className="w-110 shadow-md mx-auto space-y-1">
      <CardHeader>
        <div className="w-12 h-12 mx-auto">
          <Image
            src={"/images/logo/logo.png"}
            alt="logo"
            loading="lazy"
            width={400}
            height={400}
            className="w-full h-full object-cover"
          />
        </div>
        <CardTitle>
          <Header title={headerLabel} />
        </CardTitle>
      </CardHeader>

      <CardContent>{children}</CardContent>
      {showSocial && (
        <div className="px-4">
          <DividerWithText text="OR" />
        </div>
      )}
      {showSocial && (
        <CardFooter>
          <Social />
        </CardFooter>
      )}
      {backButtonHref && (
        <CardFooter>
          <BackButton
            backButtonDescription={backButtonDescription}
            backuttonLabel={backButtonLable}
            backButtonHref={backButtonHref}
          />
        </CardFooter>
      )}
    </Card>
  );
};
