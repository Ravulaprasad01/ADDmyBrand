"use client"

import { useEffect, useRef } from "react"

const data = [
  { month: "Jan", value: 20000 },
  { month: "Feb", value: 25000 },
  { month: "Mar", value: 22000 },
  { month: "Apr", value: 28000 },
  { month: "May", value: 24000 },
  { month: "Jun", value: 30000 },
  { month: "Jul", value: 24500 },
]

export function LineChart() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const { width, height } = canvas
    ctx.clearRect(0, 0, width, height)

    // Set up dimensions
    const padding = 40
    const chartWidth = width - padding * 2
    const chartHeight = height - padding * 2

    // Find min and max values
    const values = data.map((d) => d.value)
    const minValue = Math.min(...values)
    const maxValue = Math.max(...values)
    const valueRange = maxValue - minValue

    // Draw grid lines
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 1

    for (let i = 0; i <= 4; i++) {
      const y = padding + (chartHeight / 4) * i
      ctx.beginPath()
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
      ctx.stroke()
    }

    // Draw line
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 3
    ctx.beginPath()

    data.forEach((point, index) => {
      const x = padding + (chartWidth / (data.length - 1)) * index
      const y = padding + chartHeight - ((point.value - minValue) / valueRange) * chartHeight

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()

    // Draw points
    ctx.fillStyle = "#3b82f6"
    data.forEach((point, index) => {
      const x = padding + (chartWidth / (data.length - 1)) * index
      const y = padding + chartHeight - ((point.value - minValue) / valueRange) * chartHeight

      ctx.beginPath()
      ctx.arc(x, y, 4, 0, 2 * Math.PI)
      ctx.fill()
    })

    // Draw labels
    ctx.fillStyle = "#6b7280"
    ctx.font = "12px Inter"
    ctx.textAlign = "center"

    data.forEach((point, index) => {
      const x = padding + (chartWidth / (data.length - 1)) * index
      ctx.fillText(point.month, x, height - 10)
    })
  }, [])

  return (
    <div className="h-48">
      <canvas ref={canvasRef} width={400} height={192} className="w-full h-full" />
    </div>
  )
}
