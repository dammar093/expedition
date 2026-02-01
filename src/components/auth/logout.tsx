"use client";

import axios from "axios";
import { Button } from "../ui/button";

export function Logout() {
  return (
    <Button
      className="cursor-pointer"
      onClick={async () => {
        await axios.post("/api/v1/auth/logout");
      }}
    >
      Logout
    </Button>
  );
}
