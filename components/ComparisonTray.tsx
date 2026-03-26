'use client'

import { useRouter } from 'next/navigation'
import { subjects as allSubjects } from '@/data/subjects'
import { useCompare } from '@/hooks/useCompare'

export default function ComparisonTray() {
  const { compareCodes, hydrated, removeFromCompare, clearCompare } = useCompare()
  const router = useRouter()

  const subjects = compareCodes
    .map((code) => allSubjects.find((s) => s.code === code))
    .filter(Boolean) as typeof allSubjects

  const visible = hydrated && compareCodes.length > 0

  return (
    <div
      className={`fixed bottom-0 left-0 right-0 z-50 transition-all duration-300 ease-out ${
        visible ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0 pointer-events-none'
      }`}
    >
      <div className="border-t border-border bg-background/95 backdrop-blur-md shadow-2xl">
        <div className="mx-auto flex max-w-5xl items-center gap-3 px-4 py-3 flex-wrap md:flex-nowrap">

          {/* selected subjects */}
          <div className="flex items-center gap-2 flex-1 flex-wrap">
            <span className="text-xs text-muted-foreground shrink-0 mr-1">Comparing:</span>
            {subjects.map((s) => (
              <div
                key={s.code}
                className="flex items-center gap-1.5 rounded-full border border-[#534AB7]/40 bg-[#EEEDFE] dark:bg-[#1E1A2E] px-2.5 py-1"
              >
                <span className="text-xs font-medium text-[#534AB7]">{s.code}</span>
                <span className="text-xs text-muted-foreground hidden sm:inline truncate max-w-24">
                  {s.name}
                </span>
                <button
                  onClick={() => removeFromCompare(s.code)}
                  className="ml-0.5 rounded-full p-0.5 text-muted-foreground hover:text-foreground hover:bg-border transition-colors"
                  aria-label={`Remove ${s.code}`}
                >
                  <svg className="size-3" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            ))}

            {/* empty slot indicators */}
            {Array.from({ length: Math.max(0, 3 - subjects.length) }).map((_, i) => (
              <div
                key={i}
                className="flex items-center justify-center rounded-full border border-dashed border-border px-3 py-1 text-xs text-muted-foreground/50"
              >
                + add
              </div>
            ))}
          </div>

          {/* actions */}
          <div className="flex items-center gap-2 shrink-0">
            <button
              onClick={clearCompare}
              className="text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              Clear
            </button>
            <button
              onClick={() => router.push('/compare')}
              disabled={subjects.length < 2}
              className="flex items-center gap-1.5 rounded-full bg-[#534AB7] px-4 py-2 text-xs font-medium text-white hover:bg-[#453EA0] transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
            >
              Compare now
              <svg className="size-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
              </svg>
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}
