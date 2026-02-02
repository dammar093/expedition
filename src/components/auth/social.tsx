"use client";
import { Loader } from "@/components/shared/loader";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";
import { signIn } from "next-auth/react";

export const Social = () => {
  const onClick = (provider: "google") => {
    signIn(provider, {
      callbackUrl: "/",
    });
  };
  return (
    <div className="w-full">
      <Button
        className="w-full  cursor-pointer"
        variant={"outline"}
        size={"lg"}
        onClick={() => onClick("google")}
      >
        <>
          <FcGoogle className="w-5 h-5" />
          <span>Login With Google</span>
        </>
        <Loader />
      </Button>
    </div>
  );
};
