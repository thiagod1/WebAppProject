import { getSentNewsletterById } from '@/app/actions/NewsletterAction'
import { notFound } from "next/navigation"
import Link from 'next/link'
import Image from "next/image"
import { auth } from '@/auth'



export default async function ViewNewsletter({ params }: { params: Promise<{ id: string }> }) {

  const { id } = await params
  const idNumber = Number(id)
  const session = await auth()

  // Check if is a number so prisma doesn't crash
  if (Number.isNaN(idNumber)) notFound()
  const newsletterById = await getSentNewsletterById(idNumber)

  // Check if newsletterById is not null
  if (!newsletterById) notFound()

  const isOwner = Number(session?.user?.id) === newsletterById.authorId

  return (
    <>
      <h2 className="font-bold text-center text-amber-900 tracking-tight mt-2 text-3xl">
        Newsletter
      </h2>
      <div className="p-4 max-w-3xl mx-auto flex flex-col gap-4 mt-4 card bg-lime-800">
        <div className="card-body">
          {newsletterById.image && (
            <figure>
              <Image
                src={newsletterById.image}
                alt={newsletterById.title}
                width={768}
                height={432}
                className="w-full h-auto rounded-box"
              />
            </figure>
          )}
          <h2 className="card-title">
            {newsletterById.title}
          </h2>
          <h3>{newsletterById.updatedAt.toLocaleString()}</h3>
          <p className="whitespace-pre-line">
            {newsletterById.content}
          </p>

          <div className="text-xs">
            <p className="mt-5">by {newsletterById.author.name || "Anonymous"}</p>
          </div>
          <div className="card-actions justify-end">
          {isOwner && (
              <Link href={`/dashboard/edit/${newsletterById.id}`} className="btn btn-primary">Edit</Link>
          )}
           <Link href={`/newsletters`} className="btn btn-ghost">Back</Link>
          </div>
        </div>
      </div>
    </>
  )
}

