import Link from 'next/link'

export default function TalkNotFound() {
  return (
    <main className="min-h-screen bg-gray-50 flex items-center justify-center">
      <div className="text-center px-4">
        <p className="text-6xl font-bold text-muted-foreground/30 mb-4">404</p>
        <h1 className="text-2xl font-bold mb-2">Talk not found</h1>
        <p className="text-muted-foreground mb-8">
          This talk doesn't exist or may have been removed.
        </p>
        <Link
          href="/talks"
          className="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground shadow hover:bg-primary/90 transition-colors"
        >
          Browse all talks
        </Link>
      </div>
    </main>
  )
}
