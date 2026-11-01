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
  })
]

export const providerMap = providers
  .map((provider) => {
    if (typeof provider === "function") {
      const providerData = provider()
      return { id: providerData.id, name: providerData.name }
    } else {
      return { id: provider.id, name: provider.name }
    }
  })
  .filter((provider) => provider.id !== "credentials")

export const { handlers, auth, signIn, signOut } = NextAuth({
  providers,
  session: { strategy: "jwt" },
  callbacks: {
    authorized: async ({ auth, request }) => {
      if (request.nextUrl.pathname.startsWith("/")) return !!auth
      return true
    }
  },
  pages: {
    signIn: "/login",
  },
})
