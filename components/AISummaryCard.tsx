import type { Subject } from '@/data/subjects'
import ExamIntelCard from '@/components/ExamIntelCard'

interface AISummaryCardProps {
  subject: Subject
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="flex flex-col gap-1.5">
      <p className="text-xs font-medium text-brand uppercase tracking-wide">{title}</p>
      <div className="text-sm text-foreground/80 leading-relaxed">{children}</div>
    </div>
  )
}

export default function AISummaryCard({ subject }: AISummaryCardProps) {
  const { aiSummary } = subject

  return (
    <div className="rounded-2xl bg-[#EEEDFE] border border-[#AFA9EC] dark:bg-[#1E1A2E] dark:border-[#3D3570] p-5 md:p-6">
      <div className="flex items-center gap-2 mb-5">
        <div className="flex items-center gap-1.5 rounded-full bg-[#534AB7]/10 border border-[#534AB7]/25 dark:bg-[#534AB7]/20 dark:border-[#534AB7]/40 px-3 py-1">
          <svg
            className="size-3.5 text-brand"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09z"
            />
          </svg>
          <span className="text-xs font-medium text-brand">AI summary</span>
        </div>
        <span className="text-xs text-muted-foreground">
          based on {subject.posts.length} student reviews
        </span>
      </div>

      <div className="flex flex-col gap-5">
        <Section title="Subject overview">{aiSummary.overview}</Section>

        <div className="h-px bg-[#AFA9EC]/30 dark:bg-[#3D3570]/50" />

        <Section title="Lecturer & tutor profiles">
          <div className="flex flex-col gap-3">
            {aiSummary.lecturers.map((lecturer) => (
              <div
                key={lecturer.name}
                className="rounded-xl bg-white border border-[#AFA9EC]/50 dark:bg-[#0F0F0F] dark:border-[#3D3570]/60 px-4 py-3 flex flex-col gap-1.5"
              >
                <p className="text-sm font-medium text-foreground">{lecturer.name}</p>
                <p className="text-sm text-foreground/80 leading-relaxed">
                  {lecturer.background} {lecturer.teachingStyle}
                </p>
                <p className="text-sm text-foreground/60 leading-relaxed italic">
                  {lecturer.sentiment} {lecturer.responsiveness}
                </p>
              </div>
            ))}
          </div>
        </Section>

        <div className="h-px bg-[#AFA9EC]/30 dark:bg-[#3D3570]/50" />

        <Section title="Assessment breakdown">{aiSummary.assessments}</Section>

        <div className="h-px bg-[#AFA9EC]/30 dark:bg-[#3D3570]/50" />

        <div className="flex flex-col gap-1.5">
          <p className="text-xs font-medium text-brand uppercase tracking-wide">Exam intel</p>
          <ExamIntelCard
            examIntel={aiSummary.examIntel}
            examDate={subject.examDate}
            examDebriefPosts={subject.examDebriefPosts}
          />
        </div>

        <div className="h-px bg-[#AFA9EC]/30 dark:bg-[#3D3570]/50" />

        <Section title="Vibe check">
          <div className="border-l-4 border-[#534AB7] pl-4 mt-1">
            <p className="text-base font-medium text-foreground/90 italic leading-relaxed">
              &ldquo;{aiSummary.vibeCheck}&rdquo;
            </p>
          </div>
        </Section>
      </div>
    </div>
  )
}
