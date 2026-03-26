'use client'

import Link from 'next/link'
import { Card, CardContent } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import type { Subject } from '@/data/subjects'
import { useMySubjects } from '@/hooks/useMySubjects'
import { useCompare } from '@/hooks/useCompare'

interface SubjectCardProps {
  subject: Subject
}

export default function SubjectCard({ subject }: SubjectCardProps) {
  const stars = Math.round(subject.overallScore)
  const { isSaved, addSubject, removeSubject, hydrated } = useMySubjects()
  const { isInCompare, addToCompare, removeFromCompare, atMax } = useCompare()
  const saved = hydrated && isSaved(subject.code)
  const inCompare = hydrated && isInCompare(subject.code)
  const compareDisabled = hydrated && atMax && !inCompare

  function handleToggleSave(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (saved) removeSubject(subject.code)
    else addSubject(subject.code)
  }

  function handleToggleCompare(e: React.MouseEvent) {
    e.preventDefault()
    e.stopPropagation()
    if (inCompare) removeFromCompare(subject.code)
    else addToCompare(subject.code)
  }

  return (
    <Link href={`/subject/${subject.code.toLowerCase()}`} className="block group">
      <Card className="h-full transition-all duration-200 group-hover:ring-brand/30 group-hover:shadow-md group-hover:-translate-y-0.5">
        <CardContent className="flex flex-col gap-3 px-5 py-5">
          <div className="flex items-start justify-between gap-2">
            <div>
              <p className="text-xs font-medium text-brand tracking-wide uppercase">
                {subject.code}
              </p>
              <h3 className="mt-0.5 text-sm font-medium text-foreground leading-snug">
                {subject.name}
              </h3>
            </div>
            <Badge variant="outline" className="shrink-0 text-xs text-muted-foreground">
              {subject.creditPoints} pts
            </Badge>
          </div>

          <div className="flex items-center gap-1">
            {Array.from({ length: 5 }).map((_, i) => (
              <svg
                key={i}
                className={`size-3.5 ${i < stars ? 'text-brand' : 'text-muted-foreground/30'}`}
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            ))}
            <span className="ml-1 text-xs text-muted-foreground">
              {subject.overallScore.toFixed(1)}
            </span>
          </div>

          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <span className="font-medium text-foreground">{subject.recommendPercent}%</span>
            <span>recommend</span>
            <span className="ml-auto text-muted-foreground/60">·</span>
            <span>{subject.posts.length} posts</span>
          </div>

          {hydrated && (
            <div className="flex items-center gap-2 mt-0.5 flex-wrap">
              <button
                onClick={handleToggleSave}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border transition-colors ${
                  saved
                    ? 'bg-[#534AB7] text-white border-[#534AB7]'
                    : 'bg-transparent text-muted-foreground border-border hover:border-[#534AB7] hover:text-[#534AB7]'
                }`}
              >
                <svg className="size-3" fill={saved ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} viewBox="0 0 20 20">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
                </svg>
                {saved ? 'saved' : 'save'}
              </button>

              <button
                onClick={handleToggleCompare}
                disabled={compareDisabled}
                title={compareDisabled ? 'Maximum 3 subjects' : undefined}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1 text-xs font-medium border transition-colors disabled:opacity-40 disabled:cursor-not-allowed ${
                  inCompare
                    ? 'bg-[#534AB7] text-white border-[#534AB7]'
                    : 'bg-transparent text-muted-foreground border-border hover:border-[#534AB7] hover:text-[#534AB7]'
                }`}
              >
                <svg className="size-3" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M9 4.5v15m6-15v15m-10.875 0h15.75c.621 0 1.125-.504 1.125-1.125V5.625c0-.621-.504-1.125-1.125-1.125H4.125C3.504 4.5 3 5.004 3 5.625v12.75c0 .621.504 1.125 1.125 1.125z" />
                </svg>
                {inCompare ? 'comparing' : 'compare'}
              </button>
            </div>
          )}
        </CardContent>
      </Card>
    </Link>
  )
}
