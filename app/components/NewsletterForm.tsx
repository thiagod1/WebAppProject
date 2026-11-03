"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import Link from "next/link"
import * as z from "zod"
import { newsletterSchema } from "../lib/validation"
import { addNewsletter, editNewsletter } from "../actions/NewsletterAction"

type FieldErrors = { title?: string[]; content?: string[]; image?: string[]; status?: string[] }
type Props = {
  id?: number
  newsletter?: { title: string; content: string; image: string; status: string }
}

export function NewsletterForm({ id, newsletter }: Props) {
  const [title, setTitle] = useState(newsletter?.title ?? "")
  const [content, setContent] = useState(newsletter?.content ?? "")
  const [image, setImage] = useState(newsletter?.image ?? "")
  const [status, setStatus] = useState(newsletter?.status ?? "DRAFT")
  const [fieldErrors, setFieldErrors] = useState<FieldErrors>({})
  const [error, setError] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const router = useRouter()

  const handleSubmit = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault()
    setError("")
    setFieldErrors({})

    const parsed = newsletterSchema.safeParse({ title, content, image, status })
    if (!parsed.success) {
      setFieldErrors(z.flattenError(parsed.error).fieldErrors)   // instant, no server trip
      return
    }

    setIsSubmitting(true)
    const result = id ? await editNewsletter(id, parsed.data) : await addNewsletter(parsed.data)
    setIsSubmitting(false)

    if (!result.success) {
      if (result.fieldErrors) setFieldErrors(result.fieldErrors)
      setError(result.error ?? "Something went wrong")
      return
    }
    router.push("/dashboard")
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="flex flex-col gap-5">
      {error && <div className="alert alert-error">{error}</div>}

      <fieldset className="fieldset">
        <legend className="fieldset-legend font-semibold">Newsletter Title</legend>
        <input
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input input-bordered w-full"
          name="title"
          placeholder="Title" />
        {fieldErrors.title && <p className="text-error text-sm">{fieldErrors.title[0]}</p>}
      </fieldset>

      <fieldset className="fieldset">
        <legend className="fieldset-legend font-semibold">Newsletter Content</legend>
        <textarea
          value={content}
          onChange={(e) => setContent(e.target.value)}
          name="content"
          placeholder="Write your main email update text here..."
          className="textarea textarea-bordered h-48 w-full" />
        {fieldErrors.content && <p className="text-error text-sm">{fieldErrors.content[0]}</p>}
      </fieldset>


      <fieldset className="fieldset">
        <legend className="fieldset-legend font-semibold">Header Image URL</legend>
        <input
          value={image}
          onChange={(e) => setImage(e.target.value)}
          name="image"
          placeholder="https://example.com"
          className="input input-bordered w-full" />
        {fieldErrors.image && <p className="text-error text-sm">{fieldErrors.image[0]}</p>}
      </fieldset>

      <select value={status} onChange={(e) => setStatus(e.target.value)} className="select">
        <option value="DRAFT">Draft</option>
        <option value="SCHEDULE">Schedule</option>
        <option value="SENT">Sent</option>
      </select>

      <div className="flex justify-end gap-3">
        <Link href="/dashboard" className="btn btn-ghost">Cancel</Link>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
          {isSubmitting ? <span className="loading loading-spinner loading-sm" /> : id ? "Save changes" : "Create Newsletter"}
        </button>
      </div>
    </form>
  )
}
