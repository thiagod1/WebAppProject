import { deleteNewsletter, getMyNewsletter } from "../actions/NewsletterAction"
import Link from 'next/link'


export default async function DashboardPage() {
  const newsletters = await getMyNewsletter()

  return (
    <div className="w-full space-y-4">
    {/* Header section */}
      <div className="flex items-center justify-between">
        <h1 className="text-2xl font-bold">My Newsletters</h1>
        <Link href="/dashboard/create" className="btn btn-primary btn-sm">
          Create Newsletter
        </Link>
      </div>

      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          {/* Head */}
          <thead>
            <tr>
              <th>Title</th>
              <th>Content</th>
              <th>Status</th>
              <th className="text-right">Actions</th>
            </tr>
          </thead>

          {/* Body */}
          <tbody>
            {newsletters.length === 0 && (
              <tr>
                <td colSpan={4}> No Newsletter Yet, Create one!</td>
              </tr>
            )}
            {newsletters.map((newsletter) => (
              <tr key={newsletter.id}>
                {/* Title And Image Column */}
                <td>
                  <div className="flex items-center gap-3">
                    {newsletter.image && (
                      <div className="avatar">
                        <div className="mask mask-squircle h-12 w-12">
                          <img src={newsletter.image} alt={newsletter.title} />
                        </div>
                      </div>
                    )}
                    <div>
                      <div className="font-bold">{newsletter.title}</div>
                      <div className="text-sm opacity-50 font-mono">
                        Timestamp: {newsletter.updatedAt.toLocaleDateString()}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Content Column */}
                <td className="max-w-xs truncate">{newsletter.content}</td>

                {/* Status Column */}
                <td>
                  <span className="badge badge-ghost badge-sm">
                    {newsletter.status}
                  </span>
                </td>

                {/* Actions Column */}
                <td className="text-right">
                  <div className="flex justify-end gap-2">
                    <Link href={`/dashboard/edit/${newsletter.id}`} className="btn btn-ghost btn-xs">Edit</Link>
                    <form
                      action={async () => {
                        "use server";
                        await deleteNewsletter(newsletter.id);
                      }}
                    >
                      <button
                        type="submit"
                        className="btn btn-error btn-xs text-white"
                      >
                        Remove
                      </button>
                    </form>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>

  );
}
