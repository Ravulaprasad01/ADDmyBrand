import { createClient } from "@supabase/supabase-js"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL!
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!

export const supabase = createClient(supabaseUrl, supabaseAnonKey)

// Export the createClient function for use in contexts
export { createClient }

// Auth helper functions
export const signUp = async (email: string, password: string, userData: any) => {
  const { data, error } = await supabase.auth.signUp({
    email,
    password,
    options: {
      data: userData,
    },
  })
  return { data, error }
}

export const signIn = async (email: string, password: string) => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email,
    password,
  })
  return { data, error }
}

export const signOut = async () => {
  const { error } = await supabase.auth.signOut()
  return { error }
}

export const getCurrentUser = async () => {
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser()
  return { user, error }
}

export const updateProfile = async (userId: string, updates: any) => {
  const { data, error } = await supabase
    .from("profiles")
    .upsert({ id: userId, ...updates })
    .select()
  return { data, error }
}

export const uploadAvatar = async (userId: string, file: File) => {
  const fileExt = file.name.split(".").pop()
  const fileName = `${userId}.${fileExt}`
  const filePath = `avatars/${fileName}`

  const { data, error } = await supabase.storage.from("avatars").upload(filePath, file, { upsert: true })

  if (error) return { data: null, error }

  const {
    data: { publicUrl },
  } = supabase.storage.from("avatars").getPublicUrl(filePath)

  return { data: { path: filePath, url: publicUrl }, error: null }
}
