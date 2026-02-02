import { DefaultSession } from "next-auth";
import { JWT } from "@auth/core/jwt";
import { UserRole } from "@/generated/prisma/client";
export type ExtendedUser = DefaultSession["user"] & {
  role: "ADMIN" | "USER"
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser
  }
}

declare module "@auth/core" {
  interface JWT {
    role?: UserRole
  }
}