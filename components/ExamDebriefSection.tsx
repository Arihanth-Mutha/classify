'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import type { DebriefPost } from '@/data/subjects'

const ANIMALS = [
  'wombat', 'platypus', 'quokka', 'koala', 'echidna', 'bilby',
  'bandicoot', 'numbat', 'possum', 'wallaby', 'kookaburra', 'cassowary',
  'dingo', 'quoll', 'tasmanian_devil',
]

function randomAuthor() {
  return `anonymous_${ANIMALS[Math.floor(Math.random() * ANIMALS.length)]}`
}

function getDaysUntilExam(examDate: string): number {
  const today = new Date()
  today.setHours(0, 0, 0, 0)
  const exam = new Date(examDate)
  exam.setHours(0, 0, 0, 0)
  return Math.ceil((exam.getTime() - today.getTime()) / (1000 * 60 * 60 * 24))
}

function DebriefPostCard({ post, pinned }: { post: DebriefPost; pinned?: boolean }) {
  const [upvotes, setUpvotes] = useState(post.upvotes)
  const [voted, setVoted] = useState(false)

  function handleUpvote() {
    if (voted) {
      setUpvotes((v) => v - 1)
    } else {
      setUpvotes((v) => v + 1)
    }
    setVoted((v) => !v)
  }

  return (
    <div
      className={`rounded-xl border px-4 py-4 flex flex-col gap-3 ${
        pinned
          ? 'bg-amber-50/80 border-[#FAC775] dark:bg-amber-950/30 dark:border-amber-700'
          : 'bg-amber-50/40 border-amber-200/60 dark:bg-amber-950/10 dark:border-amber-900'
      }`}
    >
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-medium text-foreground">{post.author}</span>
          <span className="inline-flex items-center rounded-full border border-amber-300 bg-amber-100 px-2 py-0.5 text-xs font-medium text-amber-800 dark:border-amber-700 dark:bg-amber-950 dark:text-amber-300">
            exam debrief
          </span>
          {pinned && (
            <span className="inline-flex items-center gap-1 text-xs font-medium text-amber-700 dark:text-amber-400">
              <svg className="size-3" fill="currentColor" viewBox="0 0 20 20">
                <path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" />
              </svg>
              pinned
            </span>
          )}
        </div>
        <span className="text-xs text-muted-foreground">{post.semester}</span>
      </div>

      <p className="text-sm text-foreground/80 leading-relaxed">{post.content}</p>

      <button
        onClick={handleUpvote}
        className={`flex items-center gap-1.5 w-fit rounded-full px-2.5 py-1 text-xs font-medium border transition-colors ${
          voted
            ? 'bg-amber-500 text-white border-amber-500'
            : 'bg-transparent text-muted-foreground border-amber-200 dark:border-amber-800 hover:border-amber-500 hover:text-amber-600 dark:hover:text-amber-400'
        }`}
      >
        <svg className="size-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 15.75l7.5-7.5 7.5 7.5" />
        </svg>
        {upvotes}
      </button>
    </div>
  )
}

const PINNED_POST: DebriefPost = {
  id: 'pinned-debrief',
  author: 'Class-ify',
  content:
    "The exam is done. Share your experience — what came up, what surprised you, tips for next year's students.",
  upvotes: 0,
  semester: 'Sem 1, 2026',
}

interface ExamDebriefSectionProps {
  examDate: string
  initialPosts: DebriefPost[]
}

export default function ExamDebriefSection({ examDate, initialPosts }: ExamDebriefSectionProps) {
  const daysUntil = getDaysUntilExam(examDate)
  const examHasPassed = daysUntil <= 0

  const [posts, setPosts] = useState<DebriefPost[]>(initialPosts)
  const [newContent, setNewContent] = useState('')
  const [submitting, setSubmitting] = useState(false)

  // sort newest first
  const sorted = [...posts].sort((a, b) => b.id.localeCompare(a.id))

  if (!examHasPassed) return null

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!newContent.trim()) return

    setSubmitting(true)
    setTimeout(() => {
      const newPost: DebriefPost = {
        id: `debrief-${Date.now()}`,
        author: randomAuthor(),
        content: newContent.trim(),
        upvotes: 0,
        semester: 'Sem 1, 2026',
      }
      setPosts((prev) => [newPost, ...prev])
      setNewContent('')
      setSubmitting(false)
    }, 400)
  }

  return (
    <div id="exam-debrief" className="flex flex-col gap-5">
      {/* section header */}
      <div className="flex flex-col gap-1.5">
        <div className="flex items-center gap-2.5">
          <span className="size-2 rounded-full bg-amber-500 animate-pulse shrink-0" />
          <h2 className="text-base font-medium text-amber-800 dark:text-amber-400">
            exam debrief live
          </h2>
          <span className="text-xs text-muted-foreground">{posts.length} posts</span>
        </div>
        <p className="text-xs text-muted-foreground pl-4.5">
          These posts are not included in the AI summary.
        </p>
      </div>

      {/* pinned starter post */}
      <DebriefPostCard post={PINNED_POST} pinned />

      {/* community debrief posts */}
      {sorted.length > 0 && (
        <div className="flex flex-col gap-3">
          {sorted.map((post) => (
            <DebriefPostCard key={post.id} post={post} />
          ))}
        </div>
      )}

      {/* post form */}
      <div className="rounded-xl border border-[#FAC775] bg-amber-50/60 px-5 py-5 dark:bg-amber-950/20 dark:border-amber-800">
        <h3 className="text-sm font-medium text-amber-800 dark:text-amber-400 mb-4">
          Share your exam experience
        </h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <Textarea
            placeholder="What came up? What surprised you? Tips for next year's students…"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="min-h-24 text-sm resize-none border-amber-200 focus-visible:ring-amber-400/40 focus-visible:border-amber-400 dark:border-amber-800"
          />
          <div className="flex items-center justify-between gap-3">
            <p className="text-xs text-muted-foreground">
              Posted anonymously as{' '}
              <span className="font-medium text-foreground">anonymous_student</span>
            </p>
            <Button
              type="submit"
              size="sm"
              disabled={!newContent.trim() || submitting}
              className="bg-amber-600 hover:bg-amber-700 text-white border-none rounded-full"
            >
              {submitting ? 'Posting…' : 'Post'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
