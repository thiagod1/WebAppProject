"use server"

import { prisma } from "../lib/prisma"
import { revalidatePath } from "next/cache"
import { auth } from "../../auth"
import { redirect } from "next/navigation"
import { newsletterStatus } from "../generated/prisma/client"




export async function addNewsletter(data: {
  title: string
  content: string
  image: string
  status: newsletterStatus
}) {
  try {
    // Check if session is valid and user is logged in before creating news letter
    const session = await auth()
    if (!session?.user?.id) return { success: false, error: "User not logged in" }

    const newNewsletter = await prisma.newsletter.create({
      data: {
        title: data.title,
        content: data.content,
        image: data.image,
        authorId: Number(session?.user?.id),
        status: data.status
      }
    })

    revalidatePath("/dashboard")
    revalidatePath("/newsletters")
    return { success: true, newsletter: newNewsletter }
  } catch (err) {
    console.error("Failed to create newsletter:", err)
    return { success: false, error: "failed to create newsletter" }
  }
}

export async function deleteNewsletter(id: number) {
  const session = await auth()
  if (!session?.user?.id) return { success: false, error: "User not logged in" }

  try {
    const newsletter = await prisma.newsletter.findFirst({ where: { id, authorId: Number(session.user.id) } })
    if (!newsletter) return { success: false, error: "Newsletter not found" }

    const deletedNewsletter = await prisma.newsletter.delete({ where: { id, authorId: Number(session.user.id) } })

    revalidatePath("/newsletters")
    revalidatePath("/dashboard")
    return { success: true, deletedNewsletter }
  } catch (err) {
    console.error("Failed to delete newsletter:", err)
    return { success: false, error: "Failed to delete newsletter" }
  }
}

export async function getAllNewsletter() {
  return await prisma.newsletter.findMany({
    where: { status: "SENT" },
    orderBy: { id: "desc" },
    include: { author: { select: { name: true } } }
  })
}


export async function editNewsletter(
  id: number,
  data: { title: string, content: string, image: string, status: newsletterStatus }) {

  const session = await auth()
  if (!session?.user?.id) return { success: false, error: "User not logged in" }

  try {

    const newsletter = await prisma.newsletter.findFirst({ where: { id, authorId: Number(session.user.id) } })
    if (!newsletter) return { success: false, error: "Newsletter not found" }

    const editedNewsletter = await prisma.newsletter.update({
      where: { id, authorId: Number(session.user.id) },
      data: {
        title: data.title,
        content: data.content,
        image: data.image,
        status: data.status
      }
    })

    revalidatePath("/dashboard")
    revalidatePath("/newsletters")
    return { success: true, editedNewsletter }
  } catch (err) {
    console.error("Failed to edit newsletter", err)
    return { success: false, error: "Failed to edit newsletter" }
  }
}


export async function getMyNewsletter() {
  const session = await auth()
  if (!session?.user?.id) return redirect("/login")

  return prisma.newsletter.findMany({
    where: { authorId: Number(session.user.id) },
    orderBy: { updatedAt: "desc" }
  })
}
export async function getMyNewsletterById(id: number) {
  const session = await auth()
  if (!session?.user?.id) return redirect("/login")
  return await prisma.newsletter.findFirst({
    where: { id, authorId: Number(session.user.id) }
  })
}

