"use client"

import { useEffect, useRef, useCallback, useMemo } from "react"

interface ChartData {
  month: string
  value: number
}

interface OptimizedLineChartProps {
  data?: ChartData[]
  color?: string
  height?: number
}

export function OptimizedLineChart({
  data = [
    { month: "Jan", value: 20000 },
    { month: "Feb", value: 25000 },
    { month: "Mar", value: 22000 },
    { month: "Apr", value: 28000 },
    { month: "May", value: 24000 },
    { month: "Jun", value: 30000 },
    { month: "Jul", value: 24500 },
  ],
  color = "#3b82f6",
  height = 192,
}: OptimizedLineChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  // Memoize chart calculations
  const chartConfig = useMemo(() => {
    const values = data.map((d) => d.value)
    const minValue = Math.min(...values)
    const maxValue = Math.max(...values)
    const valueRange = maxValue - minValue || 1 // Prevent division by zero

    return {
      values,
      minValue,
      maxValue,
      valueRange,
      padding: 40,
    }
  }, [data])

  const drawChart = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const { width, height: canvasHeight } = canvas
    const { padding, minValue, valueRange } = chartConfig

    // Clear canvas with better performance
    ctx.clearRect(0, 0, width, canvasHeight)

    const chartWidth = width - padding * 2
    const chartHeight = canvasHeight - padding * 2

    // Enable anti-aliasing for smoother lines
    ctx.imageSmoothingEnabled = true
    ctx.imageSmoothingQuality = "high"

    // Draw grid lines with optimized rendering
    ctx.strokeStyle = "#e5e7eb"
    ctx.lineWidth = 1
    ctx.beginPath()

    for (let i = 0; i <= 4; i++) {
      const y = padding + (chartHeight / 4) * i
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
    }
    ctx.stroke()

    // Draw main line with gradient
    const gradient = ctx.createLinearGradient(0, padding, 0, padding + chartHeight)
    gradient.addColorStop(0, color)
    gradient.addColorStop(1, color + "80") // Add transparency

    ctx.strokeStyle = gradient
    ctx.lineWidth = 3
    ctx.lineCap = "round"
    ctx.lineJoin = "round"
    ctx.beginPath()

    // Calculate points once
    const points = data.map((point, index) => ({
      x: padding + (chartWidth / (data.length - 1)) * index,
      y: padding + chartHeight - ((point.value - minValue) / valueRange) * chartHeight,
    }))

    // Draw smooth curve
    if (points.length > 0) {
      ctx.moveTo(points[0].x, points[0].y)

      for (let i = 1; i < points.length; i++) {
        const prevPoint = points[i - 1]
        const currentPoint = points[i]
        const cpx = (prevPoint.x + currentPoint.x) / 2

        ctx.quadraticCurveTo(cpx, prevPoint.y, currentPoint.x, currentPoint.y)
      }
    }

    ctx.stroke()

    // Draw points with better performance
    ctx.fillStyle = color
    points.forEach((point) => {
      ctx.beginPath()
      ctx.arc(point.x, point.y, 4, 0, 2 * Math.PI)
      ctx.fill()
    })

    // Draw labels
    ctx.fillStyle = "#6b7280"
    ctx.font = "12px Inter, system-ui, sans-serif"
    ctx.textAlign = "center"

    data.forEach((point, index) => {
      const x = padding + (chartWidth / (data.length - 1)) * index
      ctx.fillText(point.month, x, canvasHeight - 10)
    })
  }, [data, chartConfig, color])

  useEffect(() => {
    // Use requestAnimationFrame for smooth rendering
    const animationFrame = requestAnimationFrame(drawChart)
    return () => cancelAnimationFrame(animationFrame)
  }, [drawChart])

  // Handle canvas resize
  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const resizeObserver = new ResizeObserver(() => {
      const rect = canvas.getBoundingClientRect()
      canvas.width = rect.width * window.devicePixelRatio
      canvas.height = height * window.devicePixelRatio
      canvas.style.width = rect.width + "px"
      canvas.style.height = height + "px"

      const ctx = canvas.getContext("2d")
      if (ctx) {
        ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      }

      drawChart()
    })

    resizeObserver.observe(canvas)
    return () => resizeObserver.disconnect()
  }, [drawChart, height])

  return (
    <div className="h-48 w-full">
      <canvas ref={canvasRef} width={400} height={height} className="w-full h-full" style={{ maxWidth: "100%" }} />
    </div>
  )
}

export function OptimizedBarChart({
  data = [
    { month: "Jan", value: 2000 },
    { month: "Feb", value: 2500 },
    { month: "Mar", value: 2200 },
    { month: "Apr", value: 2800 },
    { month: "May", value: 2400 },
    { month: "Jun", value: 3000 },
    { month: "Jul", value: 2450 },
  ],
  color = "#e5e7eb",
  height = 192,
}: OptimizedLineChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  const chartConfig = useMemo(() => {
    const maxValue = Math.max(...data.map((d) => d.value))
    return {
      maxValue,
      padding: 40,
    }
  }, [data])

  const drawChart = useCallback(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const { width, height: canvasHeight } = canvas
    const { padding, maxValue } = chartConfig

    ctx.clearRect(0, 0, width, canvasHeight)

    const chartWidth = width - padding * 2
    const chartHeight = canvasHeight - padding * 2
    const barWidth = (chartWidth / data.length) * 0.6
    const barSpacing = (chartWidth / data.length) * 0.4

    // Draw bars with gradient
    const gradient = ctx.createLinearGradient(0, padding, 0, padding + chartHeight)
    gradient.addColorStop(0, color)
    gradient.addColorStop(1, color + "60")

    ctx.fillStyle = gradient

    data.forEach((point, index) => {
      const x = padding + (chartWidth / data.length) * index + barSpacing / 2
      const barHeight = (point.value / maxValue) * chartHeight
      const y = padding + chartHeight - barHeight

      // Add rounded corners to bars
      ctx.beginPath()
      ctx.roundRect(x, y, barWidth, barHeight, [4, 4, 0, 0])
      ctx.fill()
    })

    // Draw labels
    ctx.fillStyle = "#6b7280"
    ctx.font = "12px Inter, system-ui, sans-serif"
    ctx.textAlign = "center"

    data.forEach((point, index) => {
      const x = padding + (chartWidth / data.length) * index + chartWidth / data.length / 2
      ctx.fillText(point.month, x, canvasHeight - 10)
    })
  }, [data, chartConfig, color])

  useEffect(() => {
    const animationFrame = requestAnimationFrame(drawChart)
    return () => cancelAnimationFrame(animationFrame)
  }, [drawChart])

  return (
    <div className="h-48 w-full">
      <canvas ref={canvasRef} width={400} height={height} className="w-full h-full" />
    </div>
  )
}
