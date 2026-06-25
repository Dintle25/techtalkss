import { notFound } from 'next/navigation'
import Link from 'next/link'
import { fetchTalkById } from '@/lib/mock-data'
import TopicBadge from '@/components/TopicBadge'
import RegisterForm from '@/components/RegisterForm'
import { Clock, MapPin, Users, Calendar, ArrowLeft } from 'lucide-react'

// Next.js 15+: params is a Promise
export default async function TalkPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const talk = await fetchTalkById(Number(id))

  if (!talk) notFound()

  const isFull = talk.registrationCount >= talk.capacity
  const spotsLeft = talk.capacity - talk.registrationCount

  const formattedDate = new Date(talk.scheduledAt).toLocaleString('en-GB', {
    weekday: 'long',
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 py-10 sm:px-6 lg:px-8">

        {/* Back link */}
        <Link
          href="/talks"
          className="inline-flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground mb-8 transition-colors"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to all talks
        </Link>

        {/* Talk details */}
        <div className="bg-card rounded-xl border p-6 mb-8">
          <div className="flex items-start justify-between gap-4 mb-2">
            <h1 className="text-2xl font-bold leading-snug">{talk.title}</h1>
            <TopicBadge topic={talk.topic} />
          </div>

          <p className="text-base font-medium text-muted-foreground mb-6">{talk.speaker}</p>

          <p className="text-sm text-muted-foreground mb-6">{talk.description}</p>

          <dl className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
            <div className="flex items-center gap-2">
              <Calendar className="w-4 h-4 text-muted-foreground shrink-0" />
              <span>{formattedDate}</span>
            </div>
            <div className="flex items-center gap-2">
              <MapPin className="w-4 h-4 text-muted-foreground shrink-0" />
              <span>{talk.location}</span>
            </div>
            <div className="flex items-center gap-2">
              <Clock className="w-4 h-4 text-muted-foreground shrink-0" />
              <span>{talk.duration} minutes</span>
            </div>
            <div
              className={`flex items-center gap-2 font-medium ${
                isFull ? 'text-red-600' : spotsLeft <= 5 ? 'text-orange-600' : 'text-green-700'
              }`}
            >
              <Users className="w-4 h-4 shrink-0" />
              <span>
                {isFull
                  ? 'Fully booked'
                  : `${talk.registrationCount} / ${talk.capacity} registered · ${spotsLeft} spot${spotsLeft === 1 ? '' : 's'} left`}
              </span>
            </div>
          </dl>
        </div>

        {/* Registration form — Client Component boundary */}
        {isFull ? (
          <p className="rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-sm text-orange-800">
            This talk is fully booked. Check back if a spot opens up.
          </p>
        ) : (
          <RegisterForm talkId={talk.id} />
        )}
      </div>
    </main>
  )
}
