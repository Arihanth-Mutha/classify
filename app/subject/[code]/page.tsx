import { notFound } from 'next/navigation'
import Link from 'next/link'
import Navbar from '@/components/Navbar'
import AISummaryCard from '@/components/AISummaryCard'
import DiscussionSection from '@/components/DiscussionSection'
import ExamDebriefSection from '@/components/ExamDebriefSection'
import ShareButton from '@/components/ShareButton'
import { Badge } from '@/components/ui/badge'
import { getSubjectByCode, subjects } from '@/data/subjects'

interface Props {
  params: Promise<{ code: string }>
}

export function generateStaticParams() {
  return subjects.map((s) => ({ code: s.code.toLowerCase() }))
}

export default async function SubjectPage({ params }: Props) {
  const { code } = await params
  const subject = getSubjectByCode(code)

  if (!subject) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <main className="mx-auto max-w-3xl px-4 py-8">
        {/* breadcrumb */}
        <Link
          href="/"
          className="inline-flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors mb-6"
        >
          <svg
            className="size-3.5"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M10.5 19.5L3 12m0 0l7.5-7.5M3 12h18" />
          </svg>
          All subjects
        </Link>

        {/* subject header */}
        <div className="flex flex-col gap-3 mb-7">
          <div className="flex items-start justify-between gap-3 flex-wrap">
            <div>
              <div className="flex items-center gap-2 flex-wrap">
                <span className="text-xs font-medium text-brand tracking-wide uppercase">
                  {subject.code}
                </span>
                <Badge variant="outline" className="text-xs text-muted-foreground">
                  {subject.creditPoints} credit points
                </Badge>
                <Badge variant="outline" className="text-xs text-muted-foreground">
                  Level {subject.level}
                </Badge>
              </div>
              <h1 className="mt-1 text-xl md:text-2xl font-medium text-foreground">
                {subject.name}
              </h1>
              <p className="mt-0.5 text-sm text-muted-foreground">{subject.faculty}</p>
            </div>
            <ShareButton subject={subject} />
          </div>

          {/* stats row */}
          <div className="flex flex-wrap items-center gap-4 pt-1">
            <div className="flex items-center gap-1.5">
              {Array.from({ length: 5 }).map((_, i) => (
                <svg
                  key={i}
                  className={`size-4 ${i < Math.round(subject.overallScore) ? 'text-brand' : 'text-muted-foreground/25'}`}
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              ))}
              <span className="text-sm font-medium text-foreground ml-1">
                {subject.overallScore.toFixed(1)}
              </span>
              <span className="text-xs text-muted-foreground">/ 5</span>
            </div>

            <div className="h-4 w-px bg-border" />

            <div className="text-sm text-muted-foreground">
              <span className="font-medium text-foreground">{subject.recommendPercent}%</span>{' '}
              recommend
            </div>

            <div className="h-4 w-px bg-border" />

            <div className="text-sm text-muted-foreground">
              workload{' '}
              <span className="font-medium text-foreground">{subject.workloadRating.toFixed(1)}</span>
              <span className="text-xs text-muted-foreground"> / 5</span>
            </div>
          </div>
        </div>

        {/* AI summary — reads from subject.posts only */}
        <AISummaryCard subject={subject} />

        {/* exam debrief — separate from regular posts, not in AI summary */}
        {subject.examDate && (
          <div className="mt-10">
            <ExamDebriefSection
              examDate={subject.examDate}
              initialPosts={subject.examDebriefPosts}
            />
          </div>
        )}

        {/* regular discussion */}
        <div className="mt-10">
          <DiscussionSection initialPosts={subject.posts} examDate={subject.examDate} />
        </div>
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
