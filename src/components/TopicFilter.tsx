'use client'

import { useState } from 'react'
import { Talk, TalkTopic } from '@/types'
import TalkCard from '@/components/TalkCard'
import { Button } from '@/components/ui/button'

const ALL_TOPICS: TalkTopic[] = ['Frontend', 'Backend', 'DevOps', 'AI/ML', 'Mobile']

interface TopicFilterProps {
  talks: Talk[]
}

export default function TopicFilter({ talks }: TopicFilterProps) {
  const [activeTopic, setActiveTopic] = useState<TalkTopic | null>(null)

  const filtered = activeTopic
    ? talks.filter((t) => t.topic === activeTopic)
    : talks

  return (
    <>
      {/* Filter buttons */}
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
            onClick={() => setActiveTopic(activeTopic === topic ? null : topic)}
          >
            {topic}
          </Button>
        ))}
      </div>

      <p className="text-sm text-muted-foreground mb-4">
        {filtered.length} talk{filtered.length !== 1 ? 's' : ''}
        {activeTopic ? ` in ${activeTopic}` : ''}
      </p>

      {/* Grid — each card links to its detail page */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filtered.map((talk) => (
          <TalkCard key={talk.id} talk={talk} href={`/talks/${talk.id}`} />
        ))}
      </div>

      {filtered.length === 0 && (
        <p className="text-center text-muted-foreground py-16">
          No talks found for <strong>{activeTopic}</strong>.
        </p>
      )}
    </>
  )
}
