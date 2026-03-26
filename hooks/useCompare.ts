'use client'

import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'classify_compare'
const MAX = 3

export function useCompare() {
  const [compareCodes, setCompareCodes] = useState<string[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setCompareCodes(JSON.parse(stored))
    } catch {
      // ignore
    }
    setHydrated(true)
  }, [])

  const save = useCallback((codes: string[]) => {
    setCompareCodes(codes)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(codes))
    } catch {
      // ignore
    }
  }, [])

  const addToCompare = useCallback(
    (code: string) => {
      if (!compareCodes.includes(code) && compareCodes.length < MAX) {
        save([...compareCodes, code])
      }
    },
    [compareCodes, save]
  )

  const removeFromCompare = useCallback(
    (code: string) => {
      save(compareCodes.filter((c) => c !== code))
    },
    [compareCodes, save]
  )

  const isInCompare = useCallback(
    (code: string) => compareCodes.includes(code),
    [compareCodes]
  )

  const clearCompare = useCallback(() => save([]), [save])

  return {
    compareCodes,
    hydrated,
    addToCompare,
    removeFromCompare,
    isInCompare,
    clearCompare,
    atMax: compareCodes.length >= MAX,
  }
}
