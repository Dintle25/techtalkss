// 'use client'

// import { useState } from 'react'
// import { talks } from '@/lib/mock-data'
// import { TalkTopic } from '@/types'
// import TalkCard from '@/components/TalkCard'
// import { Button } from '@/components/ui/button'

// const ALL_TOPICS: TalkTopic[] = ['Frontend', 'Backend', 'DevOps', 'AI/ML', 'Mobile']

// export default function Home() {
//   const [activeTopic, setActiveTopic] = useState<TalkTopic | null>(null)

//   const filtered = activeTopic
//     ? talks.filter((t) => t.topic === activeTopic)
//     : talks

//   return (
//     <main className="min-h-screen bg-gray-50">
//       <div className="max-w-6xl mx-auto px-4 py-10 sm:px-6 lg:px-8">

//         {/* Header */}
//         <div className="mb-8">
//           <h1 className="text-3xl font-bold tracking-tight text-gray-900">TechTalks</h1>
//           <p className="mt-1 text-muted-foreground">
//             Browse and register for upcoming tech talks.
//           </p>
//         </div>

//         {/* Topic filter */}
//         <div className="flex flex-wrap gap-2 mb-8">
//           <Button
//             variant={activeTopic === null ? 'default' : 'outline'}
//             size="sm"
//             onClick={() => setActiveTopic(null)}
//           >
//             All
//           </Button>
//           {ALL_TOPICS.map((topic) => (
//             <Button
//               key={topic}
//               variant={activeTopic === topic ? 'default' : 'outline'}
//               size="sm"
//               onClick={() => setActiveTopic(topic === activeTopic ? null : topic)}
//             >
//               {topic}
//             </Button>
//           ))}
//         </div>

//         {/* Results count */}
//         <p className="text-sm text-muted-foreground mb-4">
//           {filtered.length} talk{filtered.length !== 1 ? 's' : ''}
//           {activeTopic ? ` in ${activeTopic}` : ''}
//         </p>

//         {/* Talk grid */}
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
//           {filtered.map((talk) => (
//             <TalkCard key={talk.id} talk={talk} />
//           ))}
//         </div>

//         {filtered.length === 0 && (
//           <p className="text-center text-muted-foreground py-16">
//             No talks found for <strong>{activeTopic}</strong>.
//           </p>
//         )}
//       </div>
//     </main>
//   )
// }







'use client'

import { useState } from 'react'
import { useQuery } from '@tanstack/react-query'
import { fetchTalks } from '@/lib/mock-data'
import { TalkTopic } from '@/types'
import TalkCard from '@/components/TalkCard'
import { Button } from '@/components/ui/button'
import { Skeleton } from '@/components/ui/skeleton'
import RegisterForm from '@/components/RegisterForm'

const ALL_TOPICS: TalkTopic[] = ['Frontend', 'Backend', 'DevOps', 'AI/ML', 'Mobile']

function TalkCardSkeleton() {
  return (
    <div className="rounded-xl border bg-card p-5 flex flex-col gap-4">
      {/* Title + badge row */}
      <div className="flex items-start justify-between gap-3">
        <Skeleton className="h-5 w-3/4 rounded" />
        <Skeleton className="h-5 w-16 rounded-full" />
      </div>
      {/* Speaker */}
      <Skeleton className="h-4 w-1/3 rounded" />
      {/* Description */}
      <Skeleton className="h-4 w-full rounded" />
      <Skeleton className="h-4 w-5/6 rounded" />
      {/* Meta grid */}
      <div className="grid grid-cols-2 gap-2 mt-2">
        <Skeleton className="h-4 w-20 rounded" />
        <Skeleton className="h-4 w-24 rounded" />
        <Skeleton className="h-4 w-40 rounded col-span-2" />
        <Skeleton className="h-4 w-36 rounded col-span-2" />
      </div>
    </div>
  )
}

export default function Home() {
  const [activeTopic, setActiveTopic] = useState<TalkTopic | null>(null)

  const { data, isPending, isError, error } = useQuery({
    queryKey: ['talks'],
    queryFn: fetchTalks,
  })

  const filtered = activeTopic
    ? (data ?? []).filter((t) => t.topic === activeTopic)
    : (data ?? [])

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-10 sm:px-6 lg:px-8">

        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">TechTalks</h1>
          <p className="mt-1 text-muted-foreground">
            Browse and register for upcoming tech talks.
          </p>
        </div>

        {/* Topic filter — always visible so layout doesn't jump */}
        <div className="flex flex-wrap gap-2 mb-8">
          <Button
            variant={activeTopic === null ? 'default' : 'outline'}
            size="sm"
            onClick={() => setActiveTopic(null)}
          >
            All
          </Button>
          {ALL_TOPICS.map((topic) => (
            <Button
              key={topic}
              variant={activeTopic === topic ? 'default' : 'outline'}
              size="sm"
              onClick={() => setActiveTopic(topic === activeTopic ? null : topic)}
            >
              {topic}
            </Button>
          ))}
        </div>

        {/* Error banner */}
        {isError && (
          <div className="mb-6 rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-800">
            <strong className="font-semibold">Failed to load talks: </strong>
            {error instanceof Error ? error.message : 'An unexpected error occurred.'}
          </div>
        )}

        {/* Loading skeletons */}
        {isPending && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            <TalkCardSkeleton />
            <TalkCardSkeleton />
            <TalkCardSkeleton />
          </div>
        )}

        {/* Talk grid */}
        {!isPending && !isError && (
          <>
            <p className="text-sm text-muted-foreground mb-4">
              {filtered.length} talk{filtered.length !== 1 ? 's' : ''}
              {activeTopic ? ` in ${activeTopic}` : ''}
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filtered.map((talk) => (
                <TalkCard key={talk.id} talk={talk} />
              ))}
            </div>

            {filtered.length === 0 && (
              <p className="text-center text-muted-foreground py-16">
                No talks found for <strong>{activeTopic}</strong>.
              </p>
            )}
          </>
        )}

        {/* test  */}
        {/* {!isPending && !isError && (
          <div className="mt-12">
            <h2 className="text-xl font-semibold mb-4">Test Registration (Talk #1)</h2>
            <RegisterForm talkId={1} />
          </div>
        )} */}
      </div>
    </main>
  )
}
