"use client"

import type React from "react"

import { useEffect, useState, useMemo, useCallback } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { TrendingUp, TrendingDown, DollarSign, Users, Target, Percent, Edit, Eye, MoreHorizontal } from "lucide-react"
import { cn } from "@/lib/utils"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"

interface Metric {
  title: string
  value: string
  change: string
  trend: "up" | "down"
  icon: React.ComponentType<any>
  rawValue: number
}

const initialMetrics: Metric[] = [
  {
    title: "Revenue",
    value: "$24,500",
    change: "+10%",
    trend: "up",
    icon: DollarSign,
    rawValue: 24500,
  },
  {
    title: "Users",
    value: "12,345",
    change: "+5%",
    trend: "up",
    icon: Users,
    rawValue: 12345,
  },
  {
    title: "Conversions",
    value: "3,456",
    change: "+8%",
    trend: "up",
    icon: Target,
    rawValue: 3456,
  },
  {
    title: "Growth %",
    value: "15%",
    change: "+2%",
    trend: "up",
    icon: Percent,
    rawValue: 15,
  },
]

export function OptimizedMetricsCards() {
  const [metrics, setMetrics] = useState(initialMetrics)

  const generateRandomValue = useCallback((title: string, baseValue: number): { value: string; rawValue: number } => {
    const variation = 0.1 // 10% variation
    const randomFactor = 1 + (Math.random() - 0.5) * variation
    const newRawValue = Math.round(baseValue * randomFactor)

    switch (title) {
      case "Revenue":
        return {
          value: `$${newRawValue.toLocaleString()}`,
          rawValue: newRawValue,
        }
      case "Users":
        return {
          value: newRawValue.toLocaleString(),
          rawValue: newRawValue,
        }
      case "Conversions":
        return {
          value: newRawValue.toLocaleString(),
          rawValue: newRawValue,
        }
      case "Growth %":
        return {
          value: `${newRawValue}%`,
          rawValue: newRawValue,
        }
      default:
        return { value: "0", rawValue: 0 }
    }
  }, [])

  const generateRandomChange = useCallback((): { change: string; trend: "up" | "down" } => {
    const changeValue = Math.random() * 20 - 5 // -5% to +15%
    const trend = changeValue >= 0 ? "up" : "down"
    return {
      change: `${changeValue >= 0 ? "+" : ""}${changeValue.toFixed(1)}%`,
      trend,
    }
  }, [])

  const updateMetrics = useCallback(() => {
    setMetrics((prev) =>
      prev.map((metric) => {
        const { value, rawValue } = generateRandomValue(metric.title, metric.rawValue)
        const { change, trend } = generateRandomChange()
        return {
          ...metric,
          value,
          change,
          trend,
          rawValue,
        }
      }),
    )
  }, [generateRandomValue, generateRandomChange])

  useEffect(() => {
    const interval = setInterval(updateMetrics, 15000)
    return () => clearInterval(interval)
  }, [updateMetrics])

  const handleView = (metricTitle: string) => {
    alert(`Viewing detailed ${metricTitle} analytics`)
  }

  const handleEdit = (metricTitle: string) => {
    alert(`Editing ${metricTitle} settings`)
  }

  const renderedCards = useMemo(() => {
    return metrics.map((metric, index) => {
      const Icon = metric.icon
      const TrendIcon = metric.trend === "up" ? TrendingUp : TrendingDown

      return (
        <Card
          key={metric.title}
          className="group relative transition-all duration-300 hover:shadow-lg hover:scale-105 hover:border-primary/50 cursor-pointer"
        >
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">{metric.title}</CardTitle>
            <div className="flex items-center gap-2">
              <Icon className="h-4 w-4 text-muted-foreground" />
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-6 w-6 p-0 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <MoreHorizontal className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={() => handleView(metric.title)}>
                    <Eye className="h-4 w-4 mr-2" />
                    View Details
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={() => handleEdit(metric.title)}>
                    <Edit className="h-4 w-4 mr-2" />
                    Edit Settings
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold transition-all duration-500 group-hover:text-primary">
              {metric.value}
            </div>
            <div className="flex items-center gap-1 text-sm">
              <TrendIcon
                className={cn(
                  "h-4 w-4 transition-colors duration-300",
                  metric.trend === "up" ? "text-green-600" : "text-red-600",
                )}
              />
              <span
                className={cn(
                  "font-medium transition-colors duration-300",
                  metric.trend === "up" ? "text-green-600" : "text-red-600",
                )}
              >
                {metric.change}
              </span>
              <span className="text-muted-foreground">from last month</span>
            </div>
          </CardContent>
        </Card>
      )
    })
  }, [metrics])

  return <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">{renderedCards}</div>
}
