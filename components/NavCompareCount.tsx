'use client'

import { useCompare } from '@/hooks/useCompare'

export default function NavCompareCount() {
  const { compareCodes, hydrated } = useCompare()
  if (!hydrated || compareCodes.length === 0) return null
  return (
    <span className="absolute -top-1.5 -right-2 flex size-4 items-center justify-center rounded-full bg-[#534AB7] text-[10px] font-medium text-white">
      {compareCodes.length}
    </span>
  )
}
