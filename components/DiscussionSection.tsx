'use client'

import { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Textarea } from '@/components/ui/textarea'
import type { Post, TagType } from '@/data/subjects'

const TAG_LABELS: Record<TagType, string> = {
  general: 'general',
  assessment: 'assessment',
  lecturer: 'lecturer',
  exam: 'exam',
  workload: 'workload',
}

const TAG_COLOURS: Record<TagType, string> = {
  general: 'bg-slate-100 text-slate-700 border-slate-200 dark:bg-slate-800 dark:text-slate-300 dark:border-slate-700',
  assessment: 'bg-violet-50 text-violet-700 border-violet-200 dark:bg-violet-950 dark:text-violet-300 dark:border-violet-800',
  lecturer: 'bg-orange-50 text-orange-700 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800',
  exam: 'bg-red-50 text-red-700 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800',
  workload: 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800',
}

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

function PostCard({ post }: { post: Post }) {
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
    <div className="rounded-xl border border-border bg-card px-4 py-4 flex flex-col gap-3">
      <div className="flex items-center justify-between gap-2 flex-wrap">
        <div className="flex items-center gap-2 flex-wrap">
          <span className="text-xs font-medium text-foreground">{post.author}</span>
          <span
            className={`inline-flex items-center rounded-full border px-2 py-0.5 text-xs font-medium ${TAG_COLOURS[post.tag]}`}
          >
            {TAG_LABELS[post.tag]}
          </span>
        </div>
        <span className="text-xs text-muted-foreground">{post.semester}</span>
      </div>

      <p className="text-sm text-foreground/80 leading-relaxed">{post.content}</p>

      <button
        onClick={handleUpvote}
        className={`flex items-center gap-1.5 w-fit rounded-full px-2.5 py-1 text-xs font-medium border transition-colors ${
          voted
            ? 'bg-brand text-white border-brand'
            : 'bg-transparent text-muted-foreground border-border hover:border-brand hover:text-brand'
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

interface DiscussionSectionProps {
  initialPosts: Post[]
  examDate?: string | null
}

export default function DiscussionSection({ initialPosts, examDate }: DiscussionSectionProps) {
  const [posts, setPosts] = useState<Post[]>(initialPosts)
  const [activeTag, setActiveTag] = useState<TagType | 'all'>('all')
  const [newContent, setNewContent] = useState('')
  const [newTag, setNewTag] = useState<TagType>('general')
  const [submitting, setSubmitting] = useState(false)

  const daysUntilExam = examDate ? getDaysUntilExam(examDate) : null
  const examUpcoming = daysUntilExam !== null && daysUntilExam > 0

  const filtered =
    activeTag === 'all' ? posts : posts.filter((p) => p.tag === activeTag)

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!newContent.trim()) return

    setSubmitting(true)
    setTimeout(() => {
      const newPost: Post = {
        id: `post-${Date.now()}`,
        author: randomAuthor(),
        tag: newTag,
        content: newContent.trim(),
        upvotes: 0,
        semester: 'Sem 1, 2025',
      }
      setPosts((prev) => [newPost, ...prev])
      setNewContent('')
      setSubmitting(false)
    }, 400)
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex items-center justify-between gap-2">
        <h2 className="text-base font-medium text-foreground">Discussion</h2>
        <span className="text-xs text-muted-foreground">{posts.length} posts</span>
      </div>

      {/* exam countdown banner */}
      {examUpcoming && daysUntilExam !== null && (
        <div className="flex items-center gap-2.5 rounded-xl border border-border bg-muted/40 px-4 py-3">
          <svg className="size-4 shrink-0 text-muted-foreground" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-xs text-muted-foreground">
            Exam in{' '}
            <span className="font-medium text-foreground">
              {daysUntilExam} {daysUntilExam === 1 ? 'day' : 'days'}
            </span>
            {' '}· good luck 🤞
          </p>
        </div>
      )}

      {/* tag filter */}
      <div className="flex flex-wrap gap-2">
        {(['all', 'general', 'assessment', 'lecturer', 'exam', 'workload'] as const).map((tag) => (
          <button
            key={tag}
            onClick={() => setActiveTag(tag)}
            className={`rounded-full px-3 py-1 text-xs font-medium border transition-colors ${
              activeTag === tag
                ? 'bg-[#534AB7] text-white border-[#534AB7]'
                : 'bg-transparent text-muted-foreground border-border hover:border-[#534AB7] hover:text-[#534AB7]'
            }`}
          >
            {tag}
          </button>
        ))}
      </div>

      {/* posts */}
      <div className="flex flex-col gap-3">
        {filtered.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border px-6 py-10 text-center">
            <p className="text-sm text-muted-foreground">
              No posts in this category yet. Be the first to share your experience.
            </p>
          </div>
        ) : (
          filtered.map((post) => <PostCard key={post.id} post={post} />)
        )}
      </div>

      {/* post form */}
      <div className="rounded-xl border border-border bg-card px-5 py-5">
        <h3 className="text-sm font-medium text-foreground mb-4">Share your experience</h3>
        <form onSubmit={handleSubmit} className="flex flex-col gap-3">
          <div className="flex flex-wrap gap-2">
            {(Object.keys(TAG_LABELS) as TagType[]).map((tag) => (
              <button
                key={tag}
                type="button"
                onClick={() => setNewTag(tag)}
                className={`rounded-full px-3 py-1 text-xs font-medium border transition-colors ${
                  newTag === tag
                    ? 'bg-[#534AB7] text-white border-[#534AB7]'
                    : 'bg-transparent text-muted-foreground border-border hover:border-[#534AB7] hover:text-[#534AB7]'
                }`}
              >
                {tag}
              </button>
            ))}
          </div>

          <Textarea
            placeholder="Share your honest experience with other students…"
            value={newContent}
            onChange={(e) => setNewContent(e.target.value)}
            className="min-h-24 text-sm resize-none"
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
              className="bg-[#534AB7] hover:bg-[#453EA0] text-white border-none rounded-full"
            >
              {submitting ? 'Posting…' : 'Post'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}
