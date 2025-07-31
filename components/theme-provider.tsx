"use client"

import type React from "react"
import { useEffect, useState } from "react"
import { useTheme as useNextTheme } from "next-themes"

// Re-export the useTheme hook from next-themes with our custom interface
export const useTheme = () => {
  const { theme, setTheme, resolvedTheme, systemTheme } = useNextTheme()
  const [mounted, setMounted] = useState(false)
  
  // useEffect only runs on the client, so now we can safely show the UI
  useEffect(() => {
    setMounted(true)
  }, [])
  
  // Add the toggleTheme function to match our custom interface
  const toggleTheme = () => {
    // Use resolvedTheme as the source of truth for the current theme
    // This ensures we're toggling based on what's actually displayed
    if (!mounted) return
    
    const currentTheme = resolvedTheme || theme || 'light'
    console.log("Current theme:", currentTheme)
    console.log("Toggling to:", currentTheme === "light" ? "dark" : "light")
    setTheme(currentTheme === "light" ? "dark" : "light")
  }
  
  // If not mounted yet, return placeholders to avoid hydration mismatch
  if (!mounted) {
    return { theme: undefined, setTheme, toggleTheme, resolvedTheme: undefined, systemTheme: undefined }
  }
  
  return { theme, setTheme, toggleTheme, resolvedTheme, systemTheme }
}

// Export a dummy ThemeProvider for backward compatibility
// This is not actually used since we're using the ThemeProvider from next-themes in layout.tsx
export function ThemeProvider({ children }: { children: React.ReactNode }) {
  return <>{children}</>
}
