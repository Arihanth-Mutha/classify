# Class-ify

A student-only discussion platform for UniMelb students to discuss
subjects, assessments, lecturers and exams honestly and anonymously.

## Stack

- Next.js 14 App Router
- TypeScript
- Tailwind CSS
- shadcn/ui for components
- Supabase for auth and database (not in MVP — coming later)
- Claude API for AI summaries (simulated in MVP with hardcoded data)

## Current phase

MVP prototype — no auth, no backend, all data hardcoded.
Focus is on getting the UI and UX right before adding a backend.

## Brand

- App name: Class-ify
- Primary colour: #534AB7 (purple)
- Clean, minimal, premium student-friendly UI
- Mobile first — many users will be on their phones

## Pages

1. Home — subject directory by faculty, search bar, clean card grid
2. Subject page — AI summary card + discussion threads + anonymous posting

## AI Summary Card

The hero feature. Light purple background, labelled "AI summary".
Must include these sections, each 2-3 sentences max:

- Subject overview (overall score, workload, exam difficulty, recommend %)
- Lecturer & tutor profiles (name, background, teaching style,
  sentiment summary, responsiveness)
- Assessment breakdown (weightings, difficulty, recurring feedback)
- Exam intel (difficulty vs past papers, tips, format)
- Vibe check (one punchy sentence)

## Discussion threads

- Tag categories: general, assessment, lecturer, exam, workload
- Anonymous pseudonym display (e.g. anonymous_wombat)
- Upvoting
- Semester/year tag on each post
- Post form with tag selection and text input

## Design rules

- No login screens in MVP
- No modals
- Mobile responsive
- Sentence case everywhere, never title case
- Two font weights only: 400 regular, 500 medium
- Generous whitespace
- Subtle hover states on all interactive elements
- Empty states should feel encouraging not broken
- Loading skeletons not spinners

## Data

Use realistic hardcoded UniMelb data across three faculties:

- Science & Engineering: COMP, SWEN, MAST subjects
- Business & Economics: ECON, FNCE subjects
- Arts & Humanities: PHIL, HIST subjects

Each subject needs realistic:

- Subject code and name
- Lecturer name and background
- AI summary with all five sections
- 4-6 seeded discussion posts across different tags
- Realistic upvote counts

## Code standards

- TypeScript strict mode
- Components in /components folder
- Page data in /data folder as typed TypeScript objects
- Tailwind for all styling, no inline styles, no CSS modules
- shadcn/ui for buttons, inputs, badges, cards
- Clean readable code — this is a portfolio project

```

---

**Step 4 — Install shadcn/ui**

In the terminal run:
```

npx shadcn@latest init

```

When it asks questions:
- Style: **Default**
- Base color: **Slate**
- CSS variables: **Yes**

Then install the components you'll need:
```

npx shadcn@latest add button card input badge textarea separator
