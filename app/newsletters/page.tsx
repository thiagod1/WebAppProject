import { getAllNewsletter, getDevToArticles, getRseNewsletters } from "../actions/NewsletterAction";

import Image from "next/image"
import Link from "next/link"

const fallbackImages = [ 
  "https://images.unsplash.com/photo-1504711434969-e33886168f5c?w=1200",
  "https://images.unsplash.com/photo-1499750310107-5fef28a66643?w=1200",
  "https://images.unsplash.com/photo-1495020689067-958852a7765e?w=1200",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?w=1200",
  "https://images.unsplash.com/photo-1517694712202-14dd9538aa97?w=1200",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200",
]

export default async function NewsletterPage() {

  const newsletters = await getAllNewsletter()

  const us_rse = await getRseNewsletters()

  const devTo = await getDevToArticles()

  return (
    <div className="mx-auto max-w-3xl p-4 space-y-4">

      <div className="grid gap-4">
        <h1 className="text-2xl font-bold">Latest Newsletter</h1>
        {newsletters.length === 0 && <p>Nothing posted yet</p>}
        {newsletters.map((n) => (
          <div key={n.id} className="card bg-base-100 w-full shadow-sm">
            {n.image && (
              <figure>
                <Image
                  src={n.image}
                  alt={n.title}
                  width={768}
                  height={288}
                  className="h-72 w-full rounded-box object-cover"
                />
              </figure>
            )}
            <div className="card-body">

              <h2 className="card-title">
                {n.title}
              </h2>
              <div className="text-xs uppercase font-semibold opacity-60">By {n.author.name || "Anonymous"} | {n.updatedAt.toLocaleDateString()}</div>
              <p className="line-clamp-4">{n.content}</p>
              <div className="card-actions justify-end">
                <Link className="btn btn-primary btn-sm" href={`/newsletters/${n.id}`}>Read More</Link>
              </div>
            </div>
          </div>
        ))}
        <h2 className="card-title text-2xl font-bold">US-RSE Newsletter</h2>
        {us_rse.length === 0 && <p>No posts from RSE</p>}
        {us_rse.map((rse, i) => (
          <div className="card bg-base-100 w-full shadow-sm" key={rse.url}>
            <figure>
              <Image 
                src= {fallbackImages[i % fallbackImages.length]}
                alt= {rse.title}
                width={768}
                height={288}
                className="h-72 w-full rounded-box object-cover"
              />
            </figure>
            <div className="card-body">
              <h2>{rse.title}</h2>
              <div className="text-xs uppercase font-semibold opacity-60">
                {new Date(rse.published).toLocaleDateString()}
              </div>
              <p className="line-clamp-4">{rse.description}</p>
              <div className="card-actions justify-end">
                <a href={rse.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">Read More at RSE</a>
              </div>
            </div>
          </div>
        ))}
        <h2 className="card-title text-2xl font-bold">devTo Newsletters</h2>
        {devTo.length === 0 && <p>No posts from devTo</p>}
        {devTo.map((d,i) => (
          <div className="card bg-base-100 w-full shadow-sm" key={d.id}>
              <figure>
                <Image
                  src={d.cover_image ?? fallbackImages[i % fallbackImages.length]}
                  alt={d.title}
                  width={768}
                  height={288}
                  className="h-72 w-full rounded-box object-cover"
                />
              </figure>

              <div className="card-body">
              <h2>{d.title}</h2>
              <div className="text-xs uppercase font-semibold opacity-60">
                By {d.user.name || "Anonymous"}
              </div>
              <p className="line-clamp-4">{d.description}</p>
              <div className="card-actions justify-end">
                <a href={d.url} target="_blank" rel="noopener noreferrer" className="btn btn-primary btn-sm">Read More at DevDocs</a>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

