"use client"

import type React from "react"

import { createContext, useContext, useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

interface User {
  id: string
  email: string
  name?: string
  avatar_url?: string
  company?: string
  role?: string
  phone?: string
  bio?: string
}

interface AuthContextType {
  user: User | null
  profile: User | null
  loading: boolean
  isDemoMode: boolean
  signIn: (email: string, password: string) => Promise<{ error?: any }>
  signUp: (email: string, password: string, userData?: Partial<User>) => Promise<{ error?: any }>
  signOut: () => Promise<void>
  updateProfile: (data: Partial<User>) => Promise<{ error?: any }>
  uploadAvatar: (file: File) => Promise<{ error?: any; url?: string }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<User | null>(null)
  const [loading, setLoading] = useState(true)
  const [isDemoMode, setIsDemoMode] = useState(false)

  useEffect(() => {
    // Check for existing session
    const checkSession = async () => {
      try {
        const {
          data: { session },
        } = await supabase.auth.getSession()
        if (session?.user) {
          const userData = {
            id: session.user.id,
            email: session.user.email!,
            name: session.user.user_metadata?.name || session.user.email?.split("@")[0],
            avatar_url: session.user.user_metadata?.avatar_url,
            company: session.user.user_metadata?.company,
            role: session.user.user_metadata?.role,
            phone: session.user.user_metadata?.phone,
            bio: session.user.user_metadata?.bio,
          }
          setUser(userData)
          setProfile(userData)
          setIsDemoMode(false)
        }
      } catch (error) {
        console.error("Session check error:", error)
      } finally {
        setLoading(false)
      }
    }

    checkSession()

    // Listen for auth changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (session?.user) {
        const userData = {
          id: session.user.id,
          email: session.user.email!,
          name: session.user.user_metadata?.name || session.user.email?.split("@")[0],
          avatar_url: session.user.user_metadata?.avatar_url,
          company: session.user.user_metadata?.company,
          role: session.user.user_metadata?.role,
          phone: session.user.user_metadata?.phone,
          bio: session.user.user_metadata?.bio,
        }
        setUser(userData)
        setProfile(userData)
        setIsDemoMode(false)
      } else {
        setUser(null)
        setProfile(null)
        setIsDemoMode(false)
      }
      setLoading(false)
    })

    return () => subscription.unsubscribe()
  }, [])

  const signIn = async (email: string, password: string) => {
    try {
      // For demo purposes, simulate successful login
      if (email === "demo@marketinginsights.com" && password === "demo123") {
        const demoUser = {
          id: "demo-user",
          email: "demo@marketinginsights.com",
          name: "Demo User",
          company: "Marketing Insights Inc.",
          role: "Marketing Manager",
          phone: "+1 (555) 123-4567",
          bio: "Experienced marketing professional with a passion for data-driven insights.",
          avatar_url: "/placeholder.svg?height=100&width=100&text=DU",
        }
        setUser(demoUser)
        setProfile(demoUser)
        setIsDemoMode(true)
        return { error: null }
      }

      try {
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        })

        if (error) return { error }
        return { error: null }
      } catch (fetchError) {
        console.error("Supabase connection error:", fetchError);
        return { error: { message: "Unable to connect to authentication service. Please check your internet connection or try again later." } }
      }
    } catch (error) {
      return { error }
    }
  }

  const signUp = async (email: string, password: string, userData?: Partial<User>) => {
    try {
      try {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: userData || {},
          },
        })

        if (error) return { error }
        return { error: null }
      } catch (fetchError) {
        console.error("Supabase connection error during signup:", fetchError);
        return { error: { message: "Unable to connect to authentication service. Please check your internet connection or try again later." } }
      }
    } catch (error) {
      return { error }
    }
  }

  const signOut = async () => {
    try {
      await supabase.auth.signOut()
      setUser(null)
      setProfile(null)
      setIsDemoMode(false)
      
      // Redirect to login page after logout
      window.location.href = '/login'
    } catch (error) {
      console.error("Sign out error:", error)
    }
  }

  const updateProfile = async (data: Partial<User>) => {
    try {
      // For demo purposes, update local state
      if (user?.id === "demo-user" || isDemoMode) {
        const updatedProfile = { ...profile, ...data }
        setProfile(updatedProfile as User)
        setUser(updatedProfile as User)
        return { error: null }
      }

      const { error } = await supabase.auth.updateUser({
        data: data,
      })

      if (error) return { error }

      // Update local state
      const updatedProfile = { ...profile, ...data }
      setProfile(updatedProfile as User)
      setUser(updatedProfile as User)

      return { error: null }
    } catch (error) {
      return { error }
    }
  }

  const uploadAvatar = async (file: File): Promise<{ error?: any; url?: string }> => {
    try {
      // Validate file
      if (!file.type.startsWith("image/")) {
        return { error: { message: "Please select an image file" } }
      }

      if (file.size > 5 * 1024 * 1024) {
        return { error: { message: "Image must be less than 5MB" } }
      }

      // Create a local URL for immediate preview
      const localUrl = URL.createObjectURL(file)

      // Update profile immediately with local URL for instant feedback
      const updatedProfile = { ...profile, avatar_url: localUrl }
      setProfile(updatedProfile as User)
      setUser(updatedProfile as User)

      // For demo purposes, keep the local URL
      if (user?.id === "demo-user" || isDemoMode) {
        // Simulate upload delay
        await new Promise((resolve) => setTimeout(resolve, 1000))
        return { error: null, url: localUrl }
      }

      // For real users, upload to Supabase
      const fileExt = file.name.split(".").pop()
      const fileName = `${user?.id}-${Date.now()}.${fileExt}`
      // Store avatars in a public folder
      const filePath = `public/${fileName}`

      // For demo mode, skip Supabase storage operations
      if (user?.id === "demo-user" || isDemoMode) {
        // Skip storage operations for demo mode
        console.log("Demo mode: Using local URL");
        return { error: null, url: localUrl };
      }
      
      // Try to upload the file to the default bucket
      console.log("Attempting to upload avatar to Supabase...");
      try {
        // Check if the bucket exists first
        try {
          // First try to upload to the default bucket
          const { error: uploadError } = await supabase.storage.from("avatars").upload(filePath, file, {
            upsert: true,
          })

          if (uploadError) {
            console.error("Upload error:", uploadError);
            
            // If we get a bucket not found error, just use the local URL
            if (uploadError.message.includes("Bucket not found") || 
                uploadError.message.includes("row-level security policy") ||
                uploadError.message.includes("permission")) {
              console.log("Using local URL as fallback due to storage error");
              // Show a more helpful message in the console for developers
              console.warn("IMPORTANT: The 'avatars' bucket is missing in your Supabase project. Please run the SQL scripts in scripts/create-tables.sql to create it.");
              return { error: null, url: localUrl };
            }
            
            // For other errors, revert to previous avatar
            setProfile(profile);
            setUser(user);
            URL.revokeObjectURL(localUrl);
            return { error: uploadError };
          }

          // If upload succeeded, get the public URL
          console.log("Avatar uploaded successfully, getting public URL...");
          const { data } = supabase.storage.from("avatars").getPublicUrl(filePath);
          
          // Update profile with the actual Supabase URL
          await updateProfile({ avatar_url: data.publicUrl });
          URL.revokeObjectURL(localUrl);

          return { error: null, url: data.publicUrl };
        } catch (bucketError) {
          console.error("Error accessing storage bucket:", bucketError);
          console.warn("IMPORTANT: The 'avatars' bucket is missing in your Supabase project. Please run the SQL scripts in scripts/create-tables.sql to create it.");
          // Use local URL as fallback
          return { error: null, url: localUrl };
        }
      } catch (error) {
        console.error("Exception during upload or getting URL:", error);
        // Keep the local URL as a fallback for any errors
        return { error: null, url: localUrl };
      }
    } catch (error) {
      // Revert to previous avatar on error
      setProfile(profile)
      setUser(user)
      return { error }
    }
  }

  const value = {
    user,
    profile,
    loading,
    isDemoMode,
    signIn,
    signUp,
    signOut,
    updateProfile,
    uploadAvatar,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}
