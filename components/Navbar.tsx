import Link from 'next/link'

export default function Navbar() {
  return (
    <header className="sticky top-0 z-50 border-b border-border bg-background/95 backdrop-blur-sm">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-2 group">
          <span className="text-xl font-medium text-brand tracking-tight group-hover:opacity-80 transition-opacity">
            Class-ify
          </span>
        </Link>
        <nav className="flex items-center gap-4">
          <Link
            href="/dashboard"
            className="flex items-center gap-1.5 text-xs font-medium text-muted-foreground hover:text-foreground transition-colors"
          >
            <svg className="size-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
            </svg>
            my subjects
          </Link>
          <span className="text-xs text-muted-foreground font-medium hidden sm:block">
            UniMelb student reviews
          </span>
        </nav>
      </div>
    </header>
  )
}
