import { editNewsletter, getMyNewsletterById } from "../../../actions/NewsletterAction"
import { notFound } from "next/navigation"
import { newsletterStatus } from "@/app/generated/prisma/enums"
import { redirect } from "next/navigation"
import Link from 'next/link'

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
      <div className="p-4 max-w-md mx-auto flex flex-col gap-4 mt-4 card bg-lime-800">
        <form className="flex flex-col gap-5" action={async (formData: FormData) => {
          "use server"
          const result = await editNewsletter(idNumber, {
            title: formData.get("title") as string,
            content: formData.get("content") as string,
            image: formData.get("image") as string,
            status: formData.get("status") as newsletterStatus,
          })
          if (result.success) redirect("/dashboard")
        }}>
          {/* Newsletter Title */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-semibold">Newsletter Title</legend>
            <input
              name="title"
              defaultValue={newsletterById.title}
              className="input input-bordered w-full"
              required
            />
          </fieldset>
          {/* Image URL */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-semibold">Header Image URL</legend>
            <input
              name="image"
              defaultValue={newsletterById.image}
              className="input input-bordered w-full"
            />
          </fieldset>

          {/* Content */}
          <fieldset className="fieldset">
            <legend className="fieldset-legend font-semibold">Newsletter Content</legend>
            <textarea
              name="content"
              defaultValue={newsletterById.content}
              className="textarea textarea-bordered h-48 w-full"
              required
            ></textarea>
          </fieldset>
          {/* Form Actions */}
          <div className="flex justify-end gap-3 mt-2">
            <select name="status" defaultValue={newsletterById.status} className="select">
              <option value="DRAFT">Draft</option>
              <option value="SCHEDULE">Schedule</option>
              <option value="SENT">Sent</option>
            </select>
            <button type="submit" className="btn btn-primary">Save Changes</button>
            <Link href="/dashboard" className="btn btn-ghost">Cancel</Link>
          </div>
        </form>
      </div>
    </>
  )
}

