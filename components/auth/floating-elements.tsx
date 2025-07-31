"use client"

import { BarChart3, TrendingUp, Users, Zap, Target, PieChart } from "lucide-react"

const icons = [BarChart3, TrendingUp, Users, Zap, Target, PieChart]

export function FloatingElements() {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 2 }}>
      {icons.map((Icon, index) => (
        <div
          key={index}
          className="absolute animate-float opacity-10 hover:opacity-20 transition-opacity duration-300"
          style={{
            left: `${10 + index * 15}%`,
            top: `${20 + index * 10}%`,
            animationDelay: `${index * 0.5}s`,
            animationDuration: `${4 + Math.random() * 2}s`,
          }}
        >
          <Icon className="h-8 w-8 text-blue-600" />
        </div>
      ))}
    </div>
  )
}
