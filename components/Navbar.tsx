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
        <span className="text-xs text-muted-foreground font-medium">
          UniMelb student reviews
        </span>
      </div>
    </header>
  )
}
