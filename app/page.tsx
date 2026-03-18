'use client'

import { useState } from 'react'
import Navbar from '@/components/Navbar'
import SubjectCard from '@/components/SubjectCard'
import { Input } from '@/components/ui/input'
import { subjects, FACULTIES } from '@/data/subjects'

export default function Home() {
  const [query, setQuery] = useState('')

  const normalised = query.toLowerCase().trim()
  const filtered = normalised
    ? subjects.filter(
        (s) =>
          s.code.toLowerCase().includes(normalised) ||
          s.name.toLowerCase().includes(normalised) ||
          s.faculty.toLowerCase().includes(normalised)
      )
    : subjects

  const activeFaculties = FACULTIES.filter((faculty) =>
    filtered.some((s) => s.faculty === faculty)
  )

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* hero */}
      <section className="border-b border-border bg-brand-light dark:bg-[#1E1A2E]">
        <div className="mx-auto max-w-5xl px-4 py-10 md:py-14">
          <h1 className="text-2xl md:text-3xl font-medium text-foreground leading-tight">
            Find your subject,{' '}
            <span className="text-brand">hear the honest truth.</span>
          </h1>
          <p className="mt-2 text-sm text-muted-foreground max-w-md">
            Anonymous reviews, AI summaries, and real student experiences for UniMelb subjects.
          </p>

          <div className="mt-6 max-w-md relative">
            <svg
              className="absolute left-3.5 top-1/2 -translate-y-1/2 size-4 text-muted-foreground pointer-events-none"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
              />
            </svg>
            <Input
              type="search"
              placeholder="Search by subject code or name…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              className="pl-9 bg-background focus-visible:ring-brand/40 focus-visible:border-brand"
            />
          </div>
        </div>
      </section>

      {/* subject directory */}
      <main className="mx-auto max-w-5xl px-4 py-10">
        {query && filtered.length === 0 ? (
          <div className="py-20 text-center">
            <p className="text-base font-medium text-foreground">No subjects found</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Try a different search — we&rsquo;ll have more subjects soon.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-10">
            {activeFaculties.map((faculty) => {
              const facultySubjects = filtered.filter((s) => s.faculty === faculty)
              return (
                <section key={faculty}>
                  <div className="flex items-center gap-3 mb-4">
                    <h2 className="text-sm font-medium text-foreground">{faculty}</h2>
                    <div className="flex-1 h-px bg-border" />
                    <span className="text-xs text-muted-foreground">
                      {facultySubjects.length} subject{facultySubjects.length !== 1 ? 's' : ''}
                    </span>
                  </div>
                  <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
                    {facultySubjects.map((subject) => (
                      <SubjectCard key={subject.code} subject={subject} />
                    ))}
                  </div>
                </section>
              )
            })}
          </div>
        )}
      </main>

      <footer className="border-t border-border mt-10">
        <div className="mx-auto max-w-5xl px-4 py-6 text-center">
          <p className="text-xs text-muted-foreground">
            Class-ify · Student reviews for UniMelb · All reviews are anonymous
          </p>
        </div>
      </footer>
    </div>
  )
}
