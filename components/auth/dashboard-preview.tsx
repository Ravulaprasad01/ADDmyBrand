"use client"

import { useState, useEffect } from "react"
import { TrendingUp } from "lucide-react"

export function DashboardPreview() {
  const [isVisible, setIsVisible] = useState(false)
  const [engagementValue, setEngagementValue] = useState(0)
  const [conversionsValue, setConversionsValue] = useState(0)

  useEffect(() => {
    setIsVisible(true)

    // Animate engagement percentage
    const engagementTimer = setInterval(() => {
      setEngagementValue((prev) => {
        if (prev >= 63) {
          clearInterval(engagementTimer)
          return 63
        }
        return prev + 1
      })
    }, 30)

    // Animate conversions count
    const conversionsTimer = setInterval(() => {
      setConversionsValue((prev) => {
        if (prev >= 1204) {
          clearInterval(conversionsTimer)
          return 1204
        }
        return prev + 20
      })
    }, 20)

    return () => {
      clearInterval(engagementTimer)
      clearInterval(conversionsTimer)
    }
  }, [])

  return (
    <div
      className={`space-y-8 transition-all duration-1000 ${isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    >
      {/* Dashboard Card */}
      <div className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 hover:scale-105 cursor-pointer">
        <h3 className="text-lg font-semibold text-gray-800 mb-4">Audience Growth</h3>

        {/* Chart Container */}
        <div className="bg-gradient-to-br from-teal-100 to-teal-200 rounded-xl p-6 mb-4 relative overflow-hidden hover:from-teal-200 hover:to-teal-300 transition-all duration-300">
          {/* Animated Background Pattern */}
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-2 left-2 w-2 h-2 bg-teal-600 rounded-full animate-pulse"></div>
            <div
              className="absolute top-4 right-4 w-1 h-1 bg-teal-500 rounded-full animate-pulse"
              style={{ animationDelay: "0.5s" }}
            ></div>
            <div
              className="absolute bottom-3 left-6 w-1.5 h-1.5 bg-teal-700 rounded-full animate-pulse"
              style={{ animationDelay: "1s" }}
            ></div>
          </div>

          {/* Chart Frame */}
          <div className="bg-white rounded-lg p-4 relative">
            {/* Animated Growth Line */}
            <svg width="120" height="80" viewBox="0 0 120 80" className="mx-auto">
              <defs>
                <linearGradient id="lineGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                  <stop offset="0%" stopColor="#14b8a6" />
                  <stop offset="100%" stopColor="#0891b2" />
                </linearGradient>
              </defs>

              {/* Grid Lines */}
              <g stroke="#f1f5f9" strokeWidth="0.5">
                <line x1="0" y1="20" x2="120" y2="20" />
                <line x1="0" y1="40" x2="120" y2="40" />
                <line x1="0" y1="60" x2="120" y2="60" />
              </g>

              {/* Growth Line */}
              <path
                d="M10,60 Q30,50 50,40 T90,20 L110,15"
                stroke="url(#lineGradient)"
                strokeWidth="3"
                fill="none"
                strokeLinecap="round"
                className="animate-in"
                style={{
                  strokeDasharray: "200",
                  strokeDashoffset: isVisible ? "0" : "200",
                  transition: "stroke-dashoffset 2s ease-in-out",
                }}
              />

              {/* Data Points */}
              <circle cx="10" cy="60" r="3" fill="#14b8a6" className="animate-pulse" />
              <circle
                cx="50"
                cy="40"
                r="3"
                fill="#0891b2"
                className="animate-pulse"
                style={{ animationDelay: "0.5s" }}
              />
              <circle cx="90" cy="20" r="3" fill="#0e7490" className="animate-pulse" style={{ animationDelay: "1s" }} />
              <circle
                cx="110"
                cy="15"
                r="3"
                fill="#155e75"
                className="animate-pulse"
                style={{ animationDelay: "1.5s" }}
              />
            </svg>

            {/* Trending Icon */}
            <div className="absolute top-2 right-2">
              <TrendingUp className="h-4 w-4 text-teal-600 animate-bounce" style={{ animationDelay: "2s" }} />
            </div>
          </div>
        </div>

        {/* Metrics */}
        <div className="grid grid-cols-2 gap-4">
          <div className="text-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer group">
            <div className="text-2xl font-bold text-blue-600 group-hover:scale-110 transition-transform duration-200">
              {engagementValue}%
            </div>
            <div className="text-sm text-gray-600 mb-1">Engagement</div>
            <div className="text-xs text-green-500 font-medium">+12%</div>
          </div>

          <div className="text-center p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer group">
            <div className="text-2xl font-bold text-blue-600 group-hover:scale-110 transition-transform duration-200">
              {conversionsValue.toLocaleString()}
            </div>
            <div className="text-sm text-gray-600 mb-1">Conversions</div>
            <div className="text-xs text-green-500 font-medium">+8.5%</div>
          </div>
        </div>
      </div>
    </div>
  )
}
