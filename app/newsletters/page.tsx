import { getAllNewsletter } from "../actions/NewsletterAction";

export default async function NewsletterPage() {

  const newsletters = await getAllNewsletter()

  return (
      <div className="mx-auto max-w-3xl p-4 space-y-4">

        <div className="grid gap-4">
          <h1 className="text-2xl font-bold">Latest Newsletter</h1>
          {newsletters.length === 0 && <p>Nothing posted yet</p>}
          {newsletters.map((n) => (
            <div key={n.id} className="card bg-base-100 w-96  shadow-sm">
            {n.image && (
              <figure>
                <img
                  src={n.image}
                  alt={n.title} />
              </figure>
            )}
              <div className="card-body">

                <h2 className="card-title">
                  {n.title}
                </h2>
                <div className="text-xs uppercase font-semibold opacity-60">By {n.author.name || "Anonymous"} | {n.updatedAt.toLocaleDateString()}</div>
                <p className="line-clamp-4">{n.content}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
};
