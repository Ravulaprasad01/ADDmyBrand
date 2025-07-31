"use client"

import { useEffect, useRef } from "react"

const data = [
  { month: "Jan", value: 2000 },
  { month: "Feb", value: 2500 },
  { month: "Mar", value: 2200 },
  { month: "Apr", value: 2800 },
  { month: "May", value: 2400 },
  { month: "Jun", value: 3000 },
  { month: "Jul", value: 2450 },
]

export function BarChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const { width, height } = canvas
    ctx.clearRect(0, 0, width, height)

    const padding = 40
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    const maxValue = Math.max(...data.map((d) => d.value))
    const barWidth = (chartWidth / data.length) * 0.6
    const barSpacing = (chartWidth / data.length) * 0.4

    // Draw bars
    ctx.fillStyle = "#e5e7eb"
    data.forEach((point, index) => {
      const x = padding + (chartWidth / data.length) * index + barSpacing / 2
      const barHeight = (point.value / maxValue) * chartHeight
      const y = padding + chartHeight - barHeight

      ctx.fillRect(x, y, barWidth, barHeight)
    })

    // Draw labels
    ctx.fillStyle = "#6b7280"
    ctx.font = "12px Inter"
    ctx.textAlign = "center"

    data.forEach((point, index) => {
      const x = padding + (chartWidth / data.length) * index + chartWidth / data.length / 2
      ctx.fillText(point.month, x, height - 10)
    })
  }, [])

  return (
    <div className="h-48">
      <canvas ref={canvasRef} width={400} height={192} className="w-full h-full" />
    </div>
  )
}
