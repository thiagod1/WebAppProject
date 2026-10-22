import bcrypt from "bcryptjs"
import { cookies } from "next/headers"
import { NextResponse } from "next/server"

const SALT_ROUNDS = 10

const TOKEN_EXPIRY_HOURS = parseInt(
  process.env.AUTH_TOKEN_EXPIRY_HOURS || "24"
)

const AUTH_COOKIE_NAME = "auth_token"

export interface TokenPayload {
  userId: number
  email: string
  name: string
  exp: number
}

export async function hashPassword(password: string): Promise<string>{
  return bcrypt.hash(password, SALT_ROUNDS)
}
