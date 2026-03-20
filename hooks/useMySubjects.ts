'use client'

import { useState, useEffect, useCallback } from 'react'

const STORAGE_KEY = 'classify_my_subjects'

export function useMySubjects() {
  const [savedCodes, setSavedCodes] = useState<string[]>([])
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY)
      if (stored) setSavedCodes(JSON.parse(stored))
    } catch {
      // ignore
    }
    setHydrated(true)
  }, [])

  const save = useCallback((codes: string[]) => {
    setSavedCodes(codes)
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(codes))
    } catch {
      // ignore
    }
  }, [])

  const addSubject = useCallback(
    (code: string) => {
      if (!savedCodes.includes(code)) {
        save([...savedCodes, code])
      }
    },
    [savedCodes, save]
  )

  const removeSubject = useCallback(
    (code: string) => {
      save(savedCodes.filter((c) => c !== code))
    },
    [savedCodes, save]
  )

  const isSaved = useCallback(
    (code: string) => savedCodes.includes(code),
    [savedCodes]
  )

  return { savedCodes, hydrated, addSubject, removeSubject, isSaved }
}
