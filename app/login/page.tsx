"use client"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { NewLoginPage } from "@/components/auth/new-login-page"
import { useAuth } from "@/contexts/auth-context"

export default function LoginPage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    // If user is already logged in, redirect to dashboard
    if (user && !loading) {
      router.push('/')
    }
  }, [user, loading, router])

  // Only render the login page if not logged in
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-10 h-10 border-4 border-blue-600 border-t-transparent rounded-full animate-spin"></div>
      </div>
    )
  }

  // If not logged in, show the login page
  if (!user) {
    return <NewLoginPage />
  }

  // This should not be visible due to the redirect in useEffect
  return null
}