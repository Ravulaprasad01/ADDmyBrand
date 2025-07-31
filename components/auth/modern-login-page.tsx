"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { useAuth } from "@/contexts/auth-context"
import {
  Eye,
  EyeOff,
  Mail,
  Lock,
  ArrowRight,
  Sparkles,
  TrendingUp,
  Users,
  BarChart3,
  Zap,
  Shield,
  Globe,
  Star,
  CheckCircle,
  Play,
} from "lucide-react"

interface ModernLoginPageProps {
  onStartDemo?: () => void
}

export function ModernLoginPage({ onStartDemo }: ModernLoginPageProps) {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [showPassword, setShowPassword] = useState(false)
  const [rememberMe, setRememberMe] = useState(false)
  const [loading, setLoading] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [isVisible, setIsVisible] = useState(false)
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const { signIn } = useAuth()

  useEffect(() => {
    setIsVisible(true)

    // Auto-rotate testimonials
    const interval = setInterval(() => {
      setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
    }, 5000)

    return () => clearInterval(interval)
  }, [])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      await signIn(email, password)
    } catch (error) {
      console.error("Login failed:", error)
    } finally {
      setLoading(false)
    }
  }

  const stats = [
    { label: "Active Users", value: "50K+", icon: Users, color: "text-blue-600", bgColor: "bg-blue-100" },
    { label: "Revenue Growth", value: "300%", icon: TrendingUp, color: "text-green-600", bgColor: "bg-green-100" },
    { label: "Data Points", value: "1M+", icon: BarChart3, color: "text-purple-600", bgColor: "bg-purple-100" },
  ]

  const features = [
    {
      icon: Zap,
      title: "Real-time Analytics",
      desc: "Get instant insights with live data processing and visualization",
      color: "from-yellow-400 to-orange-500",
    },
    {
      icon: Shield,
      title: "Enterprise Security",
      desc: "Bank-level encryption and compliance with SOC2 standards",
      color: "from-green-400 to-blue-500",
    },
    {
      icon: Globe,
      title: "Global Reach",
      desc: "Connect with audiences worldwide through our global infrastructure",
      color: "from-purple-400 to-pink-500",
    },
  ]

  const testimonials = [
    {
      name: "Sarah Johnson",
      role: "Marketing Director",
      company: "TechCorp",
      content: "ADmyBRAND Insights transformed our marketing strategy. We saw 250% ROI increase in just 3 months!",
      avatar: "/placeholder.svg?height=50&width=50&text=SJ",
      rating: 5,
    },
    {
      name: "Michael Chen",
      role: "Growth Manager",
      company: "StartupXYZ",
      content: "The insights are incredible. We finally understand our customers and can make data-driven decisions.",
      avatar: "/placeholder.svg?height=50&width=50&text=MC",
      rating: 5,
    },
    {
      name: "Emily Rodriguez",
      role: "CMO",
      company: "Enterprise Inc",
      content:
        "Best marketing analytics platform we've used. The team loves the intuitive interface and powerful features.",
      avatar: "/placeholder.svg?height=50&width=50&text=ER",
      rating: 5,
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-100 relative overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0">
        {/* Floating Orbs */}
        <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-float"></div>
        <div
          className="absolute top-40 right-32 w-96 h-96 bg-purple-400/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "2s" }}
        ></div>
        <div
          className="absolute bottom-20 left-1/3 w-80 h-80 bg-teal-400/20 rounded-full blur-3xl animate-float"
          style={{ animationDelay: "4s" }}
        ></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>

        {/* Animated Particles */}
        {[...Array(30)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-blue-500/40 rounded-full animate-float"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 5}s`,
              animationDuration: `${3 + Math.random() * 4}s`,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 min-h-screen flex">
        {/* Left Side - Product Showcase */}
        <div className="hidden lg:flex lg:w-1/2 p-12 flex-col justify-center">
          <div
            className={`max-w-lg transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "-translate-x-10 opacity-0"}`}
          >
            {/* Logo */}
            <div className="flex items-center gap-3 mb-12">
              <div className="relative">
                <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-purple-600 rounded-2xl flex items-center justify-center shadow-xl hover:scale-110 transition-transform duration-300 cursor-pointer">
                  <Sparkles className="w-7 h-7 text-white" />
                </div>
                <div className="absolute -top-1 -right-1 w-4 h-4 bg-green-500 rounded-full animate-pulse"></div>
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-900">ADmyBRAND</h1>
                <p className="text-sm text-gray-600">Insights - a fictional analytics platform</p>
              </div>
            </div>

            {/* Main Heading */}
            <div className="mb-10">
              <h2 className="text-5xl font-bold text-gray-900 leading-tight mb-6">
                Unlock Your
                <span className="bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                  {" "}
                  Marketing{" "}
                </span>
                Potential
              </h2>
              <p className="text-xl text-gray-600 leading-relaxed">
                Gain a competitive edge with our data-driven insights and analytics.
              </p>
            </div>

            {/* Dashboard Preview Card */}
            <div className="mb-8">
              <Card className="bg-white/90 backdrop-blur-sm shadow-2xl border-0 hover:shadow-3xl transition-all duration-500 hover:scale-105">
                <CardHeader className="pb-4">
                  <h3 className="text-lg font-semibold text-gray-900">Audience Growth</h3>
                </CardHeader>
                <CardContent>
                  {/* Animated Chart */}
                  <div className="relative h-32 mb-6 bg-gradient-to-r from-teal-50 to-blue-50 rounded-lg p-4 overflow-hidden">
                    <svg className="w-full h-full" viewBox="0 0 300 100">
                      <defs>
                        <linearGradient id="chartGradient" x1="0%" y1="0%" x2="100%" y2="0%">
                          <stop offset="0%" stopColor="#14b8a6" />
                          <stop offset="100%" stopColor="#3b82f6" />
                        </linearGradient>
                      </defs>
                      <path
                        d="M 10 80 Q 50 60 100 50 T 200 30 T 290 20"
                        stroke="url(#chartGradient)"
                        strokeWidth="3"
                        fill="none"
                        className="animate-draw-line"
                      />
                      {/* Data points */}
                      <circle
                        cx="100"
                        cy="50"
                        r="4"
                        fill="#14b8a6"
                        className="animate-pulse"
                        style={{ animationDelay: "1s" }}
                      />
                      <circle
                        cx="200"
                        cy="30"
                        r="4"
                        fill="#3b82f6"
                        className="animate-pulse"
                        style={{ animationDelay: "1.5s" }}
                      />
                      <circle
                        cx="290"
                        cy="20"
                        r="4"
                        fill="#8b5cf6"
                        className="animate-pulse"
                        style={{ animationDelay: "2s" }}
                      />
                    </svg>
                    <TrendingUp
                      className="absolute top-2 right-2 w-5 h-5 text-green-600 animate-bounce"
                      style={{ animationDelay: "2.5s" }}
                    />
                  </div>

                  {/* Stats */}
                  <div className="grid grid-cols-2 gap-4">
                    <div className="text-center p-3 bg-white/80 rounded-lg">
                      <div className="text-2xl font-bold text-blue-600">63%</div>
                      <div className="text-sm text-gray-600">Engagement</div>
                      <div className="text-xs text-green-600 font-medium">+12%</div>
                    </div>
                    <div className="text-center p-3 bg-white/80 rounded-lg">
                      <div className="text-2xl font-bold text-purple-600">1,204</div>
                      <div className="text-sm text-gray-600">Conversions</div>
                      <div className="text-xs text-green-600 font-medium">+8.5%</div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Features */}
            <div className="space-y-4">
              {features.map((feature, index) => (
                <div
                  key={feature.title}
                  className={`flex items-center gap-4 p-4 bg-white/70 backdrop-blur-sm rounded-xl hover:bg-white/90 transition-all duration-300 hover:scale-105 group ${
                    isVisible ? "translate-x-0 opacity-100" : "-translate-x-4 opacity-0"
                  }`}
                  style={{ transitionDelay: `${800 + index * 150}ms` }}
                >
                  <div
                    className={`w-12 h-12 bg-gradient-to-br ${feature.color} rounded-xl flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300`}
                  >
                    <feature.icon className="w-6 h-6 text-white" />
                  </div>
                  <div>
                    <h4 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors">
                      {feature.title}
                    </h4>
                    <p className="text-sm text-gray-600">{feature.desc}</p>
                  </div>
                  <CheckCircle className="w-5 h-5 text-green-500 ml-auto opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                </div>
              ))}
            </div>

            {/* Testimonial */}
            <div className="mt-8">
              <Card className="bg-gradient-to-r from-blue-50 to-purple-50 border-0 shadow-lg">
                <CardContent className="p-6">
                  <div className="flex items-start gap-4">
                    <img
                      src={testimonials[currentTestimonial].avatar || "/placeholder.svg"}
                      alt={testimonials[currentTestimonial].name}
                      className="w-12 h-12 rounded-full border-2 border-white shadow-md"
                    />
                    <div className="flex-1">
                      <div className="flex items-center gap-1 mb-2">
                        {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                        ))}
                      </div>
                      <p className="text-sm text-gray-700 mb-3 italic">"{testimonials[currentTestimonial].content}"</p>
                      <div>
                        <p className="font-semibold text-gray-900">{testimonials[currentTestimonial].name}</p>
                        <p className="text-xs text-gray-600">
                          {testimonials[currentTestimonial].role} at {testimonials[currentTestimonial].company}
                        </p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full lg:w-1/2 flex items-center justify-center p-8">
          <div
            className={`w-full max-w-md transition-all duration-1000 ${isVisible ? "translate-x-0 opacity-100" : "translate-x-10 opacity-0"}`}
          >
            {/* Mobile Logo */}
            <div className="lg:hidden flex items-center justify-center gap-3 mb-8">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-600 to-purple-600 rounded-xl flex items-center justify-center shadow-lg">
                <Sparkles className="w-6 h-6 text-white" />
              </div>
              <span className="text-2xl font-bold text-gray-900">ADmyBRAND</span>
            </div>

            <Card className="bg-white/95 backdrop-blur-xl shadow-2xl border-0 hover:shadow-3xl transition-all duration-500 overflow-hidden">
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-blue-600 to-purple-600"></div>

              <CardHeader className="text-center pb-6 pt-8">
                <div className="mb-6">
                  <div className="w-20 h-20 bg-gradient-to-br from-blue-600 to-purple-600 rounded-3xl flex items-center justify-center mx-auto mb-6 hover:scale-110 transition-transform duration-300 shadow-xl">
                    <Lock className="w-10 h-10 text-white" />
                  </div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">Welcome Back</h2>
                  <p className="text-gray-600 text-lg">Login to access your marketing insights.</p>
                </div>
              </CardHeader>

              <CardContent className="space-y-6 px-8 pb-8">
                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Email Field */}
                  <div className="space-y-2">
                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                      Email Address
                    </Label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="you@example.com"
                        className={`pl-12 h-14 border-2 rounded-xl text-lg transition-all duration-300 ${
                          focusedField === "email"
                            ? "border-blue-500 ring-4 ring-blue-100 scale-105 shadow-lg"
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
                      <Lock className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        onFocus={() => setFocusedField("password")}
                        onBlur={() => setFocusedField(null)}
                        placeholder="••••••••"
                        className={`pl-12 pr-12 h-14 border-2 rounded-xl text-lg transition-all duration-300 ${
                          focusedField === "password"
                            ? "border-blue-500 ring-4 ring-blue-100 scale-105 shadow-lg"
                            : "border-gray-200 hover:border-gray-300"
                        }`}
                        required
                      />
                      <Button
                        type="button"
                        variant="ghost"
                        size="sm"
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 h-10 w-10 p-0 hover:bg-gray-100 rounded-lg"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                      </Button>
                    </div>
                  </div>

                  {/* Remember Me & Forgot Password */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                      <Checkbox
                        id="remember"
                        checked={rememberMe}
                        onCheckedChange={(checked) => setRememberMe(checked as boolean)}
                        className="data-[state=checked]:bg-blue-600 data-[state=checked]:border-blue-600 w-5 h-5"
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
                    className="w-full h-14 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-semibold text-lg rounded-xl transition-all duration-300 hover:scale-105 hover:shadow-xl disabled:opacity-50 disabled:cursor-not-allowed group"
                  >
                    {loading ? (
                      <div className="flex items-center gap-3">
                        <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                        <span>Signing in...</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-3">
                        <span>Log In</span>
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform duration-200" />
                      </div>
                    )}
                  </Button>
                </form>

                {/* Divider */}
                <div className="relative">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-gray-200"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-white text-gray-500">Or continue with</span>
                  </div>
                </div>

                {/* Demo Access */}
                <Button
                  variant="outline"
                  onClick={onStartDemo}
                  className="w-full h-14 border-2 border-gray-200 hover:border-blue-300 hover:bg-blue-50 transition-all duration-300 hover:scale-105 bg-transparent group text-lg font-medium"
                >
                  <div className="flex items-center gap-3">
                    <Play className="w-5 h-5 text-blue-600 group-hover:animate-pulse" />
                    <span>Try Demo Mode</span>
                  </div>
                </Button>

                {/* Sign Up Link */}
                <div className="text-center pt-4">
                  <p className="text-gray-600">
                    Don't have an account?{" "}
                    <Button
                      variant="link"
                      className="p-0 h-auto text-blue-600 hover:text-blue-700 font-semibold text-base"
                    >
                      Sign up for free
                    </Button>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
