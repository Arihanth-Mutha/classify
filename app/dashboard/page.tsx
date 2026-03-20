'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { subjects } from '@/data/subjects'
import { useMySubjects } from '@/hooks/useMySubjects'

export default function DashboardPage() {
  const { savedCodes, hydrated, removeSubject } = useMySubjects()

  const mySubjects = subjects.filter((s) => savedCodes.includes(s.code))

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="mx-auto max-w-3xl px-4 py-10">
          <div className="flex flex-col gap-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="h-40 rounded-xl bg-muted animate-pulse" />
            ))}
          </div>
        </main>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-3xl px-4 py-8">
        <div className="mb-8">
          <h1 className="text-xl md:text-2xl font-medium text-foreground">My subjects</h1>
          <p className="mt-1 text-sm text-muted-foreground">
            Your personalised feed of saved subjects.
          </p>
        </div>

        {mySubjects.length === 0 ? (
          <div className="rounded-xl border border-dashed border-border px-6 py-16 text-center">
            <p className="text-sm font-medium text-foreground">No subjects added yet</p>
            <p className="mt-1.5 text-sm text-muted-foreground max-w-sm mx-auto">
              Add subjects from the home page to see your personalised feed here.
            </p>
            <Link
              href="/"
              className="mt-5 inline-flex items-center gap-1.5 rounded-full bg-[#534AB7] px-4 py-2 text-xs font-medium text-white hover:bg-[#453EA0] transition-colors"
            >
              <svg className="size-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              Browse subjects
            </Link>
          </div>
        ) : (
          <div className="flex flex-col gap-5">
            {mySubjects.map((subject) => {
              const recentPosts = [...subject.posts].slice(0, 3)
              const stars = Math.round(subject.overallScore)

              return (
                <div
                  key={subject.code}
                  className="rounded-xl border border-border bg-card overflow-hidden"
                >
                  {/* subject header */}
                  <div className="px-5 pt-5 pb-4 flex items-start justify-between gap-3">
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center gap-2 flex-wrap">
                        <span className="text-xs font-medium text-brand tracking-wide uppercase">
                          {subject.code}
                        </span>
                        <span className="text-xs text-muted-foreground">{subject.faculty}</span>
                      </div>
                      <h2 className="mt-0.5 text-base font-medium text-foreground leading-snug">
                        {subject.name}
                      </h2>
                      <div className="mt-2 flex flex-wrap items-center gap-3 text-xs text-muted-foreground">
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, i) => (
                            <svg
                              key={i}
                              className={`size-3.5 ${i < stars ? 'text-brand' : 'text-muted-foreground/25'}`}
                              fill="currentColor"
                              viewBox="0 0 20 20"
                            >
                              <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                            </svg>
                          ))}
                          <span className="ml-0.5">{subject.overallScore.toFixed(1)}</span>
                        </div>
                        <span>
                          <span className="font-medium text-foreground">{subject.recommendPercent}%</span> recommend
                        </span>
                        <span>
                          workload <span className="font-medium text-foreground">{subject.workloadRating.toFixed(1)}</span>
                        </span>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 shrink-0">
                      <Link
                        href={`/subject/${subject.code.toLowerCase()}`}
                        className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:border-[#534AB7] hover:text-[#534AB7] transition-colors"
                      >
                        View subject
                      </Link>
                      <button
                        onClick={() => removeSubject(subject.code)}
                        className="rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:border-red-400 hover:text-red-500 transition-colors"
                      >
                        Remove
                      </button>
                    </div>
                  </div>

                  {/* recent posts */}
                  {recentPosts.length > 0 && (
                    <div className="border-t border-border px-5 py-4 flex flex-col gap-2.5">
                      <p className="text-xs text-muted-foreground mb-1">Recent posts</p>
                      {recentPosts.map((post) => (
                        <div key={post.id} className="flex flex-col gap-1">
                          <div className="flex items-center gap-2">
                            <span className="text-xs font-medium text-foreground">{post.author}</span>
                            <span className="text-xs text-muted-foreground">{post.semester}</span>
                          </div>
                          <p className="text-xs text-foreground/70 leading-relaxed line-clamp-2">
                            {post.content}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )
            })}
          </div>
        )}
      </main>

      <footer className="border-t border-border mt-16">
        <div className="mx-auto max-w-3xl px-4 py-6 text-center">
          <p className="text-xs text-muted-foreground">
            Class-ify · All reviews are anonymous · UniMelb
          </p>
        </div>
      </footer>
    </div>
  )
}
