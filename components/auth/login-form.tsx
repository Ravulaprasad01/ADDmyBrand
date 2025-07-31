"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { useAuth } from "@/contexts/auth-context"
import { Eye, EyeOff, LogIn, Mail, Lock, ArrowRight, Sparkles } from "lucide-react"
import { PulseButton } from "./pulse-button"
import { TypingAnimation } from "./typing-animation"
import { FormValidation } from "./form-validation"

interface LoginFormProps {
  onToggleMode: () => void
  onStartDemo: () => void
}

const welcomeTexts = [
  "Welcome Back to Marketing Insights",
  "Ready to Boost Your ROI?",
  "Let's Analyze Your Success",
  "Time to Optimize Campaigns",
]

export function LoginForm({ onToggleMode, onStartDemo }: LoginFormProps) {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")

  const { signIn } = useAuth()

  const handleDemoLogin = async () => {
    setLoading(true)
    setError("")
    const { error } = await signIn("demo@marketinginsights.com", "Demo_Account_2025!")
    if (error) {
      setError(error.message)
    } else {
      onStartDemo()
    }
    setLoading(false)
  }

  return (
    <div className="w-full max-w-md mx-auto">
      <Card className="shadow-2xl border-0 bg-white/95 backdrop-blur-sm animate-in slide-in-from-bottom-4 duration-700 hover:shadow-3xl transition-all">
        <CardHeader className="text-center pb-6 relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-blue-500/5 to-purple-500/5 animate-gradient-x" />
          <div className="relative z-10">
            <div className="mx-auto mb-6 h-20 w-20 rounded-3xl bg-gradient-to-br from-primary to-blue-600 flex items-center justify-center shadow-xl animate-in zoom-in-50 duration-500 hover:scale-110 transition-transform cursor-pointer">
              <div className="h-10 w-10 bg-white rounded-xl flex items-center justify-center animate-pulse">
                <div className="h-5 w-5 bg-gradient-to-br from-primary to-blue-600 rounded-sm" />
              </div>
            </div>
            <CardTitle className="text-3xl font-bold bg-gradient-to-r from-gray-900 to-gray-600 bg-clip-text text-transparent mb-3">
              Try Demo Mode
            </CardTitle>
            <p className="text-muted-foreground animate-in fade-in-50 duration-700 delay-300">
              Instantly explore the dashboard with sample data
            </p>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 px-8 pb-8">
          {error && (
            <Alert
              variant="destructive"
              className="border-red-200 bg-red-50 animate-in slide-in-from-top-2 duration-300 hover:scale-105 transition-transform"
            >
              <AlertDescription className="text-red-800 font-medium">{error}</AlertDescription>
            </Alert>
          )}
          <div className="flex flex-col items-center gap-6">
            <PulseButton
              variant="outline"
              size="lg"
              onClick={handleDemoLogin}
              className="border-blue-300 text-blue-700 hover:bg-blue-100 bg-transparent hover:scale-110 shadow-sm w-full"
              disabled={loading}
            >
              {loading ? "Loading Demo..." : "Try Demo Mode"}
            </PulseButton>
          </div>
          {/* Animated Trust Indicators */}
          <div className="pt-6 border-t animate-in slide-in-from-bottom-4 duration-500 delay-900">
            <div className="flex items-center justify-center gap-6 text-xs text-muted-foreground">
              <span className="flex items-center gap-2 hover:scale-110 transition-all duration-200 cursor-pointer group">
                <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse group-hover:scale-150 transition-transform" />
                <span className="font-medium">SOC 2 Certified</span>
              </span>
              <span className="flex items-center gap-2 hover:scale-110 transition-all duration-200 cursor-pointer group">
                <div
                  className="h-2 w-2 bg-blue-500 rounded-full animate-pulse group-hover:scale-150 transition-transform"
                  style={{ animationDelay: "0.5s" }}
                />
                <span className="font-medium">GDPR Compliant</span>
              </span>
              <span className="flex items-center gap-2 hover:scale-110 transition-all duration-200 cursor-pointer group">
                <div
                  className="h-2 w-2 bg-purple-500 rounded-full animate-pulse group-hover:scale-150 transition-transform"
                  style={{ animationDelay: "1s" }}
                />
                <span className="font-medium">99.9% Uptime</span>
              </span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
