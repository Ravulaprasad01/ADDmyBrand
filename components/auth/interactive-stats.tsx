"use client"

import { useState, useEffect } from "react"
import { TrendingUp, Users, BarChart3, Zap } from "lucide-react"

interface Stat {
  icon: any
  label: string
  value: number
  suffix: string
  color: string
}

const stats: Stat[] = [
  { icon: TrendingUp, label: "ROI Increase", value: 300, suffix: "%", color: "text-green-600" },
  { icon: Users, label: "Active Users", value: 50000, suffix: "+", color: "text-blue-600" },
  { icon: BarChart3, label: "Data Points", value: 1000000, suffix: "+", color: "text-purple-600" },
  { icon: Zap, label: "Time Saved", value: 40, suffix: "hrs/week", color: "text-orange-600" },
]

export function InteractiveStats() {
  const [animatedValues, setAnimatedValues] = useState<number[]>(stats.map(() => 0))
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    const timers = stats.map((stat, index) => {
      const duration = 2000
      const steps = 60
      const increment = stat.value / steps
      let currentValue = 0

      return setInterval(() => {
        currentValue += increment
        if (currentValue >= stat.value) {
          currentValue = stat.value
          clearInterval(timers[index])
        }
        setAnimatedValues((prev) => {
          const newValues = [...prev]
          newValues[index] = Math.floor(currentValue)
          return newValues
        })
      }, duration / steps)
    })

    return () => timers.forEach(clearInterval)
  }, [])

  const formatValue = (value: number, suffix: string) => {
    if (suffix === "+" && value >= 1000) {
      return `${(value / 1000).toFixed(0)}k${suffix}`
    }
    return `${value.toLocaleString()}${suffix}`
  }

  return (
    <div className="grid grid-cols-2 gap-4">
      {stats.map((stat, index) => {
        const Icon = stat.icon
        return (
          <div
            key={index}
            className={`group p-4 rounded-xl bg-white/80 backdrop-blur-sm border border-gray-200 hover:shadow-lg transition-all duration-300 cursor-pointer hover:scale-105 ${
              isVisible ? "animate-in slide-in-from-bottom-4" : ""
            }`}
            style={{ animationDelay: `${index * 100}ms` }}
          >
            <div className="flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-gray-50 group-hover:scale-110 transition-transform duration-300`}>
                <Icon className={`h-5 w-5 ${stat.color}`} />
              </div>
              <div>
                <p className="text-xs text-gray-600 font-medium">{stat.label}</p>
                <p className={`text-lg font-bold ${stat.color}`}>{formatValue(animatedValues[index], stat.suffix)}</p>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}
