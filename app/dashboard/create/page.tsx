import { NewsletterForm } from "@/app/components/NewsletterForm"

export default function CreatePage() {
  return (
    <>
      <h2 className="font-bold text-center text-amber-900 tracking-tight mt-2 text-3xl">
        Newsletter Create Page
      </h2>
      <div className="flex min-h-screen items-center justify-center p-4">
        <div className="w-full max-w-lg rounded-box bg-base-100 p-6 shadow-xl">
          <NewsletterForm />
        </div>
      </div>

    </>

  )
}
