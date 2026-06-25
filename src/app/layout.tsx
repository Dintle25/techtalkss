import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import Link from 'next/link'
import './globals.css'
import { Providers } from './providers'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'TechTalks',
  description: 'Browse and register for upcoming tech talks',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <Providers>
          {/* Global nav */}
          <header className="sticky top-0 z-50 border-b bg-white/80 backdrop-blur-sm">
            <nav className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center gap-6">
              <Link
                href="/"
                className="font-bold text-lg tracking-tight text-gray-900 hover:text-gray-600 transition-colors"
              >
                TechTalks
              </Link>
              <div className="flex items-center gap-4 text-sm font-medium">
                <Link
                  href="/"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Home
                </Link>
                <Link
                  href="/talks"
                  className="text-muted-foreground hover:text-foreground transition-colors"
                >
                  Talks
                </Link>
              </div>
            </nav>
          </header>

          {children}
        </Providers>
      </body>
    </html>
  )
}

