import { getMyNewsletterById } from "../../../actions/NewsletterAction"
import { notFound } from "next/navigation"
import { NewsletterForm } from "@/app/components/NewsletterForm"

export default async function EditPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const idNumber = Number(id)
  // Check if is a number so prisma doesn't crash
  if (Number.isNaN(idNumber)) notFound()
  const newsletterById = await getMyNewsletterById(idNumber)

  // Check if newsletterById is not null
  if (!newsletterById) notFound()

  return (
    <>
      <h2 className="font-bold text-center text-amber-900 tracking-tight mt-2 text-3xl">
        Newsletter Edit Page
      </h2>
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-lg rounded-box bg-base-1s0 p-6 shadow-xl">
          <NewsletterForm id={newsletterById.id} newsletter={newsletterById} />
        </div>
      </div>
    </>
  )
}

