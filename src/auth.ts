import authConfig from "@/auth.config";
import { prisma } from "@/lib/prisma";
import { PrismaAdapter } from "@auth/prisma-adapter";
import NextAuth from "next-auth";
import { UserRole } from "@/generated/prisma/client";



export const {
  handlers,
  signIn,
  signOut,
  auth,
} = NextAuth({
  pages: {
    signIn: "/login",
    error: "/error"
  },
  events: {
    async linkAccount({ user }) {
      await prisma.user.update({
        where: {
          id: user.id
        },
        data: {
          emailVerified: new Date()
        }
      })
    }
  },
  callbacks: {
    // async signIn({ user }) {
    //   const exisitngUser = await prisma.user.findUnique({
    //     where: {
    //       id: user.id
    //     }
    //   })
    //   if (!exisitngUser || !exisitngUser.emailVerified) {
    //     return false;
    //   }
    //   return true
    // },

    async session({ session, token }) {
      if (token.sub && session.user) {
        session.user.id = token.sub
      }
      if (token.role && session.user) {
        session.user.role = token.role as UserRole
      }
      return session
    },
    async jwt({ token }) {
      if (!token.sub) return token;
      const user = await prisma.user.findUnique({
        where: {
          id: token.sub
        }
      })
      if (!user) return token
      token.role = user.role
      return token
    }
  },
  adapter: PrismaAdapter(prisma),
  session: { strategy: "jwt" },
  ...authConfig
})
