export type TagType = 'general' | 'assessment' | 'lecturer' | 'exam' | 'workload'

export interface Post {
  id: string
  author: string
  tag: TagType
  content: string
  upvotes: number
  semester: string
}

export interface LecturerProfile {
  name: string
  background: string
  teachingStyle: string
  sentiment: string
  responsiveness: string
}

export interface AISummary {
  overview: string
  lecturers: LecturerProfile[]
  assessments: string
  examIntel: string
  vibeCheck: string
}

export interface Subject {
  code: string
  name: string
  faculty: string
  creditPoints: number
  level: number
  overallScore: number
  workloadRating: number
  recommendPercent: number
  aiSummary: AISummary
  posts: Post[]
}

export const FACULTIES = [
  'Science & Engineering',
  'Business & Economics',
  'Arts & Humanities',
] as const

export type Faculty = (typeof FACULTIES)[number]

export const subjects: Subject[] = [
  // ─── Science & Engineering ───────────────────────────────────────────────
  {
    code: 'COMP30026',
    name: 'Models of Computation',
    faculty: 'Science & Engineering',
    creditPoints: 12.5,
    level: 3,
    overallScore: 4.3,
    workloadRating: 3.8,
    recommendPercent: 91,
    aiSummary: {
      overview:
        'COMP30026 is a rigorous third-year theory subject covering formal languages, automata, computability, and computational complexity. It is one of the most mathematically demanding subjects in the CS major — expect 10–12 hours per week. Highly recommended for students who want to understand the theoretical limits of computing, but not a subject to take lightly.',
      lecturers: [
        {
          name: 'Prof. Tim Baldwin',
          background:
            'Tim is a Professor of Natural Language Processing in the School of Computing and Information Systems, with a research background in computational linguistics.',
          teachingStyle:
            'Lectures are highly structured and well-paced, with plenty of worked examples. Tim encourages questions and often goes off-script to explain the "why" behind concepts rather than just the syntax.',
          sentiment:
            'Very positively received — students consistently praise his clarity and genuine enthusiasm for teaching beginners. He is one of the most mentioned names in positive reviews.',
          responsiveness:
            'Responds to Ed Discussion posts promptly, usually within a day. Office hours are well-attended and he takes time with each student.',
        },
        {
          name: 'Dr. Ariel Liebman',
          background:
            'Ariel has a background in energy systems modelling and applies computational thinking to real-world problems, which makes lectures feel relevant and applied.',
          teachingStyle:
            'More conversational than Tim, often uses live coding to demonstrate concepts. Can move quickly in workshops, so keep up with the recording.',
          sentiment:
            'Largely positive. Students appreciate the real-world examples, though some find the pacing in workshops inconsistent.',
          responsiveness: 'Active on Ed Discussion, typically responds within 24–48 hours.',
        },
      ],
      assessments:
        'Three programming assignments worth 20% each and a final written exam worth 40%. Assignments have clear specs and autograder feedback. Recurring feedback: start early, autograder edge cases trip up last-minute submitters. The third assignment is notably harder than the first two — budget extra time.',
      examIntel:
        'The exam is 2 hours, closed book, and covers both theory (tracing, complexity) and practical Python questions. It is harder than past papers suggest — recent exams have introduced more debugging and code-explanation questions. Tip: practice writing code by hand, not just running it.',
      vibeCheck:
        'Everyone is in the same boat, the tutors actually care, and debugging your first program feels genuinely rewarding.',
    },
    posts: [
      {
        id: 'comp10001-1',
        author: 'anonymous_wombat',
        tag: 'assessment',
        content:
          'Just finished assignment 3 and the autograder edge cases are brutal. Make sure you test with empty lists and single-element inputs — those tripped me up. Start early, seriously.',
        upvotes: 47,
        semester: 'Sem 2, 2024',
      },
      {
        id: 'comp10001-2',
        author: 'anonymous_platypus',
        tag: 'lecturer',
        content:
          "Tim Baldwin is genuinely one of the best lecturers I've had at uni. He explains things three different ways until everyone gets it, and never makes you feel dumb for asking a basic question.",
        upvotes: 89,
        semester: 'Sem 1, 2024',
      },
      {
        id: 'comp10001-3',
        author: 'anonymous_quokka',
        tag: 'exam',
        content:
          'The exam was harder than past papers. They added code-reading questions where you trace through a function and predict the output. Definitely practice that style of question — worth it.',
        upvotes: 63,
        semester: 'Sem 2, 2024',
      },
      {
        id: 'comp10001-4',
        author: 'anonymous_bilby',
        tag: 'workload',
        content:
          "About 8–10 hours a week for me. Workshops are actually useful if you engage — don't just copy the solutions. The consistent workload is manageable if you don't fall behind.",
        upvotes: 31,
        semester: 'Sem 1, 2024',
      },
      {
        id: 'comp10001-5',
        author: 'anonymous_echidna',
        tag: 'general',
        content:
          "Took this as a breadth subject for my commerce degree and absolutely loved it. Don't be put off by the computer science label — it's very approachable and the skills transfer everywhere.",
        upvotes: 55,
        semester: 'Sem 2, 2023',
      },
    ],
  },

  {
    code: 'SWEN30006',
    name: 'Software Modelling and Design',
    faculty: 'Science & Engineering',
    creditPoints: 12.5,
    level: 3,
    overallScore: 3.9,
    workloadRating: 4.6,
    recommendPercent: 78,
    aiSummary: {
      overview:
        'SWEN30006 is a third-year capstone-style subject focused on software design patterns, architectural styles, UML modelling, and applying them to a substantial group project. The workload is demanding — expect 12–15 hours per week, especially near delivery milestones. Most students say it is the subject that finally made their code feel professional.',
      lecturers: [
        {
          name: 'Dr. Justine Sherrill',
          background:
            'Justine has a background in software engineering education, with expertise in game engine design, which directly informs the project structure.',
          teachingStyle:
            'Concise and technically precise in lectures. Focuses on design principles over syntax. Tends to cold-call students in workshops, so come prepared.',
          sentiment:
            'Mixed but trending positive. Some students find her expectations high without sufficient scaffolding early in semester, but most acknowledge she prepares you well for industry.',
          responsiveness:
            'Replies to Ed Discussion posts within 48 hours. Office hours can be busy near project deadlines.',
        },
      ],
      assessments:
        'Three increasingly complex Java projects (20%, 25%, 30%) plus a final written exam (25%). Projects involve building a game engine from scratch using an internal framework called Bagel. Recurring feedback: read the spec thoroughly before writing a single line of code. Project 3 is a significant jump in difficulty.',
      examIntel:
        'Written exam covers OOP theory, UML diagrams, design patterns, and Java syntax. Harder than expected — the UML questions catch many students off guard. Past papers are useful but recent exams have focused more on design pattern application than pure Java knowledge. Open to notes? No, it is closed book.',
      vibeCheck:
        "Genuinely hard, occasionally stressful, but you'll finish the semester feeling like a real software developer.",
    },
    posts: [
      {
        id: 'swen20003-1',
        author: 'anonymous_koala',
        tag: 'assessment',
        content:
          'Project 3 nearly broke me. The specification is 20+ pages long. My top advice: create a UML diagram before writing any code. The whole thing clicked once I had the class hierarchy planned out.',
        upvotes: 112,
        semester: 'Sem 1, 2024',
      },
      {
        id: 'swen20003-2',
        author: 'anonymous_dingo',
        tag: 'workload',
        content:
          'Easily 15–20 hours a week near deadlines. The subject itself is fine but the time commitment is real. Make sure your other subjects are light if you take this in the same semester.',
        upvotes: 74,
        semester: 'Sem 2, 2024',
      },
      {
        id: 'swen20003-3',
        author: 'anonymous_bandicoot',
        tag: 'lecturer',
        content:
          "Justine's lectures are dense but valuable. Go through the slides again after the lecture with the recording paused — she covers a lot of ground fast. Workshop attendance is genuinely worth it.",
        upvotes: 38,
        semester: 'Sem 1, 2024',
      },
      {
        id: 'swen20003-4',
        author: 'anonymous_possum',
        tag: 'exam',
        content:
          'UML questions are no joke. I underestimated them completely. Practice drawing class diagrams by hand — they will ask you to draw one in the exam and muscle memory helps.',
        upvotes: 67,
        semester: 'Sem 2, 2023',
      },
      {
        id: 'swen20003-5',
        author: 'anonymous_wallaby',
        tag: 'general',
        content:
          'Best preparation for internships out of any second-year subject. My interviewer specifically asked about SOLID principles and I could actually answer because of this subject.',
        upvotes: 93,
        semester: 'Sem 1, 2024',
      },
      {
        id: 'swen20003-6',
        author: 'anonymous_quoll',
        tag: 'assessment',
        content:
          'Bagel framework documentation is sparse. Join the Discord for the subject and ask questions there — the community is surprisingly helpful and often faster than Ed Discussion.',
        upvotes: 51,
        semester: 'Sem 2, 2024',
      },
    ],
  },

  {
    code: 'MAST30021',
    name: 'Complex Analysis',
    faculty: 'Science & Engineering',
    creditPoints: 12.5,
    level: 3,
    overallScore: 3.6,
    workloadRating: 4.2,
    recommendPercent: 71,
    aiSummary: {
      overview:
        'MAST30021 is a beautiful and challenging third-year pure maths subject covering complex differentiation, analytic functions, Cauchy\'s theorem, and contour integration. It is considered one of the most elegant subjects in the maths major but also one of the hardest — expect 12+ hours per week. Students who enjoy rigorous proof-based mathematics tend to love it.',
      lecturers: [
        {
          name: 'Dr. Christine Mangelsdorf',
          background:
            'Christine is a senior lecturer in the School of Mathematics and Statistics, with decades of experience teaching foundational calculus subjects. She has won multiple teaching awards.',
          teachingStyle:
            'Methodical and extremely thorough. Goes through every step in proofs and never skips working. Lectures can feel slow for students with strong maths backgrounds but are excellent for those still building confidence.',
          sentiment:
            'Highly positive. Widely regarded as the clearest maths lecturer in the subject. Students consistently say she made hard content accessible.',
          responsiveness:
            'Holds regular consultation hours and responds quickly to student concerns. Ed Discussion is monitored by tutors but Christine also personally replies to complex questions.',
        },
      ],
      assessments:
        'Three written assignments (30% total), a mid-semester test (20%), and a final exam (50%). Assignments require full working — marks are deducted for correct answers without justification. Recurring feedback: show all working, even for steps that seem obvious.',
      examIntel:
        'Three-hour exam, closed book. Covers all topics but consistently heaviest on integration techniques, ODEs, and series convergence. Harder than most past papers; the 2023 exam introduced more applied word problems. Tips: memorise the key integration identities and practice Taylor series expansions.',
      vibeCheck:
        "If you survived, you are a different person — tougher and more analytically sharp than when you started.",
    },
    posts: [
      {
        id: 'mast10006-1',
        author: 'anonymous_numbat',
        tag: 'exam',
        content:
          'Spent two weeks solely on past papers and it paid off. The exam is long — time management is critical. Do not spend more than 12 minutes on any single question. Skip and come back.',
        upvotes: 81,
        semester: 'Sem 1, 2024',
      },
      {
        id: 'mast10006-2',
        author: 'anonymous_kookaburra',
        tag: 'lecturer',
        content:
          'Christine is an absolute legend. Her lecture notes are works of art — she writes every step clearly and the logic always flows. Go to her consultation hours if you are struggling.',
        upvotes: 104,
        semester: 'Sem 2, 2024',
      },
      {
        id: 'mast10006-3',
        author: 'anonymous_cassowary',
        tag: 'assessment',
        content:
          'Lost 4 marks on assignment 1 for not showing enough working. The answer was right but I jumped steps. Show every single line of working, no matter how obvious it seems.',
        upvotes: 59,
        semester: 'Sem 1, 2024',
      },
      {
        id: 'mast10006-4',
        author: 'anonymous_wombat',
        tag: 'workload',
        content:
          'About 12 hours a week for me and I felt okay keeping up. If you missed a concept though, it snowballs fast — the topics build heavily on each other. Do not let yourself fall behind.',
        upvotes: 44,
        semester: 'Sem 2, 2023',
      },
      {
        id: 'mast10006-5',
        author: 'anonymous_bilby',
        tag: 'general',
        content:
          "The textbook is optional but actually useful. I did not bother buying it and relied on lecture notes alone — that worked fine. Khan Academy videos are a great free supplement for ODEs.",
        upvotes: 36,
        semester: 'Sem 1, 2024',
      },
    ],
  },

  // ─── Business & Economics ─────────────────────────────────────────────────
  {
    code: 'ECON20001',
    name: 'Intermediate Macroeconomics',
    faculty: 'Business & Economics',
    creditPoints: 12.5,
    level: 2,
    overallScore: 3.8,
    workloadRating: 3.2,
    recommendPercent: 80,
    aiSummary: {
      overview:
        'ECON20001 is a second-year macroeconomics subject that goes well beyond the introductory course — expect rigorous IS-LM and AD-AS model analysis, open economy dynamics, and formal mathematical derivations. The workload is moderate-heavy and the exam is challenging. Broadly recommended for students serious about economics or policy.',
      lecturers: [
        {
          name: 'Prof. Guay Lim',
          background:
            'Guay is a Professor at the Melbourne Institute with extensive experience in applied macroeconometrics and policy analysis for Australian government bodies.',
          teachingStyle:
            'Uses a lot of real-world policy examples — RBA decisions, federal budget responses — which makes the abstract models land better. Lectures are well-structured with clear signposting.',
          sentiment:
            'Generally positive. Students appreciate the applied approach, though some find the theoretical sections of lectures dense.',
          responsiveness: 'Moderate on Ed Discussion; tutors are the primary point of contact for most queries.',
        },
        {
          name: 'Dr. Sam Henly',
          background:
            'Sam is a teaching-focused economist with a background in labour economics and public policy. He runs the majority of tutorials.',
          teachingStyle:
            'Interactive tutorial style — poses real policy questions and leads discussion before revealing the economic answer. Excellent at explaining why models make the assumptions they do.',
          sentiment:
            'Very popular among students. Commonly cited as the reason tutorials are worth attending.',
          responsiveness: 'Very responsive — usually replies within a few hours on Ed Discussion.',
        },
      ],
      assessments:
        'Two written assignments (20% each), tutorial participation (10%), and a final exam (50%). Assignments require applying models to real data and current events. Recurring feedback: use diagrams to support your written analysis — markers reward visual model application.',
      examIntel:
        'Two hours, open notes. Yes, open notes — but do not let that fool you into not preparing. Questions require model application and diagram drawing under time pressure. Past papers are very representative. Focus on IS-LM model, Keynesian cross, and exchange rate mechanisms.',
      vibeCheck:
        "You will never read the news the same way again — and that is genuinely useful outside of uni.",
    },
    posts: [
      {
        id: 'econ10003-1',
        author: 'anonymous_platypus',
        tag: 'exam',
        content:
          'Open notes exam but there is literally no time to look things up. You need to know the models cold. Use the notes as a safety net, not a primary source. Past papers are the best prep.',
        upvotes: 88,
        semester: 'Sem 1, 2024',
      },
      {
        id: 'econ10003-2',
        author: 'anonymous_quokka',
        tag: 'lecturer',
        content:
          'Sam Henly makes tutorials the highlight of the week. He actually gets you thinking rather than just dictating answers. If you can get into his tutorial stream, do it.',
        upvotes: 71,
        semester: 'Sem 2, 2024',
      },
      {
        id: 'econ10003-3',
        author: 'anonymous_echidna',
        tag: 'assessment',
        content:
          'Diagrams are everything in this subject. Even if you explain something perfectly in words, a correct IS-LM shift diagram with labels can add 2–3 marks easily. Practice drawing them quickly.',
        upvotes: 53,
        semester: 'Sem 1, 2024',
      },
      {
        id: 'econ10003-4',
        author: 'anonymous_koala',
        tag: 'general',
        content:
          "Genuinely interesting subject — the RBA interest rate decisions suddenly make sense. Good breadth subject for STEM students who want to understand the economy they're working in.",
        upvotes: 40,
        semester: 'Sem 2, 2023',
      },
      {
        id: 'econ10003-5',
        author: 'anonymous_dingo',
        tag: 'workload',
        content:
          'Lighter than I expected for a core commerce subject. About 8 hours a week comfortably. Tutorials are 1 hour and well-run — attendance is tracked so show up.',
        upvotes: 27,
        semester: 'Sem 1, 2024',
      },
    ],
  },

  {
    code: 'FNCE30007',
    name: 'Derivative Securities',
    faculty: 'Business & Economics',
    creditPoints: 12.5,
    level: 3,
    overallScore: 3.5,
    workloadRating: 4.0,
    recommendPercent: 73,
    aiSummary: {
      overview:
        'FNCE30007 is a third-year finance elective covering the pricing and use of options, futures, swaps, and other derivative instruments using the Black-Scholes model and binomial trees. It is quantitatively demanding — the hardest subject many finance students encounter. Highly recommended if you are interested in trading, risk management, or quant finance.',
      lecturers: [
        {
          name: 'Dr. Joachim Gassen',
          background:
            'Joachim is a German-trained accounting and finance academic with a strong quantitative research background. His lectures are technically rigorous.',
          teachingStyle:
            'Highly technical and formula-heavy. Lectures are best followed with lecture slides pre-printed. He does not slow down much for students who are lost — tutorials are where you ask questions.',
          sentiment:
            'Divided. Students with a strong maths background rate him highly; others find the pace overwhelming. His enthusiasm for the material is genuine.',
          responsiveness:
            'Less accessible than most — relies heavily on tutors for student queries. His consultation hours are useful but attendance requires booking ahead.',
        },
        {
          name: 'Dr. Michelle Li',
          background:
            'Michelle focuses on corporate finance and runs the majority of tutorials. She has an industry background in investment banking in Hong Kong before moving to academia.',
          teachingStyle:
            'Translates abstract theory into practical scenarios. Tutorial problems are modelled on real corporate decisions. Very clear on formula derivations.',
          sentiment:
            'Highly popular. Many students say she explains concepts more clearly than lectures do. Strong recommendation to attend her tutorials in person.',
          responsiveness: 'Excellent — same-day replies on Ed Discussion, detailed and helpful.',
        },
      ],
      assessments:
        'Two assignments (15% each), a mid-semester test (20%), and a final exam (50%). Assignments involve spreadsheet-based DCF models and case analysis. Recurring feedback: Excel skills matter — if you are not comfortable with financial modelling, practise before the assignments.',
      examIntel:
        'Two hours, formula sheet provided. Questions are heavily calculation-based — expect DCF, NPV, CAPM, and portfolio variance questions. The 2024 exam included a multi-stage DCF question that many students ran out of time on. Practice under exam conditions with the actual formula sheet.',
      vibeCheck:
        "Tough, but you will genuinely understand how money and markets work — which is not nothing.",
    },
    posts: [
      {
        id: 'fnce20001-1',
        author: 'anonymous_bandicoot',
        tag: 'assessment',
        content:
          'The DCF assignment is harder than it looks. Make sure your Excel formulas reference cells properly — hard-coded numbers will cost you marks. Michelle Li runs a tutorial on modelling best practice; go to it.',
        upvotes: 62,
        semester: 'Sem 1, 2024',
      },
      {
        id: 'fnce20001-2',
        author: 'anonymous_possum',
        tag: 'exam',
        content:
          "The formula sheet they give you is useful but doesn't include every formula — especially for portfolio variance and CAPM variants. Memorise those. The exam has 5–6 multi-step calculations.",
        upvotes: 79,
        semester: 'Sem 2, 2024',
      },
      {
        id: 'fnce20001-3',
        author: 'anonymous_wallaby',
        tag: 'lecturer',
        content:
          "Michelle's tutorials are worth going to every single week. She uses industry examples and the way she explains NPV made it finally click for me after two weeks of confusion in lectures.",
        upvotes: 91,
        semester: 'Sem 1, 2024',
      },
      {
        id: 'fnce20001-4',
        author: 'anonymous_quoll',
        tag: 'workload',
        content:
          'Takes more time than expected. About 12 hours a week for me — the problem sets are long and if you do not understand the theory you waste a lot of time. Get the fundamentals early.',
        upvotes: 33,
        semester: 'Sem 2, 2023',
      },
      {
        id: 'fnce20001-5',
        author: 'anonymous_numbat',
        tag: 'general',
        content:
          'If you did not do maths methods or specialist in VCE, spend the first two weeks doing basic algebra and percentage problems. The subject assumes maths fluency that some commerce students do not have.',
        upvotes: 47,
        semester: 'Sem 1, 2024',
      },
    ],
  },

  // ─── Arts & Humanities ────────────────────────────────────────────────────
  {
    code: 'PHIL20030',
    name: 'Philosophy of Mind',
    faculty: 'Arts & Humanities',
    creditPoints: 12.5,
    level: 2,
    overallScore: 4.4,
    workloadRating: 2.8,
    recommendPercent: 94,
    aiSummary: {
      overview:
        "PHIL20030 is a second-year philosophy subject exploring the hardest questions about consciousness, mental causation, and the nature of mind. Topics include functionalism, qualia, the hard problem of consciousness, and AI — making it highly relevant for computing and science students. Workload is moderate; the writing is demanding but the content is genuinely mind-expanding.",
      lecturers: [
        {
          name: 'Prof. Howard Sankey',
          background:
            'Howard is a Professor in the History and Philosophy of Science, known for his work on scientific realism and the philosophy of science. One of the most decorated teachers in the Faculty of Arts.',
          teachingStyle:
            'Theatrical and energetic — uses thought experiments and hypotheticals that generate genuine discussion. Lectures feel like live debates. Students feel they are being taken seriously as thinkers.',
          sentiment:
            'Overwhelmingly positive. Repeatedly cited as one of the best lecturers at the university overall. Students frequently recommend this subject purely because of him.',
          responsiveness:
            'Very responsive by email and in consultation hours. He takes student questions seriously and will engage with them at length.',
        },
      ],
      assessments:
        'Two short essays (30% each) and a final essay (40%). All open-book, take-home style. Recurring feedback: essays must have a clear, arguable thesis — descriptive summaries of a philosopher\'s view score poorly. Quality of argument matters far more than length.',
      examIntel:
        'No formal exam — the final "exam" is a take-home essay submitted within a 24-hour window. You are given a choice of three questions and write on one. Strong emphasis on original critical analysis, not just regurgitating lecture content. Use the philosophers as starting points, not as authorities to agree with.',
      vibeCheck:
        "You will leave the exam genuinely unsure if you exist, but weirdly okay with that.",
    },
    posts: [
      {
        id: 'phil10002-1',
        author: 'anonymous_kookaburra',
        tag: 'lecturer',
        content:
          "Howard Sankey is simply one of the best humans at this university. His lecture on Descartes' evil demon had the whole room leaning forward. I've recommended this subject to every friend I have.",
        upvotes: 134,
        semester: 'Sem 1, 2024',
      },
      {
        id: 'phil10002-2',
        author: 'anonymous_cassowary',
        tag: 'assessment',
        content:
          "Essays need a real argument — a proper thesis that you defend, not just 'Descartes thought X.' My first essay was basically a book report and got 62%. Rewrote my approach after feedback and got 84% on the second one.",
        upvotes: 98,
        semester: 'Sem 2, 2024',
      },
      {
        id: 'phil10002-3',
        author: 'anonymous_wombat',
        tag: 'general',
        content:
          'Best breadth subject I took in three years of uni. Even as a science student I found it completely engaging. The readings are short and actually interesting — not dry academic prose.',
        upvotes: 77,
        semester: 'Sem 1, 2024',
      },
      {
        id: 'phil10002-4',
        author: 'anonymous_platypus',
        tag: 'workload',
        content:
          'About 5–6 hours a week including readings, lectures, and tutorials. One of the lightest subjects I have taken. Do the readings though — tutorial discussions require it and participation is noticed.',
        upvotes: 45,
        semester: 'Sem 2, 2023',
      },
      {
        id: 'phil10002-5',
        author: 'anonymous_quokka',
        tag: 'exam',
        content:
          'The take-home essay is a gift. 24 hours sounds stressful but you have the readings, your notes, and no surprise topics. Plan your argument before you start writing and the time is very comfortable.',
        upvotes: 61,
        semester: 'Sem 1, 2024',
      },
    ],
  },

  {
    code: 'HIST20055',
    name: 'Cold War and its Aftermath',
    faculty: 'Arts & Humanities',
    creditPoints: 12.5,
    level: 2,
    overallScore: 4.1,
    workloadRating: 3.0,
    recommendPercent: 87,
    aiSummary: {
      overview:
        'HIST20055 is a second-year history subject that goes deep into Cold War geopolitics — from the Berlin Crisis and Cuban Missile Crisis through to the Soviet collapse and the War on Terror. It is one of the best-structured history subjects at UniMelb, with a strong reading list and well-designed assessments. Light-moderate workload with no exam.',
      lecturers: [
        {
          name: 'Prof. Mark Edele',
          background:
            'Mark is a Professor of History specialising in the Soviet Union and twentieth-century Russia. Author of several acclaimed academic histories of WWII and its aftermath.',
          teachingStyle:
            'Narratively gifted — his lectures tell history as a story rather than a series of dates. Uses primary sources and archival photographs extensively. Highly engaging in person.',
          sentiment:
            'Very well regarded. Students consistently note that his lectures make the Cold War feel vivid and immediate. Can be demanding in essay feedback but this is appreciated.',
          responsiveness:
            'Replies to emails within 2–3 days. More accessible in consultation hours than through digital channels.',
        },
        {
          name: 'Dr. Nadia Davidson',
          background:
            'Nadia is a Lecturer in Modern Asian History, covering post-war Japan, the Korean War, and the rise of East Asian economies. Brings a Pacific perspective that balances the Euro-centric Cold War narrative.',
          teachingStyle:
            'Systematic and well-organised. Lectures are accompanied by detailed slide notes which serve as excellent study resources.',
          sentiment:
            'Well liked. Students appreciate the clear structure and the Asia-Pacific focus as a counterpoint to American Cold War narratives.',
          responsiveness: 'Very responsive on Ed Discussion — replies within 24 hours.',
        },
      ],
      assessments:
        'Weekly reading responses (10%), a source analysis essay (25%), a research essay (40%), and tutorial participation (25%). Recurring feedback: source analysis essays need to engage with context and historiography, not just summarise the document. Cite secondary sources to show you understand the broader debate.',
      examIntel:
        'No exam — assessed entirely through coursework. The research essay is the main event — choose a topic you are genuinely interested in, because 3,000 words requires sustained motivation. Start your research in week 4; the library databases are excellent for this subject.',
      vibeCheck:
        "Every news alert makes more sense after this subject — and the world stops looking random.",
    },
    posts: [
      {
        id: 'hist10001-1',
        author: 'anonymous_bilby',
        tag: 'lecturer',
        content:
          "Mark Edele's lecture on the Cuban Missile Crisis had me completely gripped for 50 minutes. He has this gift of making you feel the tension of historical moments. Absolutely go to the lectures in person.",
        upvotes: 87,
        semester: 'Sem 1, 2024',
      },
      {
        id: 'hist10001-2',
        author: 'anonymous_echidna',
        tag: 'assessment',
        content:
          "Source analysis essay is tricky if you haven't done VCE history — do not just summarise what the source says. You need to explain who wrote it, why, what they left out, and how historians use it. Read the marking rubric carefully.",
        upvotes: 73,
        semester: 'Sem 2, 2024',
      },
      {
        id: 'hist10001-3',
        author: 'anonymous_koala',
        tag: 'general',
        content:
          'Perfect breadth subject for engineering and science students. No prior history knowledge needed and the content is genuinely fascinating — the decolonisation lectures especially. 10/10 recommend.',
        upvotes: 96,
        semester: 'Sem 1, 2024',
      },
      {
        id: 'hist10001-4',
        author: 'anonymous_dingo',
        tag: 'workload',
        content:
          'Weekly reading responses sound like a lot but they are only 100–150 words — about 20 minutes each if you do the reading. The consistency is the key. Do not save them for the last minute.',
        upvotes: 41,
        semester: 'Sem 2, 2023',
      },
      {
        id: 'hist10001-5',
        author: 'anonymous_bandicoot',
        tag: 'assessment',
        content:
          'For the research essay — go to the library help desk in week 4 or 5. They have a history subject librarian who will show you exactly which databases to use. Changed my whole approach.',
        upvotes: 58,
        semester: 'Sem 1, 2024',
      },
      {
        id: 'hist10001-6',
        author: 'anonymous_possum',
        tag: 'exam',
        content:
          'No exam! This is probably the biggest selling point for most people. All the pressure is on the essays which is less stressful if you are good at writing but more stressful if you are not.',
        upvotes: 34,
        semester: 'Sem 2, 2024',
      },
    ],
  },
]

export function getSubjectByCode(code: string): Subject | undefined {
  return subjects.find((s) => s.code.toLowerCase() === code.toLowerCase())
}

export function getSubjectsByFaculty(faculty: string): Subject[] {
  return subjects.filter((s) => s.faculty === faculty)
}
