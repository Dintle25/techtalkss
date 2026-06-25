import { Badge } from '@/components/ui/badge'
import { TalkTopic } from '@/types'

const topicStyles: Record<TalkTopic, string> = {
  Frontend: 'bg-blue-100 text-blue-800 hover:bg-blue-100',
  Backend:  'bg-green-100 text-green-800 hover:bg-green-100',
  DevOps:   'bg-orange-100 text-orange-800 hover:bg-orange-100',
  'AI/ML':  'bg-purple-100 text-purple-800 hover:bg-purple-100',
  Mobile:   'bg-pink-100 text-pink-800 hover:bg-pink-100',
}

interface TopicBadgeProps {
  topic: TalkTopic
}

export default function TopicBadge({ topic }: TopicBadgeProps) {
  return (
    <Badge className={topicStyles[topic]}>
      {topic}
    </Badge>
  )
}
