import Link from 'next/link'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Talk } from '@/types'
import TopicBadge from '@/components/TopicBadge'
import { Clock, MapPin, Users, Calendar } from 'lucide-react'

interface TalkCardProps {
  talk: Talk
  href?: string
}

function formatScheduledAt(iso: string): string {
  return new Date(iso).toLocaleString('en-GB', {
    weekday: 'short',
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  })
}

export default function TalkCard({ talk, href }: TalkCardProps) {
  const isFull = talk.registrationCount >= talk.capacity
  const spotsLeft = talk.capacity - talk.registrationCount

  const cardBody = (
    <Card className="flex flex-col h-full hover:shadow-md transition-shadow duration-200">
      <CardHeader className="pb-3">
        <div className="flex items-start justify-between gap-2">
          <CardTitle className="text-lg leading-snug">{talk.title}</CardTitle>
          <TopicBadge topic={talk.topic} />
        </div>
        <p className="text-sm font-medium text-muted-foreground">{talk.speaker}</p>
      </CardHeader>

      <CardContent className="flex flex-col gap-3 flex-1">
        <p className="text-sm text-muted-foreground line-clamp-2">{talk.description}</p>

        <div className="mt-auto grid grid-cols-2 gap-y-2 gap-x-4 text-sm text-muted-foreground">
          <span className="flex items-center gap-1.5">
            <Clock className="w-3.5 h-3.5 shrink-0" />
            {talk.duration} min
          </span>

          <span className="flex items-center gap-1.5">
            <MapPin className="w-3.5 h-3.5 shrink-0" />
            {talk.location}
          </span>

          <span className="flex items-center gap-1.5 col-span-2">
            <Calendar className="w-3.5 h-3.5 shrink-0" />
            {formatScheduledAt(talk.scheduledAt)}
          </span>

          <span
            className={`flex items-center gap-1.5 col-span-2 font-medium ${
              isFull ? 'text-red-600' : spotsLeft <= 5 ? 'text-orange-600' : 'text-green-700'
            }`}
          >
            <Users className="w-3.5 h-3.5 shrink-0" />
            {isFull
              ? 'Fully booked'
              : `${talk.registrationCount} / ${talk.capacity} registered (${spotsLeft} spot${spotsLeft === 1 ? '' : 's'} left)`}
          </span>
        </div>
      </CardContent>
    </Card>
  )

  if (href) {
    return (
      <Link href={href} className="block h-full focus:outline-none focus-visible:ring-2 focus-visible:ring-ring rounded-xl">
        {cardBody}
      </Link>
    )
  }

  return cardBody
}


