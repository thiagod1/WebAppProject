// Code from https://authjs.dev/guides/pages/signin

import NextAuth from "next-auth"
import GitHub from "next-auth/providers/github"
import Google from "next-auth/providers/google"
import Credentials from "next-auth/providers/credentials"
import type { Provider } from "next-auth/providers"
import { signInSchema } from "./app/lib/validation"

import { prisma } from "./app/lib/prisma"
import { verifyPassword } from "./app/lib/auth"

const providers: Provider[] = [
  Google,
  GitHub,
  Credentials({
    name: "Credentials",
    credentials: {
      email: { label: "Email", type: "email" },
      password: { label: "Password", type: "password" },
    },
    async authorize(credentials) {
      const parsed = signInSchema.safeParse(credentials)
      if (!parsed.success) return null

      const { email, password } = parsed.data

      const user = await prisma.user.findUnique({
        where: { email: email },
      })
      if (!user || !user.password) return null;
      const isValid = await verifyPassword(
        password,
        user.password
      )
      if (!isValid) return null;
      return { id: user.id.toString(), email: user.email, name: user.name }
    }
  }),
]


export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  session: { strategy: "jwt" },
  callbacks: {
    async session({session, token}){
      if (token.sub) session.user.id = token.sub
        return session
    },
  },
  pages: {
    signIn: "/login",
  },
})
