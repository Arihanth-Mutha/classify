'use client'

import Link from 'next/link'
import Navbar from '@/components/Navbar'
import { subjects as allSubjects, type Subject, type ExamDifficulty } from '@/data/subjects'
import { useCompare } from '@/hooks/useCompare'
import { useMySubjects } from '@/hooks/useMySubjects'

// ─── Helpers ─────────────────────────────────────────────────────────────────

function getWorkloadInfo(rating: number): { label: string; pill: string } {
  if (rating <= 2) return { label: 'light', pill: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800' }
  if (rating <= 3) return { label: 'moderate', pill: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800' }
  if (rating <= 4) return { label: 'heavy', pill: 'bg-orange-100 text-orange-800 border-orange-200 dark:bg-orange-950 dark:text-orange-300 dark:border-orange-800' }
  return { label: 'very heavy', pill: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800' }
}

function getExamDiffInfo(diff: ExamDifficulty): { label: string; pill: string } {
  if (diff === 'easier') return { label: 'easier than past papers', pill: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300 dark:border-emerald-800' }
  if (diff === 'similar') return { label: 'similar to past papers', pill: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-300 dark:border-amber-800' }
  return { label: 'harder than past papers', pill: 'bg-red-100 text-red-800 border-red-200 dark:bg-red-950 dark:text-red-300 dark:border-red-800' }
}

function getRecommendColor(pct: number): string {
  if (pct >= 80) return 'bg-emerald-500'
  if (pct >= 60) return 'bg-amber-500'
  return 'bg-red-500'
}

function getMostUpvoted(subject: Subject) {
  if (!subject.posts.length) return null
  return subject.posts.reduce((best, p) => (p.upvotes > best.upvotes ? p : best))
}

function getBestIdx(subjects: Subject[], getValue: (s: Subject) => number): number {
  let bestIdx = 0
  subjects.forEach((s, i) => {
    if (getValue(s) > getValue(subjects[bestIdx])) bestIdx = i
  })
  return bestIdx
}

// ─── Cell helpers ─────────────────────────────────────────────────────────────

const CELL_BASE = 'px-5 py-5 border-b border-border'
const HDR_BASE = 'px-4 py-5 border-b border-border flex items-start'
const HIGHLIGHT = 'bg-[#EEEDFE] dark:bg-[#1E1A2E]'
const ROW_ALT = 'bg-muted/10'

function Stars({ score }: { score: number }) {
  const filled = Math.round(score)
  return (
    <div className="flex items-center gap-0.5">
      {Array.from({ length: 5 }).map((_, i) => (
        <svg key={i} className={`size-4 ${i < filled ? 'text-[#534AB7]' : 'text-muted-foreground/25'}`} fill="currentColor" viewBox="0 0 20 20">
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  )
}

function Bar({ pct, colorClass }: { pct: number; colorClass: string }) {
  return (
    <div className="mt-1.5 h-1.5 w-full rounded-full bg-muted overflow-hidden">
      <div className={`h-full rounded-full ${colorClass}`} style={{ width: `${pct}%` }} />
    </div>
  )
}

function Pill({ label, className }: { label: string; className: string }) {
  return (
    <span className={`inline-flex items-center rounded-full border px-2.5 py-0.5 text-xs font-medium ${className}`}>
      {label}
    </span>
  )
}

function RowLabel({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-xs font-medium text-muted-foreground uppercase tracking-wide leading-tight">
      {children}
    </p>
  )
}

// ─── Empty State ──────────────────────────────────────────────────────────────

function EmptyState() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main className="mx-auto max-w-3xl px-4 py-20 text-center">
        <svg className="mx-auto mb-6 size-20 text-muted-foreground/20" fill="none" stroke="currentColor" strokeWidth={1} viewBox="0 0 80 80">
          <rect x="6" y="14" width="30" height="40" rx="4" strokeWidth={1.5} />
          <rect x="20" y="22" width="30" height="40" rx="4" fill="currentColor" fillOpacity={0.05} strokeWidth={1.5} />
          <line x1="14" y1="26" x2="30" y2="26" strokeWidth={1.5} strokeLinecap="round" />
          <line x1="14" y1="32" x2="28" y2="32" strokeWidth={1.5} strokeLinecap="round" />
          <line x1="14" y1="38" x2="32" y2="38" strokeWidth={1.5} strokeLinecap="round" />
        </svg>
        <h1 className="text-xl font-medium text-foreground">Nothing to compare yet</h1>
        <p className="mt-2 text-sm text-muted-foreground max-w-xs mx-auto">
          Add subjects from the home page to start comparing them side by side.
        </p>
        <Link
          href="/"
          className="mt-6 inline-flex items-center gap-2 rounded-full bg-[#534AB7] px-5 py-2.5 text-sm font-medium text-white hover:bg-[#453EA0] transition-colors"
        >
          Browse subjects
        </Link>
      </main>
    </div>
  )
}

// ─── Mobile per-subject card ──────────────────────────────────────────────────

function MobileSubjectCard({ subject, highlights }: { subject: Subject; highlights: Record<string, boolean> }) {
  const { isSaved, addSubject, removeSubject } = useMySubjects()
  const workload = getWorkloadInfo(subject.workloadRating)
  const examDiff = getExamDiffInfo(subject.aiSummary.examIntel.difficultyVsPastPapers)
  const topPost = getMostUpvoted(subject)

  return (
    <div className="rounded-2xl border border-border overflow-hidden">
      {/* Identity */}
      <div className="px-5 py-5 bg-muted/20">
        <p className="text-xs font-medium text-[#534AB7] tracking-wide uppercase">{subject.code}</p>
        <h2 className="mt-0.5 text-base font-medium text-foreground">{subject.name}</h2>
        <div className="mt-2 flex flex-wrap gap-1.5">
          <span className="inline-flex items-center rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
            {subject.faculty}
          </span>
          <span className="inline-flex items-center rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">
            Level {subject.level}
          </span>
        </div>
      </div>

      <div className="divide-y divide-border">
        {/* Rating */}
        <div className={`px-5 py-4 ${highlights.rating ? HIGHLIGHT : ''}`}>
          <p className="text-xs text-muted-foreground mb-2">Overall rating</p>
          <Stars score={subject.overallScore} />
          <p className="mt-1 text-sm font-medium text-foreground">
            {subject.overallScore.toFixed(1)}<span className="text-xs text-muted-foreground font-normal"> / 5</span>
          </p>
          <Bar pct={(subject.overallScore / 5) * 100} colorClass="bg-[#534AB7]" />
        </div>

        {/* Recommend */}
        <div className={`px-5 py-4 ${highlights.recommend ? HIGHLIGHT : ''}`}>
          <p className="text-xs text-muted-foreground mb-2">Recommend</p>
          <p className={`text-2xl font-medium ${subject.recommendPercent >= 80 ? 'text-emerald-600 dark:text-emerald-400' : subject.recommendPercent >= 60 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'}`}>
            {subject.recommendPercent}%
          </p>
          <Bar pct={subject.recommendPercent} colorClass={getRecommendColor(subject.recommendPercent)} />
        </div>

        {/* Workload */}
        <div className={`px-5 py-4 ${highlights.workload ? HIGHLIGHT : ''}`}>
          <p className="text-xs text-muted-foreground mb-2">Workload</p>
          <Pill label={workload.label} className={workload.pill} />
          <p className="mt-1.5 text-xs text-muted-foreground">{subject.workloadRating.toFixed(1)} / 5</p>
        </div>

        {/* Exam difficulty */}
        <div className="px-5 py-4">
          <p className="text-xs text-muted-foreground mb-2">Exam difficulty</p>
          <Pill label={examDiff.label} className={examDiff.pill} />
        </div>

        {/* Vibe check */}
        <div className="px-5 py-4 bg-[#EEEDFE]/40 dark:bg-[#1E1A2E]/40">
          <p className="text-xs text-muted-foreground mb-2">Vibe check</p>
          <p className="text-sm italic text-foreground/80 leading-relaxed">
            &ldquo;{subject.aiSummary.vibeCheck}&rdquo;
          </p>
        </div>

        {/* Discussion */}
        <div className="px-5 py-4">
          <p className="text-xs text-muted-foreground mb-2">Discussion</p>
          <p className="text-sm font-medium text-foreground">{subject.posts.length} posts</p>
          {topPost && (
            <blockquote className="mt-2 border-l-2 border-[#534AB7]/40 pl-3 text-xs text-muted-foreground italic leading-relaxed line-clamp-2">
              {topPost.content}
            </blockquote>
          )}
        </div>

        {/* Actions */}
        <div className="px-5 py-4 flex items-center gap-2 flex-wrap">
          <Link
            href={`/subject/${subject.code.toLowerCase()}`}
            className="rounded-full bg-[#534AB7] px-4 py-1.5 text-xs font-medium text-white hover:bg-[#453EA0] transition-colors"
          >
            View full subject
          </Link>
          <button
            onClick={() => isSaved(subject.code) ? removeSubject(subject.code) : addSubject(subject.code)}
            className="rounded-full border border-border px-4 py-1.5 text-xs font-medium text-muted-foreground hover:border-[#534AB7] hover:text-[#534AB7] transition-colors"
          >
            {isSaved(subject.code) ? 'Saved' : 'Add to my subjects'}
          </button>
        </div>
      </div>
    </div>
  )
}

// ─── Main page ────────────────────────────────────────────────────────────────

export default function ComparePage() {
  const { compareCodes, hydrated, clearCompare } = useCompare()
  const { isSaved, addSubject, removeSubject } = useMySubjects()

  const subjects = compareCodes
    .map((code) => allSubjects.find((s) => s.code === code))
    .filter(Boolean) as Subject[]

  if (!hydrated) {
    return (
      <div className="min-h-screen bg-background">
        <Navbar />
        <main className="mx-auto max-w-5xl px-4 py-10">
          <div className="flex flex-col gap-4">
            {[1, 2].map((i) => <div key={i} className="h-24 rounded-xl bg-muted animate-pulse" />)}
          </div>
        </main>
      </div>
    )
  }

  if (subjects.length === 0) return <EmptyState />

  const n = subjects.length
  const gridCols = `180px repeat(${n}, 1fr)`

  // Highlight indices
  const bestRatingIdx = getBestIdx(subjects, (s) => s.overallScore)
  const bestRecommendIdx = getBestIdx(subjects, (s) => s.recommendPercent)
  // Best workload = lowest rating
  const bestWorkloadIdx = getBestIdx(subjects, (s) => -s.workloadRating)

  const highlights = subjects.map((_, i) => ({
    rating: i === bestRatingIdx,
    recommend: i === bestRecommendIdx,
    workload: i === bestWorkloadIdx,
  }))

  const subjectHighlights = subjects.reduce<Record<string, Record<string, boolean>>>((acc, s, i) => {
    acc[s.code] = { rating: highlights[i].rating, recommend: highlights[i].recommend, workload: highlights[i].workload }
    return acc
  }, {})

  // Shared cell bg for a given row and column index
  function cellBg(rowAlt: boolean, colIdx: number) {
    if (highlights[colIdx]?.rating || highlights[colIdx]?.recommend || highlights[colIdx]?.workload) return ''
    return rowAlt ? ROW_ALT : ''
  }

  function highlightCell(rowAlt: boolean, isHighlighted: boolean) {
    if (isHighlighted) return HIGHLIGHT
    return rowAlt ? ROW_ALT : ''
  }

  return (
    <div className="min-h-screen bg-background pb-28">
      <Navbar />

      <main className="mx-auto max-w-5xl px-4 py-8">
        {/* Header */}
        <div className="flex items-center justify-between gap-3 mb-8 flex-wrap">
          <div className="flex items-center gap-3">
            <Link
              href="/"
              className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors"
            >
              <svg className="size-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
              </svg>
              All subjects
            </Link>
            <span className="text-muted-foreground/40">·</span>
            <div>
              <h1 className="text-xl font-medium text-foreground">Compare subjects</h1>
              <p className="text-xs text-muted-foreground mt-0.5">
                Comparing {n} subject{n !== 1 ? 's' : ''} side by side
              </p>
            </div>
          </div>
          <button
            onClick={clearCompare}
            className="text-xs text-muted-foreground hover:text-foreground transition-colors border border-border rounded-full px-3 py-1.5 hover:border-foreground/30"
          >
            Clear all
          </button>
        </div>

        {/* ── Desktop table ───────────────────────────────────────────────── */}
        <div className="hidden md:block rounded-2xl border border-border overflow-hidden">
          <div className="grid" style={{ gridTemplateColumns: gridCols }}>

            {/* ── Row: Subject identity ── */}
            <div className="px-4 py-5 bg-muted/25 border-b border-border flex items-center">
              <RowLabel>Subject</RowLabel>
            </div>
            {subjects.map((s) => (
              <div key={s.code} className="px-5 py-5 bg-muted/10 border-b border-l border-border flex flex-col gap-2">
                <p className="text-xs font-medium text-[#534AB7] tracking-wide uppercase">{s.code}</p>
                <p className="text-sm font-medium text-foreground leading-snug">{s.name}</p>
                <div className="flex flex-wrap gap-1.5">
                  <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">{s.faculty}</span>
                  <span className="rounded-full border border-border px-2 py-0.5 text-xs text-muted-foreground">Level {s.level}</span>
                </div>
              </div>
            ))}

            {/* ── Row: Rating ── */}
            <div className={`${HDR_BASE} bg-muted/25`}>
              <RowLabel>Overall rating</RowLabel>
            </div>
            {subjects.map((s, i) => (
              <div key={s.code} className={`${CELL_BASE} border-l flex flex-col gap-1.5 ${highlightCell(false, highlights[i].rating)}`}>
                <Stars score={s.overallScore} />
                <p className="text-sm font-medium text-foreground">
                  {s.overallScore.toFixed(1)}<span className="text-xs text-muted-foreground font-normal"> / 5</span>
                </p>
                <Bar pct={(s.overallScore / 5) * 100} colorClass="bg-[#534AB7]" />
              </div>
            ))}

            {/* ── Row: Recommend % ── */}
            <div className={`${HDR_BASE} ${ROW_ALT} bg-muted/15`}>
              <RowLabel>Recommend</RowLabel>
            </div>
            {subjects.map((s, i) => (
              <div key={s.code} className={`${CELL_BASE} border-l flex flex-col gap-1 ${highlightCell(true, highlights[i].recommend)}`}>
                <p className={`text-2xl font-medium ${s.recommendPercent >= 80 ? 'text-emerald-600 dark:text-emerald-400' : s.recommendPercent >= 60 ? 'text-amber-600 dark:text-amber-400' : 'text-red-600 dark:text-red-400'}`}>
                  {s.recommendPercent}%
                </p>
                <Bar pct={s.recommendPercent} colorClass={getRecommendColor(s.recommendPercent)} />
              </div>
            ))}

            {/* ── Row: Workload ── */}
            <div className={`${HDR_BASE} bg-muted/25`}>
              <RowLabel>Workload</RowLabel>
            </div>
            {subjects.map((s, i) => {
              const w = getWorkloadInfo(s.workloadRating)
              return (
                <div key={s.code} className={`${CELL_BASE} border-l flex flex-col gap-1.5 ${highlightCell(false, highlights[i].workload)}`}>
                  <Pill label={w.label} className={w.pill} />
                  <p className="text-xs text-muted-foreground">{s.workloadRating.toFixed(1)} / 5</p>
                </div>
              )
            })}

            {/* ── Row: Exam difficulty ── */}
            <div className={`${HDR_BASE} ${ROW_ALT} bg-muted/15`}>
              <RowLabel>Exam difficulty</RowLabel>
            </div>
            {subjects.map((s) => {
              const d = getExamDiffInfo(s.aiSummary.examIntel.difficultyVsPastPapers)
              return (
                <div key={s.code} className={`${CELL_BASE} border-l ${ROW_ALT}`}>
                  <Pill label={d.label} className={d.pill} />
                </div>
              )
            })}

            {/* ── Row: Vibe check ── */}
            <div className="px-4 py-5 border-b border-border bg-[#EEEDFE]/50 dark:bg-[#1E1A2E]/50 flex items-start">
              <RowLabel>Vibe check ✦</RowLabel>
            </div>
            {subjects.map((s) => (
              <div key={s.code} className="px-5 py-5 border-b border-l border-border bg-[#EEEDFE]/30 dark:bg-[#1E1A2E]/30">
                <p className="text-sm italic text-foreground/80 leading-relaxed">
                  &ldquo;{s.aiSummary.vibeCheck}&rdquo;
                </p>
              </div>
            ))}

            {/* ── Row: Assessment breakdown ── */}
            <div className={`${HDR_BASE} bg-muted/25`}>
              <RowLabel>Assessments</RowLabel>
            </div>
            {subjects.map((s) => (
              <div key={s.code} className={`${CELL_BASE} border-l`}>
                <p className="text-xs text-foreground/70 leading-relaxed">{s.aiSummary.assessments}</p>
              </div>
            ))}

            {/* ── Row: Exam intel summary ── */}
            <div className={`${HDR_BASE} ${ROW_ALT} bg-muted/15`}>
              <RowLabel>Exam intel</RowLabel>
            </div>
            {subjects.map((s) => {
              const diff = getExamDiffInfo(s.aiSummary.examIntel.difficultyVsPastPapers)
              return (
                <div key={s.code} className={`${CELL_BASE} border-l ${ROW_ALT} flex flex-col gap-2`}>
                  <Pill label={diff.label} className={diff.pill} />
                  <ul className="flex flex-col gap-1">
                    {s.aiSummary.examIntel.formatNotes.slice(0, 2).map((note, i) => (
                      <li key={i} className="flex items-start gap-1.5 text-xs text-foreground/70 leading-relaxed">
                        <span className="mt-1.5 size-1 rounded-full bg-muted-foreground/50 shrink-0" />
                        {note}
                      </li>
                    ))}
                  </ul>
                </div>
              )
            })}

            {/* ── Row: Lecturers ── */}
            <div className={`${HDR_BASE} bg-muted/25`}>
              <RowLabel>Lecturers</RowLabel>
            </div>
            {subjects.map((s) => (
              <div key={s.code} className={`${CELL_BASE} border-l flex flex-col gap-3`}>
                {s.aiSummary.lecturers.map((l) => (
                  <div key={l.name}>
                    <p className="text-xs font-medium text-foreground">{l.name}</p>
                    <p className="mt-0.5 text-xs text-muted-foreground leading-relaxed line-clamp-2">
                      {l.teachingStyle}
                    </p>
                    <p className="mt-1 text-xs text-foreground/60 leading-relaxed line-clamp-1 italic">
                      {l.responsiveness}
                    </p>
                  </div>
                ))}
              </div>
            ))}

            {/* ── Row: Discussion activity ── */}
            <div className={`${HDR_BASE} ${ROW_ALT} bg-muted/15`}>
              <RowLabel>Discussion</RowLabel>
            </div>
            {subjects.map((s) => {
              const top = getMostUpvoted(s)
              const recent = s.posts[0]?.semester ?? '—'
              return (
                <div key={s.code} className={`${CELL_BASE} border-l ${ROW_ALT} flex flex-col gap-2`}>
                  <p className="text-sm font-medium text-foreground">{s.posts.length} posts</p>
                  <p className="text-xs text-muted-foreground">Most recent: {recent}</p>
                  {top && (
                    <blockquote className="border-l-2 border-[#534AB7]/40 pl-2.5 text-xs text-muted-foreground italic leading-relaxed line-clamp-3">
                      {top.content}
                    </blockquote>
                  )}
                </div>
              )
            })}

            {/* ── Row: Actions ── */}
            <div className="px-4 py-5 bg-muted/25 flex items-center">
              <RowLabel>Actions</RowLabel>
            </div>
            {subjects.map((s) => (
              <div key={s.code} className="px-5 py-5 border-l border-border bg-muted/25 flex flex-col gap-2">
                <Link
                  href={`/subject/${s.code.toLowerCase()}`}
                  className="inline-flex items-center justify-center rounded-full bg-[#534AB7] px-4 py-2 text-xs font-medium text-white hover:bg-[#453EA0] transition-colors"
                >
                  View full subject
                </Link>
                <button
                  onClick={() => isSaved(s.code) ? removeSubject(s.code) : addSubject(s.code)}
                  className="inline-flex items-center justify-center rounded-full border border-border px-4 py-2 text-xs font-medium text-muted-foreground hover:border-[#534AB7] hover:text-[#534AB7] transition-colors"
                >
                  {isSaved(s.code) ? 'Saved' : 'Add to my subjects'}
                </button>
              </div>
            ))}

          </div>
        </div>

        {/* ── Mobile stacked view ──────────────────────────────────────────── */}
        <div className="md:hidden flex flex-col gap-6">
          {subjects.map((s) => (
            <MobileSubjectCard
              key={s.code}
              subject={s}
              highlights={subjectHighlights[s.code]}
            />
          ))}
        </div>

      </main>

      <footer className="border-t border-border mt-10">
        <div className="mx-auto max-w-5xl px-4 py-6 text-center">
          <p className="text-xs text-muted-foreground">
            Class-ify · All reviews are anonymous · UniMelb
          </p>
        </div>
      </footer>
    </div>
  )
}
