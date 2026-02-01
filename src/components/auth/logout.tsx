"use client";

import axios from "axios";
import { Button } from "../ui/button";
import useAuth from "@/app/(auth)/_hooks/useAuth";
import { Loader } from "../shared/loader";
import { toast } from "sonner";

export function Logout() {
  const { isLoading, error, logoutUser } = useAuth();
  if (error) toast.error(error);
  return (
    <Button
      disabled={isLoading}
      className="cursor-pointer"
      onClick={logoutUser}
    >
      Logout {isLoading && <Loader />}
    </Button>
  );
}
