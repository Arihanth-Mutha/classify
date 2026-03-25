'use client'

import { useState, useCallback } from 'react'
import type { Subject } from '@/data/subjects'

interface ShareButtonProps {
  subject: Subject
}

export default function ShareButton({ subject }: ShareButtonProps) {
  const [status, setStatus] = useState<'idle' | 'downloading'>('idle')

  const generate = useCallback(() => {
    setStatus('downloading')

    const canvas = document.createElement('canvas')
    const scale = 2
    const W = 600
    const H = 360
    canvas.width = W * scale
    canvas.height = H * scale
    const ctx = canvas.getContext('2d')!
    ctx.scale(scale, scale)

    // background
    ctx.fillStyle = '#0F0F0F'
    ctx.fillRect(0, 0, W, H)

    // purple gradient strip at top
    const grad = ctx.createLinearGradient(0, 0, W, 0)
    grad.addColorStop(0, '#534AB7')
    grad.addColorStop(1, '#7B6FD4')
    ctx.fillStyle = grad
    ctx.fillRect(0, 0, W, 6)

    // brand name
    ctx.fillStyle = '#534AB7'
    ctx.font = '500 13px ui-sans-serif, system-ui, sans-serif'
    ctx.fillText('Class-ify', 32, 38)

    // tagline
    ctx.fillStyle = '#6B7280'
    ctx.font = '400 11px ui-sans-serif, system-ui, sans-serif'
    ctx.fillText('UniMelb student reviews', 32, 54)

    // divider
    ctx.strokeStyle = '#1F1F1F'
    ctx.lineWidth = 1
    ctx.beginPath()
    ctx.moveTo(32, 66)
    ctx.lineTo(W - 32, 66)
    ctx.stroke()

    // subject code
    ctx.fillStyle = '#7B6FD4'
    ctx.font = '500 11px ui-sans-serif, system-ui, sans-serif'
    ctx.fillText(subject.code.toUpperCase(), 32, 90)

    // subject name
    ctx.fillStyle = '#F5F5F5'
    ctx.font = '500 22px ui-sans-serif, system-ui, sans-serif'
    ctx.fillText(subject.name, 32, 116)

    // stars row
    const starSize = 16
    const starY = 138
    const totalStars = 5
    const filled = Math.round(subject.overallScore)
    for (let i = 0; i < totalStars; i++) {
      ctx.fillStyle = i < filled ? '#534AB7' : '#2A2A2A'
      drawStar(ctx, 32 + i * (starSize + 4) + starSize / 2, starY + starSize / 2, starSize / 2, 5)
    }
    ctx.fillStyle = '#F5F5F5'
    ctx.font = '500 13px ui-sans-serif, system-ui, sans-serif'
    ctx.fillText(subject.overallScore.toFixed(1), 32 + totalStars * (starSize + 4) + 4, starY + 13)

    // vibe check quote
    const vibe = `"${subject.aiSummary.vibeCheck}"`
    ctx.fillStyle = '#9CA3AF'
    ctx.font = '400 12px ui-sans-serif, system-ui, sans-serif'
    const vibeLines = wrapText(ctx, vibe, W - 64, 12)
    let vibeY = 178
    for (const line of vibeLines.slice(0, 3)) {
      ctx.fillText(line, 32, vibeY)
      vibeY += 18
    }

    // stats boxes
    const stats = [
      { label: 'workload', value: `${subject.workloadRating.toFixed(1)} / 5` },
      { label: 'exam difficulty', value: subject.aiSummary.examIntel.difficultyVsPastPapers === 'harder' ? 'hard' : subject.aiSummary.examIntel.difficultyVsPastPapers },
      { label: 'recommend', value: `${subject.recommendPercent}%` },
    ]

    const boxW = (W - 64 - 16) / 3
    const boxX = 32
    const boxY = vibeY + 16

    stats.forEach((stat, i) => {
      const x = boxX + i * (boxW + 8)
      // box background
      ctx.fillStyle = '#1A1A1A'
      roundRect(ctx, x, boxY, boxW, 54, 8)
      ctx.fill()

      // value
      ctx.fillStyle = '#F5F5F5'
      ctx.font = '500 16px ui-sans-serif, system-ui, sans-serif'
      ctx.fillText(stat.value, x + 12, boxY + 24)

      // label
      ctx.fillStyle = '#6B7280'
      ctx.font = '400 10px ui-sans-serif, system-ui, sans-serif'
      ctx.fillText(stat.label, x + 12, boxY + 42)
    })

    // watermark
    ctx.fillStyle = '#2A2A2A'
    ctx.font = '400 10px ui-sans-serif, system-ui, sans-serif'
    const watermark = 'classifyapp.com'
    const wm = ctx.measureText(watermark)
    ctx.fillText(watermark, W - 32 - wm.width, H - 16)

    // download
    const url = canvas.toDataURL('image/png')
    const a = document.createElement('a')
    a.href = url
    a.download = `${subject.code}-classifyapp.png`
    a.click()

    setTimeout(() => setStatus('idle'), 2000)
  }, [subject])

  return (
    <button
      onClick={generate}
      disabled={status === 'downloading'}
      className="flex items-center gap-1.5 rounded-full border border-border px-3 py-1.5 text-xs font-medium text-muted-foreground hover:border-[#534AB7] hover:text-[#534AB7] transition-colors disabled:opacity-60"
    >
      {status === 'downloading' ? (
        <>
          <svg className="size-3.5 animate-bounce" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
          </svg>
          Downloaded!
        </>
      ) : (
        <>
          <svg className="size-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.185 2.25 2.25 0 00-3.933 2.185z" />
          </svg>
          Share
        </>
      )}
    </button>
  )
}

function drawStar(ctx: CanvasRenderingContext2D, cx: number, cy: number, r: number, points: number) {
  const inner = r * 0.45
  ctx.beginPath()
  for (let i = 0; i < points * 2; i++) {
    const angle = (i * Math.PI) / points - Math.PI / 2
    const radius = i % 2 === 0 ? r : inner
    const x = cx + Math.cos(angle) * radius
    const y = cy + Math.sin(angle) * radius
    if (i === 0) ctx.moveTo(x, y)
    else ctx.lineTo(x, y)
  }
  ctx.closePath()
  ctx.fill()
}

function roundRect(ctx: CanvasRenderingContext2D, x: number, y: number, w: number, h: number, r: number) {
  ctx.beginPath()
  ctx.moveTo(x + r, y)
  ctx.lineTo(x + w - r, y)
  ctx.quadraticCurveTo(x + w, y, x + w, y + r)
  ctx.lineTo(x + w, y + h - r)
  ctx.quadraticCurveTo(x + w, y + h, x + w - r, y + h)
  ctx.lineTo(x + r, y + h)
  ctx.quadraticCurveTo(x, y + h, x, y + h - r)
  ctx.lineTo(x, y + r)
  ctx.quadraticCurveTo(x, y, x + r, y)
  ctx.closePath()
}

function wrapText(ctx: CanvasRenderingContext2D, text: string, maxWidth: number, fontSize: number): string[] {
  const words = text.split(' ')
  const lines: string[] = []
  let current = ''
  for (const word of words) {
    const test = current ? `${current} ${word}` : word
    if (ctx.measureText(test).width > maxWidth && current) {
      lines.push(current)
      current = word
    } else {
      current = test
    }
  }
  if (current) lines.push(current)
  return lines
}
