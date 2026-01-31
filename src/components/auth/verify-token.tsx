import React from "react";
import { Card, CardContent, CardHeader } from "../ui/card";
import { Header } from "./header";
import ErroMessage from "./error-message";
import SuccessMessage from "./sucess-message";
import { Button } from "@/components/ui/button";
import { Loader } from "../shared/loader";

export default function () {
  return (
    <Card className="w-110 shadow-md">
      <CardHeader>
        <Header title="Verify Token!" />
      </CardHeader>
      <CardContent>
        <Button className="w-full" variant={"outline"}>
          <Loader />
        </Button>
        <ErroMessage message="Something went wrong" />
        <SuccessMessage message="Something went wrong" />
      </CardContent>
    </Card>
  );
}
