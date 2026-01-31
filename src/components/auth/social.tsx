import { Loader } from "@/components/shared/loader";
import { FcGoogle } from "react-icons/fc";
import { Button } from "@/components/ui/button";

export const Social = () => {
  return (
    <div className="w-full">
      <Button
        className="w-full  cursor-pointer"
        variant={"outline"}
        size={"lg"}
        onClick={() => {}}
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
