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
    async signIn({account, profile}){
      if(account?.provider === "credentials") return true
      if(!account || !profile?.email) return false
      if (account.provider === "google" && !profile.email_verified) return false

      const providerId = account.providerAccountId
      const existing = account.provider === "github"
        ? await prisma.user.findUnique({where: { githubId: providerId} })
        : await prisma.user.findUnique({where: { googleId: providerId }})
      if(existing) return true 

      const emailTaken = await prisma.user.findUnique({ where: { email: profile.email}})

      if(emailTaken) return "/login?error=EmailInUse"

        await prisma.user.create({
          data: {
            email: profile.email,
            name: profile.name ?? null,
            ...(account.provider === "github" ? {githubId: providerId } : { googleId: providerId }) 
          }
        })
        return true
    },
    async jwt({token, account}){ 
      if(account && account.provider !== "credentials") {
        const dbUser = account.provider === "github" 
          ? await prisma.user.findUnique({
            where: { githubId: account?.providerAccountId}
        })
        :  await prisma.user.findUnique({
            where: { googleId : account?.providerAccountId}
        })
        if(!dbUser) throw new Error("OAuth user not ofund")

        token.sub = dbUser.id.toString()
      }
      return token
    }

  },
  pages: {
    signIn: "/login",
  },
})
