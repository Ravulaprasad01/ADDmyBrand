"use client"

import type React from "react"

import { useState } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/contexts/auth-context"
import { DashboardPreview } from "./dashboard-preview"

interface MarketWiseLoginProps {
  onStartDemo?: () => void
}

export function MarketWiseLogin({ onStartDemo }: MarketWiseLoginProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)

  const { signIn } = useAuth()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    // Simulate login
    setTimeout(() => {
      if (onStartDemo) {
        onStartDemo()
      }
      setLoading(false)
    }, 1500)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 flex">
      {/* Left Side - Product Showcase */}
      <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-center relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute top-10 left-10 w-20 h-20 bg-blue-500 rounded-full animate-float"></div>
          <div
            className="absolute top-32 right-20 w-12 h-12 bg-teal-500 rounded-full animate-float"
            style={{ animationDelay: "1s" }}
          ></div>
          <div
            className="absolute bottom-20 left-20 w-16 h-16 bg-indigo-500 rounded-full animate-float"
            style={{ animationDelay: "2s" }}
          ></div>
        </div>

        <div className="relative z-10 max-w-lg">
          {/* Logo */}
          <div className="flex items-center gap-3 mb-12 animate-in slide-in-from-left-4 duration-700">
            <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center hover:scale-110 transition-transform duration-300 cursor-pointer">
              <div className="w-4 h-4 bg-white rounded-sm"></div>
            </div>
            <span className="text-2xl font-bold text-gray-900">ADmyBRAND</span>
          </div>

          {/* Main Content */}
          <div className="space-y-8">
            <div className="animate-in slide-in-from-left-4 duration-700 delay-200">
              <h1 className="text-4xl font-bold text-gray-900 leading-tight mb-4 hover:text-blue-600 transition-colors duration-300 cursor-default">
                Unlock Your Marketing Potential
              </h1>
              <p className="text-lg text-gray-600 leading-relaxed">
                Gain a competitive edge with our data-driven insights and analytics.
              </p>
            </div>

            <div className="animate-in slide-in-from-left-4 duration-700 delay-400">
              <DashboardPreview />
            </div>
          </div>
        </div>
      </div>

      {/* Right Side - Login Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        {/* Mobile Logo */}
        <div className="lg:hidden absolute top-8 left-8 flex items-center gap-3">
          <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center">
            <div className="w-4 h-4 bg-white rounded-sm"></div>
          </div>
          <span className="text-xl font-bold text-gray-900">ADmyBRAND</span>
        </div>

        <Card className="w-full max-w-md bg-white shadow-xl border-0 animate-in slide-in-from-right-4 duration-700 hover:shadow-2xl transition-all">
          <CardHeader className="text-center pb-6">
            <h2 className="text-2xl font-bold text-gray-900 mb-2">Welcome Back</h2>
            <p className="text-gray-600">Login to access your marketing insights.</p>
          </CardHeader>

          <CardContent className="space-y-6">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email Field */}
              <div className="space-y-2">
                <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                  Email Address
                </Label>
                <div className="relative">
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    onFocus={() => setFocusedField("email")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="you@example.com"
                    className={`h-12 border-2 rounded-lg transition-all duration-300 ${
                      focusedField === "email"
                        ? "border-blue-500 ring-4 ring-blue-100 scale-105"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    required
                  />
                </div>
              </div>

              {/* Password Field */}
              <div className="space-y-2">
                <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                  Password
                </Label>
                <div className="relative">
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    onFocus={() => setFocusedField("password")}
                    onBlur={() => setFocusedField(null)}
                    placeholder="••••••••"
                    className={`h-12 border-2 rounded-lg transition-all duration-300 ${
                      focusedField === "password"
                        ? "border-blue-500 ring-4 ring-blue-100 scale-105"
                        : "border-gray-200 hover:border-gray-300"
                    }`}
                    required
                  />
                </div>
              </div>

              {/* Remember Me & Forgot Password */}
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="remember"
                    checked={rememberMe}
                    onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                    className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600"
                  />
                  <Label
                    htmlFor="remember"
                    className="text-sm text-gray-600 cursor-pointer hover:text-gray-900 transition-colors"
                  >
                    Remember me
                  </Label>
                </div>
                <Button
                  variant="link"
                  className="p-0 h-auto text-sm text-blue-600 hover:text-blue-700 hover:scale-105 transition-all duration-200"
                >
                  Forgot password?
                </Button>
              </div>

              {/* Login Button */}
              <Button
                type="submit"
                disabled={loading}
                className="w-full h-12 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-all duration-300 hover:scale-105 hover:shadow-lg disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                    <span>Logging in...</span>
                  </div>
                ) : (
                  "Log In"
                )}
              </Button>
            </form>

            {/* Demo Access */}
            <div className="pt-4 border-t">
              <Button
                variant="outline"
                onClick={onStartDemo}
                className="w-full h-10 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 hover:scale-105 bg-transparent"
              >
                Try Demo Mode
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
