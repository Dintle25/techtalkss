import { Skeleton } from '@/components/ui/skeleton'

function TalkCardSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-5 flex flex-col gap-4">
      <div className="flex items-start justify-between gap-3">
        <Skeleton className="h-5 w-3/4 rounded" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      <Skeleton className="h-4 w-1/3 rounded" />
      <Skeleton className="h-4 w-full rounded" />
      <Skeleton className="h-4 w-5/6 rounded" />
      <div className="grid grid-cols-2 gap-2 mt-2">
        <Skeleton className="h-4 w-20 rounded" />
        <Skeleton className="h-4 w-24 rounded" />
        <Skeleton className="h-4 w-40 rounded col-span-2" />
        <Skeleton className="h-4 w-36 rounded col-span-2" />
      </div>
    </div>
  )
}

export default function TalksLoading() {
  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <Skeleton className="h-9 w-36 rounded mb-2" />
          <Skeleton className="h-4 w-56 rounded" />
        </div>

        {/* Filter button placeholders */}
        <div className="flex gap-2 mb-8">
          {Array.from({ length: 6 }).map((_, i) => (
            <Skeleton key={i} className="h-8 w-20 rounded-md" />
          ))}
        </div>

        <Skeleton className="h-4 w-24 rounded mb-4" />

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, i) => (
            <TalkCardSkeleton key={i} />
          ))}
        </div>
      </div>
    </main>
  )
}
