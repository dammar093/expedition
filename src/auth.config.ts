
import Google from "next-auth/providers/google"
import type { NextAuthConfig } from "next-auth"
import Credentials from "next-auth/providers/credentials"
import { loginSchema } from "./schema/auth"
import { prisma } from "@/lib/prisma"
import bcrypt from "bcryptjs"

export default {
  providers: [
    Credentials({
      async authorize(credentials) {
        const validInputFields = loginSchema.safeParse(credentials);
        if (validInputFields.success) {
          const { email, password } = validInputFields.data
          const user = await prisma.user.findUnique({
            where: {
              email
            }
          })
          if (!user || !user.password) return null;
          const passwordMatch = await bcrypt.compare(password, user.password);
          if (passwordMatch) return user;
        }
        return null;
      }
    })
  ]
} satisfies NextAuthConfig