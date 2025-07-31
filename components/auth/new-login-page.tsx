"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAuth } from "@/contexts/auth-context"
import {
  Eye, EyeOff, Mail, Lock, User, Building, Phone, Loader2, CheckCircle, Star,
  TrendingUp, Users, BarChart3, Zap, Shield, Globe, ArrowRight, Sparkles, Play,
  X
} from "lucide-react"

function randomArray(len: number, min: number, max: number) {
  return Array.from({ length: len }, () => Math.floor(Math.random() * (max - min + 1)) + min)
}

function BarChart() {
  const data = randomArray(6, 20, 100)
  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"]
  return (
    <svg width="100%" height="120" viewBox="0 0 240 120">
      {data.map((val, i) => (
        <g key={i}>
          <rect
            x={20 + i * 35}
            y={120 - val}
            width="25"
            height={val}
            rx="5"
            fill="#6366f1"
            opacity="0.85"
          />
          <text
            x={32 + i * 35}
            y={115}
            fontSize="10"
            fill="#fff"
            textAnchor="middle"
          >
            {labels[i]}
          </text>
        </g>
      ))}
    </svg>
  )
}

function PieChart() {
  // 3 random segments
  const data = randomArray(3, 20, 60)
  const total = data.reduce((a, b) => a + b, 0)
  let acc = 0
  const colors = ["#a78bfa", "#818cf8", "#f472b6"]
  return (
    <svg width="120" height="120" viewBox="0 0 120 120">
      {data.map((val, i) => {
        const start = acc / total * 2 * Math.PI
        acc += val
        const end = acc / total * 2 * Math.PI
        const x1 = 60 + 50 * Math.cos(start - Math.PI / 2)
        const y1 = 60 + 50 * Math.sin(start - Math.PI / 2)
        const x2 = 60 + 50 * Math.cos(end - Math.PI / 2)
        const y2 = 60 + 50 * Math.sin(end - Math.PI / 2)
        const largeArc = end - start > Math.PI ? 1 : 0
        return (
          <path
            key={i}
            d={`M60,60 L${x1},${y1} A50,50 0 ${largeArc} 1 ${x2},${y2} Z`}
            fill={colors[i]}
            opacity="0.85"
          />
        )
      })}
    </svg>
  )
}

function LineChart() {
  const data = randomArray(7, 30, 110)
  const points = data.map((y, i) => `${20 + i * 30},${120 - y}`).join(" ")
  return (
    <svg width="220" height="120" viewBox="0 0 220 120">
      <polyline
        fill="none"
        stroke="#f472b6"
        strokeWidth="3"
        points={points}
      />
      {data.map((y, i) => (
        <circle
          key={i}
          cx={20 + i * 30}
          cy={120 - y}
          r="4"
          fill="#f472b6"
          opacity="0.85"
        />
      ))}
    </svg>
  )
}

// Add this helper for random bubble positions and animation
function AnimatedBubbles() {
  // 12 bubbles, random positions and delays
  const bubbles = Array.from({ length: 12 }).map((_, i) => {
    const size = Math.random() * 48 + 32 // 32-80px
    const left = Math.random() * 90 // %
    const top = Math.random() * 90 // %
    const duration = Math.random() * 6 + 6 // 6-12s
    const delay = Math.random() * 6 // 0-6s
    const opacity = Math.random() * 0.3 + 0.15 // 0.15-0.45
    return (
      <div
        key={i}
        style={{
          left: `${left}%`,
          top: `${top}%`,
          width: size,
          height: size,
          animationDuration: `${duration}s`,
          animationDelay: `${delay}s`,
          opacity,
        }}
        className="absolute rounded-full bg-white/30 blur-2xl animate-bubble"
      />
    )
  })
  return <div className="pointer-events-none absolute inset-0 z-0">{bubbles}</div>
}

// Add this to your global CSS (or in a <style jsx global> block if using Next.js):
/*
@keyframes bubble {
  0% { transform: translateY(0) scale(1);}
  50% { transform: translateY(-40px) scale(1.1);}
  100% { transform: translateY(0) scale(1);}
}
.animate-bubble {
  animation-name: bubble;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}
*/

export function NewLoginPage() {
  const { signIn, signUp } = useAuth()
  const [isLogin, setIsLogin] = useState(true)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const [animatedStats, setAnimatedStats] = useState({
    users: 0,
    campaigns: 0,
    revenue: 0,
  })

  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  })

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    company: "",
    phone: "",
  })

  useEffect(() => {
    const targets = { users: 50000, campaigns: 125000, revenue: 2500000 }
    const duration = 2000
    const steps = 60
    const increment = {
      users: targets.users / steps,
      campaigns: targets.campaigns / steps,
      revenue: targets.revenue / steps,
    }
    let currentStep = 0
    const timer = setInterval(() => {
      if (currentStep < steps) {
        setAnimatedStats({
          users: Math.floor(increment.users * currentStep),
          campaigns: Math.floor(increment.campaigns * currentStep),
          revenue: Math.floor(increment.revenue * currentStep),
        })
        currentStep++
      } else {
        setAnimatedStats(targets)
        clearInterval(timer)
      }
    }, duration / steps)
    return () => clearInterval(timer)
  }, [])

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const { error } = await signIn(loginData.email, loginData.password)
      if (error) setError(error.message || "Invalid credentials")
      else window.location.href = '/'
    } catch {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    try {
      const { error } = await signUp(signupData.email, signupData.password, {
        name: signupData.name,
        company: signupData.company,
        phone: signupData.phone,
      })
      if (error) setError(error.message || "Failed to create account")
      else window.location.href = '/'
    } catch {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const features = [
    {
      icon: <BarChart3 className="h-6 w-6" />,
      title: "Advanced Analytics",
      description: "Real-time insights and performance tracking",
    },
    {
      icon: <Users className="h-6 w-6" />,
      title: "Audience Management",
      description: "Segment and target your customers effectively",
    },
    {
      icon: <TrendingUp className="h-6 w-6" />,
      title: "Growth Optimization",
      description: "AI-powered recommendations for better ROI",
    },
    {
      icon: <Shield className="h-6 w-6" />,
      title: "Enterprise Security",
      description: "Bank-level security for your data",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechCorp",
      content: "ADmyBRAND Insights transformed our marketing strategy. ROI increased by 300%!",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "CEO",
      company: "StartupXYZ",
      content: "The insights we get are incredible. Best marketing platform we've used.",
      rating: 5,
    },
  ]

  const featureStats = [
    "52,000+ reports generated",
    "1.2M audience profiles managed",
    "Avg. ROI boost: 38%",
    "ISO 27001 certified"
  ]

  const campaignStats = [
    "Top Campaign: Summer Splash",
    "CTR: 4.8%",
    "Impressions: 1.3M",
    "Conversion Rate: 2.1%"
  ]

  const growthStats = [
    "This week: +12% growth",
    "Best day: Thursday",
    "New signups: 1,200"
  ]

  const audienceStats = [
    "Largest segment: Tech Enthusiasts",
    "Avg. Age: 29",
    "Top City: Bangalore"
  ]

  const demoTriedToday = Math.floor(Math.random() * 100) + 50 // 50-149

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-600 to-purple-700 flex flex-col items-center justify-between relative overflow-hidden">
      {/* Animated Bubbles Background */}
      <AnimatedBubbles />

      {/* Top Section */}
      <div className="relative z-10 w-full max-w-3xl mx-auto mt-8 px-4 text-center space-y-4">
        <div className="flex items-center justify-center gap-3">
          <div className="h-12 w-12 rounded-xl bg-white/20 backdrop-blur-sm flex items-center justify-center">
            <img src="/admybrand.jpg" alt="ADmyBRAND Logo" className="h-8 w-8 rounded-full" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white">ADmyBRAND </h1>
            <p className="text-blue-100">a fictional analytics platform</p>
          </div>
        </div>
        <p className="text-2xl font-bold text-white leading-relaxed">
          Transform your marketing with AI-powered insights and real-time analytics
        </p>
        {/* Animated Stats */}
        <div className="flex justify-center gap-12 mt-6">
          <div className="text-center">
            <div className="text-4xl font-extrabold text-white">{animatedStats.users.toLocaleString()}+</div>
            <div className="text-lg font-semibold text-blue-100">Active Users</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-extrabold text-white">{animatedStats.campaigns.toLocaleString()}+</div>
            <div className="text-lg font-semibold text-blue-100">Campaigns</div>
          </div>
          <div className="text-center">
            <div className="text-4xl font-extrabold text-white">${(animatedStats.revenue / 1000000).toFixed(1)}M+</div>
            <div className="text-lg font-semibold text-blue-100">Revenue Generated</div>
          </div>
        </div>
      </div>

      {/* Visualization Widgets Section */}
      <div className="relative z-10 w-full max-w-5xl mx-auto my-16 px-4 flex flex-col gap-8">
        <div className="flex flex-col md:flex-row gap-8 items-stretch justify-center">
          <div className="flex-1 rounded-2xl p-8 shadow-xl flex flex-col items-center min-w-[260px] bg-gradient-to-br from-blue-500 to-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-tr hover:from-purple-500 hover:to-blue-500 cursor-pointer fade-up-animate">
            <span className="mb-2 text-2xl font-bold text-white text-center">Campaign Performance</span>
            <span className="mb-4 text-blue-100 text-sm">{campaignStats[Math.floor(Math.random()*campaignStats.length)]}</span>
            <div className="w-full flex-1 flex items-end justify-center">
              <BarChart />
            </div>
          </div>
          <div className="flex-1 rounded-2xl p-8 shadow-xl flex flex-col items-center min-w-[260px] bg-gradient-to-br from-blue-500 to-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-tr hover:from-purple-500 hover:to-blue-500 cursor-pointer fade-up-animate"
            style={{ animationDelay: "0.1s" }}>
            <span className="mb-2 text-2xl font-bold text-white text-center">Growth Trend</span>
            <span className="mb-4 text-blue-100 text-sm">{growthStats[Math.floor(Math.random()*growthStats.length)]}</span>
            <div className="w-full flex-1 flex items-end justify-center">
              <LineChart />
            </div>
          </div>
          <div className="flex-1 rounded-2xl p-8 shadow-xl flex flex-col items-center min-w-[260px] bg-gradient-to-br from-blue-500 to-purple-500 transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-tr hover:from-purple-500 hover:to-blue-500 cursor-pointer fade-up-animate"
            style={{ animationDelay: "0.2s" }}>
            <span className="mb-2 text-2xl font-bold text-white text-center">Audience Segments</span>
            <span className="mb-4 text-blue-100 text-sm">{audienceStats[Math.floor(Math.random()*audienceStats.length)]}</span>
            <div className="w-full flex-1 flex items-end justify-center">
              <PieChart />
            </div>
          </div>
        </div>
        {/* Quote and Get Started */}
        <div className="flex flex-col items-center gap-4 mt-4">
          <div className="text-white text-xl font-semibold text-center drop-shadow">
            Top revenue drivers at a glance—click below to begin.
          </div>
          <Button
            className="px-10 py-4 text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-xl shadow-lg hover:scale-105 transition-all"
            onClick={() => setShowModal(true)}
          >
            Get Started
          </Button>
        </div>
      </div>

      {/* Modal for Login/Signup */}
      {showModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60">
          <div className="relative w-full max-w-md mx-auto max-h-[95vh] flex flex-col">
            {/* Close Button */}
            <button
              onClick={() => setShowModal(false)}
              className="absolute top-4 right-4 z-10 text-gray-500 hover:text-gray-800 bg-white/80 rounded-full p-2 shadow transition"
              aria-label="Close"
              type="button"
            >
              <svg className="h-5 w-5" viewBox="0 0 20 20" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="6" y1="6" x2="14" y2="14" stroke="currentColor" strokeWidth="2" />
                <line x1="14" y1="6" x2="6" y2="14" stroke="currentColor" strokeWidth="2" />
              </svg>
            </button>
            <Card className="face-up-animate shadow-2xl border-0 bg-gradient-to-br from-white via-blue-50 to-purple-100 dark:from-zinc-900 dark:via-blue-950 dark:to-purple-950 backdrop-blur-md pt-12 rounded-2xl flex-1 flex flex-col">
              <CardContent
                className="space-y-8 px-8 py-10 overflow-y-auto scrollbar-thin scrollbar-thumb-blue-200 flex-1"
                style={{ maxHeight: "80vh" }}
              >
                <div className="flex flex-col items-center gap-2 mb-4">
                  <div className="h-16 w-16 rounded-2xl bg-gradient-to-br from-blue-600 to-purple-600 flex items-center justify-center shadow-lg animate-in zoom-in-50 duration-500">
                    <img src="/admybrand.jpg" alt="ADmyBRAND Logo" className="h-12 w-12 rounded-full" />
                  </div>
                  <h2 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent text-center">
                    Welcome Back!
                  </h2>
                  <p className="text-sm text-blue-900 dark:text-blue-100 text-center">
                    Sign in to access your personalized marketing analytics dashboard.<br />
                    <span className="text-xs text-blue-500">Your data is secure and encrypted.</span>
                  </p>
                </div>
                {error && (
                  <Alert variant="destructive" className="animate-in slide-in-from-top-2 duration-300">
                    <AlertDescription>{error}</AlertDescription>
                  </Alert>
                )}
                <Tabs value={isLogin ? "login" : "signup"}>
                  <TabsList className="grid w-full grid-cols-2 mb-6 animate-in fade-in-50 slide-in-from-bottom-3 duration-700 delay-300">
                    <TabsTrigger
                      value="login"
                      onClick={() => setIsLogin(true)}
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                    >
                      Sign In
                    </TabsTrigger>
                    <TabsTrigger
                      value="signup"
                      onClick={() => setIsLogin(false)}
                      className="data-[state=active]:bg-gradient-to-r data-[state=active]:from-blue-600 data-[state=active]:to-purple-600 data-[state=active]:text-white"
                    >
                      Sign Up
                    </TabsTrigger>
                  </TabsList>
                  <TabsContent value="login" className="space-y-4 animate-in fade-in-50 slide-in-from-bottom-3 duration-700 delay-400">
                    <form onSubmit={handleLogin} className="space-y-4">
                      <div className="space-y-2">
                        <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                          Email Address
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400" />
                          <Input
                            id="email"
                            type="email"
                            value={loginData.email}
                            onChange={(e) => setLoginData((prev) => ({ ...prev, email: e.target.value }))}
                            placeholder="you@email.com"
                            className="pl-10 h-12 border-2 rounded-xl focus:border-blue-500 transition-all duration-200 bg-white/80 dark:bg-zinc-900/80"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="password" className="text-sm font-medium text-gray-700">
                          Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-blue-400" />
                          <Input
                            id="password"
                            type={showPassword ? "text" : "password"}
                            value={loginData.password}
                            onChange={(e) => setLoginData((prev) => ({ ...prev, password: e.target.value }))}
                            placeholder="•••••••••••"
                            className="pl-10 pr-10 h-12 border-2 rounded-xl focus:border-blue-500 transition-all duration-200 bg-white/80 dark:bg-zinc-900/80"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                            onClick={() => setShowPassword(!showPassword)}
                            tabIndex={-1}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105 animate-pulse-subtle shadow-lg"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            Signing In...
                          </>
                        ) : (
                          <>
                            Sign In
                            <ArrowRight className="h-5 w-5 ml-2" />
                          </>
                        )}
                      </Button>
                    </form>
                    <div className="text-xs text-center text-blue-500 mt-2">
                      Verify Your E-mail!! <a href="#" className="underline hover:text-blue-700 transition"> After Sign Up</a>
                    </div>
                  </TabsContent>
                  <TabsContent value="signup" className="space-y-4 animate-in fade-in-50 slide-in-from-bottom-3 duration-700 delay-400">
                    <form onSubmit={handleSignup} className="space-y-4">
                      <div className="grid grid-cols-2 gap-4">
                        <div className="space-y-2">
                          <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                            Full Name
                          </Label>
                          <div className="relative">
                            <User className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                              id="name"
                              value={signupData.name}
                              onChange={(e) => setSignupData((prev) => ({ ...prev, name: e.target.value }))}
                              placeholder="Your name"
                              className="pl-10 h-12 border-2 rounded-xl focus:border-blue-500 transition-all duration-200 bg-white/80 dark:bg-zinc-900/80"
                              required
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="company" className="text-sm font-medium text-gray-700">
                            Company
                          </Label>
                          <div className="relative">
                            <Building className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                            <Input
                              id="company"
                              value={signupData.company}
                              onChange={(e) => setSignupData((prev) => ({ ...prev, company: e.target.value }))}
                              placeholder="Company name"
                              className="pl-10 h-12 border-2 rounded-xl focus:border-blue-500 transition-all duration-200 bg-white/80 dark:bg-zinc-900/80"
                            />
                          </div>
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-email" className="text-sm font-medium text-gray-700">
                          Email Address
                        </Label>
                        <div className="relative">
                          <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="signup-email"
                            type="email"
                            value={signupData.email}
                            onChange={(e) => setSignupData((prev) => ({ ...prev, email: e.target.value }))}
                            placeholder="Enter your email"
                            className="pl-10 h-12 border-2 rounded-xl focus:border-blue-500 transition-all duration-200 bg-white/80 dark:bg-zinc-900/80"
                            required
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                          Phone Number
                        </Label>
                        <div className="relative">
                          <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="phone"
                            value={signupData.phone}
                            onChange={(e) => setSignupData((prev) => ({ ...prev, phone: e.target.value }))}
                            placeholder="Your phone number"
                            className="pl-10 h-12 border-2 rounded-xl focus:border-blue-500 transition-all duration-200 bg-white/80 dark:bg-zinc-900/80"
                          />
                        </div>
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="signup-password" className="text-sm font-medium text-gray-700">
                          Password
                        </Label>
                        <div className="relative">
                          <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                          <Input
                            id="signup-password"
                            type={showPassword ? "text" : "password"}
                            value={signupData.password}
                            onChange={(e) => setSignupData((prev) => ({ ...prev, password: e.target.value }))}
                            placeholder="Create a password"
                            className="pl-10 pr-10 h-12 border-2 rounded-xl focus:border-blue-500 transition-all duration-200 bg-white/80 dark:bg-zinc-900/80"
                            required
                          />
                          <Button
                            type="button"
                            variant="ghost"
                            size="sm"
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8 p-0"
                            onClick={() => setShowPassword(!showPassword)}
                          >
                            {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                          </Button>
                        </div>
                      </div>
                      <Button
                        type="submit"
                        disabled={loading}
                        className="w-full h-12 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold rounded-xl transition-all duration-300 hover:scale-105"
                      >
                        {loading ? (
                          <>
                            <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                            Creating Account...
                          </>
                        ) : (
                          <>
                            Create Account
                            <ArrowRight className="h-5 w-5 ml-2" />
                          </>
                        )}
                      </Button>
                    </form>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Bottom Section */}
      <div className="relative z-10 w-full max-w-5xl mx-auto mb-8 px-4 flex flex-col gap-10">
        {/* Features */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="flex items-start gap-4 p-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-tr hover:from-purple-500 hover:to-blue-500 cursor-pointer"
            >
              <div className="flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-xl bg-white/20">
                {/* Replace with a simple SVG icon or emoji */}
                <svg width="28" height="28" fill="none" stroke="#fff" strokeWidth="2"><circle cx="14" cy="14" r="12" /></svg>
              </div>
              <div>
                <h4 className="font-semibold text-lg text-white mb-1">{feature.title}</h4>
                <p className="text-sm text-blue-100">{feature.description}</p>
                <div className="mt-2 text-xs text-blue-200">{featureStats[index]}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Testimonials */}
        <h3 className="text-2xl font-bold text-white text-center mb-4">What Our Users Say</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((testimonial, index) => (
            <div
              key={index}
              className="p-6 bg-gradient-to-br from-blue-500 to-purple-500 rounded-2xl shadow-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:bg-gradient-to-tr hover:from-purple-500 hover:to-blue-500 flex flex-col gap-2 cursor-pointer"
            >
              <div className="flex items-center gap-1 mb-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg key={i} className="h-5 w-5 text-yellow-300 fill-yellow-300" viewBox="0 0 20 20"><polygon points="10,1 12.5,7.5 19,7.5 13.5,12 15.5,18 10,14.5 4.5,18 6.5,12 1,7.5 7.5,7.5" /></svg>
                ))}
              </div>
              <p className="text-base text-white mb-2">"{testimonial.content}"</p>
              <div className="text-xs text-blue-100">
                <span className="font-semibold">{testimonial.name}</span>
                <span className="text-blue-200"> - {testimonial.role}, {testimonial.company}</span>
              </div>
              <div className="text-xs text-blue-200 mt-1">Reviewed on {["July 2025", "June 2025"][index]}</div>
            </div>
          ))}
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-20 w-full mt-12 pb-6 flex flex-col items-center">
        <div className="w-full max-w-5xl px-4">
          <div className="border-t border-white/20 dark:border-zinc-700 pt-6 flex flex-col md:flex-row items-center justify-between gap-2">
            <span className="text-xs text-white/80 dark:text-zinc-300">
              © 2025 ADmyBRAND Insights. All rights reserved.
            </span>
            <span className="text-xs text-white/60 dark:text-zinc-400">
              Crafted with <span className="text-pink-300">♥</span> by the ADmyBRAND Team | <a href="mailto:support@admybrand.com" className="underline hover:text-blue-200 transition">Contact Support</a>
            </span>
          </div>
        </div>
      </footer>
    </div>
  )
}

// Add this to your global CSS (e.g. globals.css or in a <style jsx global> block):
/*
@keyframes bubble {
  0% { transform: translateY(0) scale(1);}
  50% { transform: translateY(-40px) scale(1.1);}
  100% { transform: translateY(0) scale(1);}
}
.animate-bubble {
  animation-name: bubble;
  animation-iteration-count: infinite;
  animation-timing-function: ease-in-out;
}
@keyframes fadeUp {
  0% {
    opacity: 0;
    transform: translateY(40px) scale(0.98);
  }
  80% {
    opacity: 1;
    transform: translateY(-4px) scale(1.01);
  }
  100% {
    opacity: 1;
    transform: translateY(0) scale(1);
  }
}
.fade-up-animate {
  animation: fadeUp 0.8s cubic-bezier(0.23, 1, 0.32, 1);
}
*/
