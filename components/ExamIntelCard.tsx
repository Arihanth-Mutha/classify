'use client'

import { useState } from 'react'
import type { ExamIntel, ExamDifficulty, DebriefPost } from '@/data/subjects'

function getDaysUntilExam(examDate: string): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const exam = new Date(examDate)
  exam.setHours(0, 0, 0, 0)
  return Math.ceil((exam.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

const DIFFICULTY_CONFIG: Record<
  ExamDifficulty,
  { label: string; classes: string }
> = {
  easier: {
    label: 'easier than past papers',
    classes:
      'bg-emerald-100 text-emerald-800 border-emerald-300 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-700',
  },
  similar: {
    label: 'similar to past papers',
    classes:
      'bg-amber-100 text-amber-800 border-amber-300 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-700',
  },
  harder: {
    label: 'harder than past papers',
    classes:
      'bg-red-100 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800',
  },
}

interface TipRowProps {
  number: number
  text: string
  initialCount: number
}

function TipRow({ number, text, initialCount }: TipRowProps) {
  const [count, setCount] = useState(initialCount)
  const [voted, setVoted] = useState(false)

  function handleThumbsUp() {
    if (voted) {
      setCount((c) => c - 1)
    } else {
      setCount((c) => c + 1)
    }
    setVoted((v) => !v)
  }

  return (
    <div className="flex items-start gap-3">
      <span className="mt-0.5 flex size-5 shrink-0 items-center justify-center rounded-full bg-blue-100 text-blue-700 text-xs font-medium dark:bg-blue-950 dark:text-blue-300">
        {number}
      </span>
      <p className="flex-1 text-sm text-foreground/80 leading-relaxed">{text}</p>
      <button
        onClick={handleThumbsUp}
        title="Was this helpful?"
        className={`shrink-0 flex items-center gap-1 rounded-full border px-2 py-0.5 text-xs font-medium transition-colors ${
          voted
            ? 'bg-blue-600 text-white border-blue-600'
            : 'bg-transparent text-muted-foreground border-border hover:border-blue-400 hover:text-blue-600 dark:hover:text-blue-400'
        }`}
      >
        <svg className="size-3" fill={voted ? 'currentColor' : 'none'} stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M6.633 10.25c.806 0 1.533-.446 2.031-1.08a9.041 9.041 0 012.861-2.4c.723-.384 1.35-.956 1.653-1.715a4.498 4.498 0 00.322-1.672V2.75a.75.75 0 01.75-.75 2.25 2.25 0 012.25 2.25c0 1.152-.26 2.243-.723 3.218-.266.558.107 1.282.725 1.282m0 0h3.126c1.026 0 1.945.694 2.054 1.715.045.422.068.85.068 1.285a11.95 11.95 0 01-2.649 7.521c-.388.482-.987.729-1.605.729H13.48c-.483 0-.964-.078-1.423-.23l-3.114-1.04a4.501 4.501 0 00-1.423-.23H5.909M14.25 9h2.25M5.909 18.006...0 10.5 12c.536 0 .995-.372 1.093-.886l.396-2.101a.75.75 0 00-.75-.888H5.5a.75.75 0 00-.75.75v2.25c0 .414.336.75.75.75h.409" />
        </svg>
        {count}
      </button>
    </div>
  )
}

interface ExamIntelCardProps {
  examIntel: ExamIntel
  examDate: string | null
  examDebriefPosts: DebriefPost[]
}

export default function ExamIntelCard({
  examIntel,
  examDate,
  examDebriefPosts,
}: ExamIntelCardProps) {
  const daysUntil = examDate ? getDaysUntilExam(examDate) : null

  // Sort tips by helpfulCount descending, preserve order on ties
  const sortedTips = [...examIntel.tips].sort(
    (a, b) => b.helpfulCount - a.helpfulCount
  )

  const diffConfig = DIFFICULTY_CONFIG[examIntel.difficultyVsPastPapers]

  // Group archived debrief posts by semester
  const debriefBySemester = examDebriefPosts.reduce<Record<string, DebriefPost[]>>(
    (acc, post) => {
      if (!acc[post.semester]) acc[post.semester] = []
      acc[post.semester].push(post)
      return acc
    },
    {}
  )
  const debriefSemesters = Object.keys(debriefBySemester).sort().reverse()

  const showUrgencyBanner =
    daysUntil !== null && daysUntil > 0 && daysUntil <= 7
  const showDebriefBanner =
    daysUntil !== null && daysUntil <= 0 && daysUntil >= -1
  const showArchivedDebrief = daysUntil !== null && daysUntil <= -2

  return (
    <div className="flex flex-col gap-3">
      {/* urgency banner — ≤7 days before exam */}
      {showUrgencyBanner && (
        <div className="flex items-center gap-2.5 rounded-xl border border-amber-300 bg-amber-50 px-4 py-3 dark:border-amber-700 dark:bg-amber-950/40">
          <svg
            className="size-4 shrink-0 text-amber-600 dark:text-amber-400"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z" />
          </svg>
          <p className="text-xs font-medium text-amber-800 dark:text-amber-300">
            Exam in{' '}
            <span className="font-medium">
              {daysUntil} {daysUntil === 1 ? 'day' : 'days'}
            </span>{' '}
            — read these tips carefully.
          </p>
        </div>
      )}

      {/* within 48h of exam — point to live debrief */}
      {showDebriefBanner && (
        <div className="flex items-center gap-2.5 rounded-xl border border-blue-200 bg-blue-50 px-4 py-3 dark:border-blue-800 dark:bg-blue-950/30">
          <span className="size-2 rounded-full bg-blue-500 animate-pulse shrink-0" />
          <p className="text-xs text-blue-800 dark:text-blue-300">
            The exam just happened —{' '}
            <a
              href="#exam-debrief"
              className="font-medium underline underline-offset-2 hover:no-underline"
            >
              share your experience in the live debrief thread ↓
            </a>
          </p>
        </div>
      )}

      {/* main exam intel card */}
      <div className="rounded-xl border border-blue-200 bg-blue-50/60 px-4 py-4 flex flex-col gap-4 dark:border-blue-900 dark:bg-blue-950/20">

        {/* header row: difficulty badge + post count */}
        <div className="flex items-center justify-between gap-3 flex-wrap">
          <span
            className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${diffConfig.classes}`}
          >
            {diffConfig.label}
          </span>
          <span className="text-xs text-muted-foreground">
            based on {examIntel.postCount} student posts
          </span>
        </div>

        {/* format notes */}
        <div className="flex flex-col gap-1.5">
          <p className="text-xs font-medium text-blue-700 uppercase tracking-wide dark:text-blue-400">
            Format
          </p>
          <ul className="flex flex-col gap-1">
            {examIntel.formatNotes.map((note, i) => (
              <li key={i} className="flex items-start gap-2 text-sm text-foreground/80 leading-relaxed">
                <span className="mt-1.5 size-1.5 rounded-full bg-blue-400 shrink-0 dark:bg-blue-600" />
                {note}
              </li>
            ))}
          </ul>
        </div>

        {/* divider */}
        <div className="h-px bg-blue-100 dark:bg-blue-900" />

        {/* tips */}
        <div className="flex flex-col gap-3">
          <p className="text-xs font-medium text-blue-700 uppercase tracking-wide dark:text-blue-400">
            Top tips
          </p>
          <div className="flex flex-col gap-3">
            {sortedTips.map((tip, i) => (
              <TipRow
                key={tip.id}
                number={i + 1}
                text={tip.text}
                initialCount={tip.helpfulCount}
              />
            ))}
          </div>
        </div>
      </div>

      {/* archived debrief highlights — >48h after exam */}
      {showArchivedDebrief && (
        <div className="rounded-xl border border-border bg-muted/30 px-4 py-4 flex flex-col gap-3">
          <div className="flex items-center gap-2">
            <p className="text-xs font-medium text-foreground">Archived debrief highlights</p>
            <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
              past semester
            </span>
          </div>
          {debriefSemesters.length === 0 ? (
            <p className="text-xs text-muted-foreground">
              No debrief posts archived yet — check the debrief thread below for the latest.
            </p>
          ) : (
            debriefSemesters.map((semester) => (
              <div key={semester} className="flex flex-col gap-2">
                <p className="text-xs font-medium text-muted-foreground">{semester}</p>
                {debriefBySemester[semester].slice(0, 3).map((post) => (
                  <div key={post.id} className="rounded-lg border border-border bg-card px-3 py-2.5">
                    <p className="text-xs text-foreground/70 leading-relaxed">{post.content}</p>
                    <p className="mt-1.5 text-xs text-muted-foreground">{post.author}</p>
                  </div>
                ))}
              </div>
            ))
          )}
        </div>
      )}
    </div>
  )
}
