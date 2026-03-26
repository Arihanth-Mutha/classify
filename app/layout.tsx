import type { Metadata } from 'next'
import { Figtree } from 'next/font/google'
import './globals.css'
import { cn } from '@/lib/utils'
import ComparisonTray from '@/components/ComparisonTray'

const figtree = Figtree({ subsets: ['latin'], variable: '--font-sans' })

export const metadata: Metadata = {
  title: 'Class-ify — UniMelb student reviews',
  description:
    'Honest, anonymous reviews and AI summaries for University of Melbourne subjects. Find out what your subject is really like before you enrol.',
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={cn('dark font-sans antialiased', figtree.variable)}>
      <body>
        {children}
        <ComparisonTray />
      </body>
    </html>
  )
}
