"use client"

import { useState, useRef } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { User, Bell, Shield, CreditCard, Users, Save, Upload, Loader2, Trash2 } from "lucide-react"
import { useAuth } from "@/contexts/auth-context"

function SettingsPage() {
  const { profile, updateProfile, uploadAvatar } = useAuth()
  const [loading, setLoading] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [settings, setSettings] = useState({
    profile: {
      name: profile?.name || "John Doe",
      email: profile?.email || "john.doe@company.com",
      company: profile?.company || "Marketing Insights Inc.",
      role: profile?.role || "Marketing Manager",
    },
    notifications: {
      emailReports: true,
      campaignAlerts: true,
      weeklyDigest: false,
      systemUpdates: true,
    },
    privacy: {
      dataSharing: false,
      analytics: true,
      cookies: true,
    },
    billing: {
      plan: "Professional",
      nextBilling: "2024-02-15",
      amount: "$99/month",
    },
  })

  const handleSaveProfile = () => {
    setLoading(true)
    updateProfile({
      name: settings.profile.name,
      email: settings.profile.email,
      company: settings.profile.company,
      role: settings.profile.role,
    }).then(() => {
      setLoading(false)
      alert("Profile settings saved!")
    })
  }

  const handleSaveNotifications = () => {
    alert("Notification settings saved!")
  }

  const handleSavePrivacy = () => {
    alert("Privacy settings saved!")
  }

  const updateNotification = (key: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }))
  }

  const updatePrivacy = (key: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value,
      },
    }))
  }

  const processImageFile = async (file: File) => {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      alert("Please select an image file (JPG, PNG, GIF)")
      return
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      alert("Image must be less than 5MB")
      return
    }

    setUploadingAvatar(true)

    try {
      // Create preview URL immediately for instant feedback
      const objectUrl = URL.createObjectURL(file)
      setPreviewUrl(objectUrl)

      // Upload the file
      const { error, url } = await uploadAvatar(file)

      if (error) {
        alert(error.message || "Failed to upload avatar")
        // Clean up preview URL on error
        URL.revokeObjectURL(objectUrl)
        setPreviewUrl(null)
      } else {
        alert("Avatar updated successfully!")
        // Keep the preview URL until new image is uploaded
      }
    } catch (err) {
      alert("Failed to upload avatar")
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
        setPreviewUrl(null)
      }
    } finally {
      setUploadingAvatar(false)
    }
  }

  const handleFileInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      processImageFile(file)
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const removeAvatar = async () => {
    setUploadingAvatar(true)
    try {
      await updateProfile({ avatar_url: "/placeholder.svg?height=100&width=100&text=U" })
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
        setPreviewUrl(null)
      }
      alert("Avatar removed successfully!")
    } catch (error) {
      alert("Failed to remove avatar")
    } finally {
      setUploadingAvatar(false)
    }
  }

  const currentAvatarUrl = previewUrl || profile?.avatar_url || "/placeholder.svg"
  const hasCustomAvatar = profile?.avatar_url && !profile.avatar_url.includes("placeholder.svg")

  return (
    <div className="space-y-8 animate-fade-in">
      <div>
        <h1 className="text-4xl font-extrabold tracking-tight bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
          Settings
        </h1>
        <p className="text-muted-foreground text-lg">Manage your account settings and preferences</p>
      </div>

      <div className="grid gap-8">
        {/* Profile Settings */}
        <Card className="transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <User className="h-5 w-5 text-blue-500" />
              Profile Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center gap-4">
              <div className="relative group">
                <Avatar className="h-20 w-20 border-4 border-transparent group-hover:border-blue-400 transition-all duration-300 shadow-lg ring-2 ring-blue-200 group-hover:ring-pink-300">
                  <AvatarImage src={currentAvatarUrl} alt="Profile" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                    {settings.profile.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")
                      .toUpperCase()
                      .slice(0, 2)}
                  </AvatarFallback>
                </Avatar>
                <button
                  onClick={triggerFileInput}
                  className="absolute bottom-0 right-0 bg-blue-600 text-white rounded-full p-2 shadow-lg opacity-80 hover:opacity-100 transition-all duration-200"
                  title="Upload Photo"
                  disabled={uploadingAvatar}
                >
                  <Upload className="h-4 w-4" />
                </button>
              </div>
              <input
                type="file"
                ref={fileInputRef}
                onChange={handleFileInputChange}
                accept="image/*"
                className="hidden"
              />
              <div className="space-y-2">
                {(hasCustomAvatar || previewUrl) && (
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={removeAvatar}
                    disabled={uploadingAvatar}
                    className="flex items-center gap-1 text-red-500 hover:text-red-600 hover:bg-red-50 transition-all"
                  >
                    <Trash2 className="h-4 w-4" />
                    Remove
                  </Button>
                )}
                <p className="text-sm text-muted-foreground">JPG, PNG or GIF. Max size 5MB.</p>
              </div>
            </div>

            <div className="grid gap-4 md:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="name">Full Name</Label>
                <Input
                  id="name"
                  value={settings.profile.name}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      profile: { ...prev.profile, name: e.target.value },
                    }))
                  }
                  className="transition-all focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  value={settings.profile.email}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      profile: { ...prev.profile, email: e.target.value },
                    }))
                  }
                  className="transition-all focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="company">Company</Label>
                <Input
                  id="company"
                  value={settings.profile.company}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      profile: { ...prev.profile, company: e.target.value },
                    }))
                  }
                  className="transition-all focus:ring-2 focus:ring-blue-400"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="role">Role</Label>
                <Input
                  id="role"
                  value={settings.profile.role}
                  onChange={(e) =>
                    setSettings((prev) => ({
                      ...prev,
                      profile: { ...prev.profile, role: e.target.value },
                    }))
                  }
                  className="transition-all focus:ring-2 focus:ring-blue-400"
                />
              </div>
            </div>

            <Button
              onClick={handleSaveProfile}
              disabled={loading}
              className="mt-2 bg-gradient-to-r from-blue-500 to-pink-500 text-white hover:from-pink-500 hover:to-blue-500 transition-all"
            >
              {loading ? (
                <>
                  <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                  Saving...
                </>
              ) : (
                <>
                  <Save className="h-4 w-4 mr-2" />
                  Save Profile
                </>
              )}
            </Button>
          </CardContent>
        </Card>

        {/* Notification Settings */}
        <Card className="transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-pink-500" />
              Notification Settings
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                key: "emailReports",
                label: "Email Reports",
                desc: "Receive weekly performance reports via email",
              },
              {
                key: "campaignAlerts",
                label: "Campaign Alerts",
                desc: "Get notified about campaign performance changes",
              },
              {
                key: "weeklyDigest",
                label: "Weekly Digest",
                desc: "Receive a summary of your weekly marketing activities",
              },
              {
                key: "systemUpdates",
                label: "System Updates",
                desc: "Get notified about new features and updates",
              },
            ].map((item, idx) => (
              <div key={item.key}>
                <div className="flex items-center justify-between group">
                  <div>
                    <Label>{item.label}</Label>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch
                    checked={settings.notifications[item.key as keyof typeof settings.notifications]}
                    onCheckedChange={(checked) => updateNotification(item.key, checked)}
                    className="transition-all group-hover:ring-2 group-hover:ring-blue-400"
                  />
                </div>
                {idx < 3 && <Separator className="my-3" />}
              </div>
            ))}
            <Button
              onClick={handleSaveNotifications}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-purple-500 hover:to-blue-500 transition-all"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Notifications
            </Button>
          </CardContent>
        </Card>

        {/* Privacy Settings */}
        <Card className="transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Shield className="h-5 w-5 text-purple-500" />
              Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            {[
              {
                key: "dataSharing",
                label: "Data Sharing",
                desc: "Allow sharing anonymized data for product improvement",
              },
              {
                key: "analytics",
                label: "Analytics Tracking",
                desc: "Help us improve by tracking usage analytics",
              },
              {
                key: "cookies",
                label: "Cookie Preferences",
                desc: "Allow cookies for better user experience",
              },
            ].map((item, idx) => (
              <div key={item.key}>
                <div className="flex items-center justify-between group">
                  <div>
                    <Label>{item.label}</Label>
                    <p className="text-sm text-muted-foreground">{item.desc}</p>
                  </div>
                  <Switch
                    checked={settings.privacy[item.key as keyof typeof settings.privacy]}
                    onCheckedChange={(checked) => updatePrivacy(item.key, checked)}
                    className="transition-all group-hover:ring-2 group-hover:ring-purple-400"
                  />
                </div>
                {idx < 2 && <Separator className="my-3" />}
              </div>
            ))}
            <Button
              onClick={handleSavePrivacy}
              className="bg-gradient-to-r from-purple-500 to-pink-500 text-white hover:from-pink-500 hover:to-purple-500 transition-all"
            >
              <Save className="h-4 w-4 mr-2" />
              Save Privacy Settings
            </Button>
          </CardContent>
        </Card>

        {/* Billing Information */}
        <Card className="transition-all duration-300 hover:shadow-2xl hover:scale-[1.01] bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-0">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <CreditCard className="h-5 w-5 text-green-500" />
              Billing Information
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <p className="text-sm font-medium">Current Plan</p>
                <div className="flex items-center gap-2 mt-1">
                  <Badge className="bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-md">{settings.billing.plan}</Badge>
                  <span className="text-sm text-muted-foreground">{settings.billing.amount}</span>
                </div>
              </div>
              <div>
                <p className="text-sm font-medium">Next Billing Date</p>
                <p className="text-sm text-muted-foreground mt-1">{settings.billing.nextBilling}</p>
              </div>
            </div>

            <div className="flex items-center gap-4">
              <Button variant="outline" className="hover:bg-blue-50 hover:text-blue-700 transition-all">Manage Subscription</Button>
              <Button variant="outline" className="hover:bg-purple-50 hover:text-purple-700 transition-all">Billing History</Button>
            </div>

            <div className="bg-gradient-to-r from-blue-50 to-pink-50 dark:from-zinc-800 dark:to-zinc-900 p-4 rounded-lg border mt-4 transition-all hover:shadow-md">
              <div className="flex items-center gap-2">
                <Users className="h-5 w-5 text-blue-600" />
                <p className="font-medium">Team Members</p>
              </div>
              <p className="text-sm text-muted-foreground mt-1">Your plan includes up to 5 team members</p>
              <Button variant="outline" size="sm" className="mt-2 hover:bg-blue-100 hover:text-blue-700 transition-all">
                Manage Team
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default SettingsPage
