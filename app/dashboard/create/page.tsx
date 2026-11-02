import { newsletterStatus } from "@/app/generated/prisma/enums"
import { addNewsletter } from "../../actions/NewsletterAction"
import { redirect } from "next/navigation"

export default function CreatePage() {
  return (
    <>
      <div>
        <h1>Create Newsletter Page</h1>
      </div>


      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-lg rounded-box bg-base-100 p-6 shadow-xl">
          <form className="flex flex-col gap-5" action={async (formData: FormData) => {
            "use server"
            const result = await addNewsletter({
              title: formData.get("title") as string,
              content: formData.get("content") as string,
              image: formData.get("image") as string,
              status: formData.get("status") as newsletterStatus
            })
            if(result.success) redirect("/dashboard")
          }}>
            {/* Newsletter Title */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend font-semibold">Newsletter Title</legend>
              <input
                name="title"
                placeholder="Title"
                className="input input-bordered w-full"
                required
              />
            </fieldset>

            {/* Image URL */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend font-semibold">Header Image URL</legend>
              <input
                name="image"
                placeholder="https://example.com"
                className="input input-bordered w-full"
              />
            </fieldset>

            {/* Content */}
            <fieldset className="fieldset">
              <legend className="fieldset-legend font-semibold">Newsletter Content</legend>
              <textarea
                name="content"
                placeholder="Write your main email update text here..."
                className="textarea textarea-bordered h-48 w-full"
                required
              ></textarea>
            </fieldset>

            {/* Form Actions */}
            <div className="flex justify-end gap-3 mt-2">
              <select name="status" defaultValue="DRAFT" className="select">
                <option value="DRAFT">Draft</option>
                <option value="SCHEDULE">Schedule</option>
                <option value="SENT">Sent</option>
              </select>
              <button type="submit" className="btn btn-primary">Publish Newsletter</button>
            </div>
          </form>
        </div>
      </div>

    </>

  )
}
