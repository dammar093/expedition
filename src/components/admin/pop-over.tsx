"use client";
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import Link from "next/link";
import { LogOut, User } from "lucide-react";
import { Button } from "../ui/button";

const PopOver = () => {
  return (
    <Popover>
      <PopoverTrigger asChild>
        <Avatar className="cursor-pointer">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </PopoverTrigger>

      <PopoverContent align="end" className="w-48 p-2">
        <div className="flex flex-col gap-1">
          <Link
            href="/dashboard/profile"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm hover:bg-muted"
          >
            <User size={16} />
            Profile
          </Link>

          <Button
            // onClick={handleLogout}
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-red-600 hover:bg-muted"
          >
            <LogOut size={16} />
            Logout
          </Button>
        </div>
      </PopoverContent>
    </Popover>
  );
};

export default PopOver;
