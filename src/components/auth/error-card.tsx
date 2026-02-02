import { TriangleAlert } from "lucide-react";
import Link from "next/link";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { Header } from "./header";

export default function () {
  return (
    <Card className="w-110 shadow-md">
      <CardHeader>
        <CardTitle className="text-center">
          <Header title="Opps Something Went Wrong!" />
        </CardTitle>
        <CardContent className="flex justify-center">
          <TriangleAlert className="w-8 h-8" />
        </CardContent>
        <CardFooter className="d-flex justify-center">
          <Link href={"/login"} className="hover:text-blue-700">
            Back to Login
          </Link>
        </CardFooter>
      </CardHeader>
    </Card>
  );
}
