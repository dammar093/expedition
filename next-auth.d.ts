import { DefaultSession } from "next-auth";
import { JWT } from "@auth/core/jwt";
import { UserRole } from "@/generated/prisma/client";
export type ExtendedUser = DefaultSession["user"] & {
  role: "ADMIN" | "USER",
  token: JWT
}

declare module "next-auth" {
  interface Session {
    user: ExtendedUser,
    token: JWT
  }
}

declare module "@auth/core" {
  interface JWT {
    role?: UserRole;
  }
}