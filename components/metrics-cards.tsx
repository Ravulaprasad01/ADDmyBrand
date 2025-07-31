"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, TrendingDown, DollarSign, Users, Target, Percent } from "lucide-react"
import { cn } from "@/lib/utils"

interface Metric {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ComponentType<any>
}

const initialMetrics: Metric[] = [
  {
    title: "Revenue",
    value: "$24,500",
    change: "+10%",
    trend: "up",
    icon: DollarSign,
  },
  {
    title: "Users",
    value: "12,345",
    change: "+5%",
    trend: "up",
    icon: Users,
  },
  {
    title: "Conversions",
    value: "3,456",
    change: "+8%",
    trend: "up",
    icon: Target,
  },
  {
    title: "Growth %",
    value: "15%",
    change: "+2%",
    trend: "up",
    icon: Percent,
  },
]

export function MetricsCards() {
  const [metrics, setMetrics] = useState(initialMetrics)

  // Simulate real-time updates
  useEffect(() => {
    const interval = setInterval(() => {
      setMetrics((prev) =>
        prev.map((metric) => ({
          ...metric,
          value: generateRandomValue(metric.title),
          change: generateRandomChange(),
          trend: Math.random() > 0.3 ? "up" : "down",
        })),
      )
    }, 10000) // Update every 10 seconds

    return () => clearInterval(interval)
  }, [])

  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      {metrics.map((metric, index) => {
        const Icon = metric.icon
        const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown

        return (
          <Card key={index} className="transition-all duration-200 hover:shadow-md">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
              <Icon className="h-4 w-4 text-muted-foreground" />
            </CardHeader>
            <CardContent>
              <div className="text-2xl font-bold">{metric.value}</div>
              <div className="flex items-center gap-1 text-sm">
                <TrendIcon className={cn("h-4 w-4", metric.trend === "up" ? "text-green-600" : "text-red-600")} />
                <span className={cn("font-medium", metric.trend === "up" ? "text-green-600" : "text-red-600")}>
                  {metric.change}
                </span>
                <span className="text-muted-foreground">from last month</span>
              </div>
            </CardContent>
          </Card>
        )
      })}
    </div>
  )
}

function generateRandomValue(title: string): string {
  switch (title) {
    case "Revenue":
      return `$${(20000 + Math.random() * 10000).toLocaleString("en-US", { maximumFractionDigits: 0 })}`
    case "Users":
      return (10000 + Math.random() * 5000).toLocaleString("en-US", { maximumFractionDigits: 0 })
    case "Conversions":
      return (3000 + Math.random() * 1000).toLocaleString("en-US", { maximumFractionDigits: 0 })
    case "Growth %":
      return `${(10 + Math.random() * 10).toFixed(0)}%`
    default:
      return "0"
  }
}

function generateRandomChange(): string {
  const change = (Math.random() * 20 - 5).toFixed(0)
  return `${change > 0 ? "+" : ""}${change}%`
}
