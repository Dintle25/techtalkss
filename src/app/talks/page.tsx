// No "use client" — this is a Server Component.
// useState cannot be used here because Server Components run on the server
// at request time and have no client-side lifecycle.
// The topic filter (which needs useState) must live in a separate Client Component.

import { fetchTalks } from '@/lib/mock-data'
import TalkCard from '@/components/TalkCard'
import TopicFilter from '@/components/TopicFilter'

export default async function TalksPage() {
  const talks = await fetchTalks()

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto px-4 py-10 sm:px-6 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">All Talks</h1>
          <p className="mt-1 text-muted-foreground">
            {talks.length} talks available — click any card to register.
          </p>
        </div>

        {/* TopicFilter is a Client Component — it owns the useState filter
            and renders the filtered subset of cards passed as props */}
        <TopicFilter talks={talks} />
      </div>
    </main>
  )
}
