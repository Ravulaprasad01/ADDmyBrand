"use client"

import { Card, CardContent } from "@/components/ui/card"
import { BarChart3, Target, Users, TrendingUp, Zap, Shield, Globe, Smartphone } from "lucide-react"

const features = [
  {
    icon: BarChart3,
    title: "Advanced Analytics",
    description: "Real-time insights with interactive charts and customizable dashboards",
  },
  {
    icon: Target,
    title: "Campaign Management",
    description: "Create, monitor, and optimize marketing campaigns across all channels",
  },
  {
    icon: Users,
    title: "Audience Segmentation",
    description: "Build targeted audiences with behavioral and demographic data",
  },
  {
    icon: TrendingUp,
    title: "Performance Tracking",
    description: "Monitor ROI, conversions, and key metrics in real-time",
  },
  {
    icon: Zap,
    title: "Automation Tools",
    description: "Automate reports, alerts, and campaign optimizations",
  },
  {
    icon: Shield,
    title: "Enterprise Security",
    description: "Bank-level security with SOC 2 compliance and data encryption",
  },
]

const stats = [
  { value: "10M+", label: "Data Points Processed" },
  { value: "500+", label: "Companies Trust Us" },
  { value: "99.9%", label: "Uptime Guarantee" },
  { value: "24/7", label: "Expert Support" },
]

export function FeaturesSection() {
  return (
    <div className="space-y-8">
      {/* Hero Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {stats.map((stat, index) => (
          <div key={index} className="text-center">
            <div className="text-2xl md:text-3xl font-bold text-primary">{stat.value}</div>
            <div className="text-sm text-muted-foreground">{stat.label}</div>
          </div>
        ))}
      </div>

      {/* Features Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <Card
              key={index}
              className="border-0 bg-white/50 backdrop-blur-sm hover:bg-white/70 transition-all duration-300"
            >
              <CardContent className="p-4">
                <div className="flex items-start gap-3">
                  <div className="p-2 rounded-lg bg-primary/10">
                    <Icon className="h-5 w-5 text-primary" />
                  </div>
                  <div className="space-y-1">
                    <h3 className="font-semibold text-sm">{feature.title}</h3>
                    <p className="text-xs text-muted-foreground leading-relaxed">{feature.description}</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          )
        })}
      </div>

      {/* Additional Benefits */}
      <div className="grid gap-3 md:grid-cols-2">
        <div className="flex items-center gap-3 p-3 rounded-lg bg-green-50 border border-green-200">
          <div className="p-1 rounded-full bg-green-100">
            <Globe className="h-4 w-4 text-green-600" />
          </div>
          <div>
            <div className="font-medium text-sm text-green-800">Global Reach</div>
            <div className="text-xs text-green-600">Track campaigns across 50+ countries</div>
          </div>
        </div>

        <div className="flex items-center gap-3 p-3 rounded-lg bg-blue-50 border border-blue-200">
          <div className="p-1 rounded-full bg-blue-100">
            <Smartphone className="h-4 w-4 text-blue-600" />
          </div>
          <div>
            <div className="font-medium text-sm text-blue-800">Mobile Optimized</div>
            <div className="text-xs text-blue-600">Access insights anywhere, anytime</div>
          </div>
        </div>
      </div>
    </div>
  )
}
