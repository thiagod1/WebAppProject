import { NextResponse, NextRequest } from "next/server"
import { prisma } from "../../../lib/prisma"
import { hashPassword} from "../../../lib/auth"
import { registrationSchema } from "../../../lib/validation"
import z from "zod"


export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const result = registrationSchema.safeParse(body)

    if (!result.success) {
      return NextResponse.json(
        { error: "Validation Failed",fieldErrors: z.flattenError(result.error).fieldErrors },
        { status: 400 }
      )
    }

    const { email, name, password } = result.data

    const existingUser = await prisma.user.findUnique({
      where: { email }
    })

    if (existingUser) {
      return NextResponse.json(
        { error: "User already registered" },
        { status: 409 }
      )
    }

    const hashedPassword = await hashPassword(password)
    const user = await prisma.user.create({
      data: {
        email,
        password: hashedPassword,
        name
      }
    })
    return NextResponse.json(
      {
        message: "User created",
        user: { id: user.id, email: user.email, name: user.name },
      },
      { status: 201 }
    )

  } catch (error) {
    console.error("Registration Error:", error)
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 }
    )
  }
}
