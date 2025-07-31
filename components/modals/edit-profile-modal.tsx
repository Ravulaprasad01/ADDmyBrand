"use client"

import type React from "react"

import { useState, useRef } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { useAuth } from "@/contexts/auth-context"
import { User, Upload, Loader2 } from "lucide-react"

export function EditProfileModal() {
  const { profile, updateProfile, uploadAvatar } = useAuth()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    name: profile?.name || "",
    email: profile?.email || "",
    company: profile?.company || "",
    role: profile?.role || "",
    phone: profile?.phone || "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    const { error } = await updateProfile(formData)

    if (error) {
      setError(error.message || "Failed to update profile")
    } else {
      setSuccess("Profile updated successfully!")
      setTimeout(() => {
        setOpen(false)
        setSuccess("")
      }, 1500)
    }

    setLoading(false)
  }

  const handleAvatarUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file")
      return
    }

    // Validate file size (2MB max)
    if (file.size > 2 * 1024 * 1024) {
      setError("Image must be less than 2MB")
      return
    }

    setUploadingAvatar(true)
    setError("")

    const { error } = await uploadAvatar(file)

    if (error) {
      setError(error.message || "Failed to upload avatar")
    } else {
      setSuccess("Avatar updated successfully!")
    }

    setUploadingAvatar(false)
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" className="w-full justify-start">
          <User className="mr-2 h-4 w-4" />
          <span>Edit Profile</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>Edit Profile</DialogTitle>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert>
              <AlertDescription className="text-green-600">{success}</AlertDescription>
            </Alert>
          )}

          <div className="flex items-center gap-4">
            <div className="relative">
              <Avatar className="h-20 w-20">
                <AvatarImage src={profile?.avatar_url || "/placeholder.svg"} />
                <AvatarFallback className="text-lg">{profile?.name ? getInitials(profile.name) : "U"}</AvatarFallback>
              </Avatar>
              {uploadingAvatar && (
                <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                  <Loader2 className="h-6 w-6 text-white animate-spin" />
                </div>
              )}
            </div>
            <div>
              <Button type="button" variant="outline" size="sm" onClick={triggerFileInput} disabled={uploadingAvatar}>
                <Upload className="h-4 w-4 mr-2" />
                {uploadingAvatar ? "Uploading..." : "Change Photo"}
              </Button>
              <p className="text-sm text-muted-foreground mt-1">JPG, PNG or GIF. Max size 2MB.</p>
              <input ref={fileInputRef} type="file" accept="image/*" onChange={handleAvatarUpload} className="hidden" />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="name">Full Name</Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              placeholder="Enter your full name"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              placeholder="Enter your email"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="company">Company</Label>
            <Input
              id="company"
              value={formData.company}
              onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
              placeholder="Enter your company"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              value={formData.role}
              onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
              placeholder="Enter your role"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              value={formData.phone}
              onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
              placeholder="Enter your phone number"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button type="button" variant="outline" onClick={() => setOpen(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                "Save Changes"
              )}
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}
