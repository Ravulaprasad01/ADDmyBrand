"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import {
  User,
  Upload,
  Loader2,
  Settings,
  Bell,
  Shield,
  CreditCard,
  Camera,
  Save,
  Check,
  X,
  Sparkles,
  ImageIcon,
  Trash2,
  FileImage,
} from "lucide-react"

export function EnhancedProfileModal() {
  const { profile, updateProfile, uploadAvatar } = useAuth()
  const [open, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [uploadingAvatar, setUploadingAvatar] = useState(false)
  const [error, setError] = useState("")
  const [success, setSuccess] = useState("")
  const [dragActive, setDragActive] = useState(false)
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const [formData, setFormData] = useState({
    name: profile?.name || "",
    email: profile?.email || "",
    company: profile?.company || "",
    role: profile?.role || "",
    phone: profile?.phone || "",
    bio: profile?.bio || "",
  })

  const [settings, setSettings] = useState({
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
  })

  // Update form data when profile changes
  useEffect(() => {
    if (profile) {
      setFormData({
        name: profile.name || "",
        email: profile.email || "",
        company: profile.company || "",
        role: profile.role || "",
        phone: profile.phone || "",
        bio: profile.bio || "",
      })
    }
  }, [profile])

  // Clear preview URL when modal closes
  useEffect(() => {
    if (!open && previewUrl) {
      URL.revokeObjectURL(previewUrl)
      setPreviewUrl(null)
    }
  }, [open, previewUrl])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError("")
    setSuccess("")

    try {
      const { error } = await updateProfile(formData)
      if (error) {
        setError(error.message || "Failed to update profile")
      } else {
        setSuccess("Profile updated successfully!")
        setTimeout(() => setSuccess(""), 3000)
      }
    } catch (err) {
      setError("An unexpected error occurred")
    } finally {
      setLoading(false)
    }
  }

  const processImageFile = async (file: File) => {
    // Validate file type
    if (!file.type.startsWith("image/")) {
      setError("Please select an image file (JPG, PNG, GIF)")
      return
    }

    // Validate file size (5MB max)
    if (file.size > 5 * 1024 * 1024) {
      setError("Image must be less than 5MB")
      return
    }

    setUploadingAvatar(true)
    setError("")

    try {
      // Create preview URL immediately for instant feedback
      const objectUrl = URL.createObjectURL(file)
      setPreviewUrl(objectUrl)

      // Upload the file
      const { error, url } = await uploadAvatar(file)

      if (error) {
        setError(error.message || "Failed to upload avatar")
        // Clean up preview URL on error
        URL.revokeObjectURL(objectUrl)
        setPreviewUrl(null)
      } else {
        setSuccess("Avatar updated successfully!")
        setTimeout(() => setSuccess(""), 3000)
        // Keep the preview URL until modal closes or new image is uploaded
      }
    } catch (err) {
      setError("Failed to upload avatar")
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

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true)
    } else if (e.type === "dragleave") {
      setDragActive(false)
    }
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    setDragActive(false)

    const files = e.dataTransfer.files
    if (files && files[0]) {
      processImageFile(files[0])
    }
  }

  const triggerFileInput = () => {
    fileInputRef.current?.click()
  }

  const removeAvatar = async () => {
    setUploadingAvatar(true)
    setError("")
    try {
      await updateProfile({ avatar_url: "/placeholder.svg?height=100&width=100&text=U" })
      if (previewUrl) {
        URL.revokeObjectURL(previewUrl)
        setPreviewUrl(null)
      }
      setSuccess("Avatar removed successfully!")
      setTimeout(() => setSuccess(""), 3000)
    } catch (err) {
      setError("Failed to remove avatar")
    } finally {
      setUploadingAvatar(false)
    }
  }

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2)
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

  const currentAvatarUrl = previewUrl || profile?.avatar_url || "/placeholder.svg"
  const hasCustomAvatar = profile?.avatar_url && !profile.avatar_url.includes("placeholder.svg")

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button
          variant="ghost"
          className="w-full justify-start hover:bg-gray-50 transition-all duration-200 hover:scale-105"
        >
          <User className="mr-2 h-4 w-4" />
          <span>Profile & Settings</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="max-w-5xl max-h-[90vh] overflow-y-auto bg-gradient-to-br from-white to-gray-50">
        <DialogHeader className="border-b pb-4">
          <DialogTitle className="text-3xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent flex items-center gap-2">
            <Sparkles className="w-8 h-8 text-blue-600" />
            Profile & Settings
          </DialogTitle>
        </DialogHeader>

        {error && (
          <Alert variant="destructive" className="animate-in slide-in-from-top-2 duration-300 border-red-200 bg-red-50">
            <X className="h-4 w-4" />
            <AlertDescription>{error}</AlertDescription>
          </Alert>
        )}

        {success && (
          <Alert className="animate-in slide-in-from-top-2 duration-300 border-green-200 bg-green-50">
            <Check className="h-4 w-4 text-green-600" />
            <AlertDescription className="text-green-700">{success}</AlertDescription>
          </Alert>
        )}

        <Tabs defaultValue="profile" className="w-full">
          <TabsList className="grid w-full grid-cols-4 bg-gray-100 p-1 rounded-xl">
            <TabsTrigger
              value="profile"
              className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
            >
              <User className="w-4 h-4" />
              Profile
            </TabsTrigger>
            <TabsTrigger
              value="settings"
              className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
            >
              <Settings className="w-4 h-4" />
              Settings
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
            >
              <Bell className="w-4 h-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger
              value="billing"
              className="flex items-center gap-2 rounded-lg data-[state=active]:bg-white data-[state=active]:shadow-sm transition-all duration-200"
            >
              <CreditCard className="w-4 h-4" />
              Billing
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile" className="space-y-6 mt-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-t-lg">
                <CardTitle className="text-xl font-semibold text-gray-800">Personal Information</CardTitle>
              </CardHeader>
              <CardContent className="space-y-8 p-8">
                {/* Enhanced Avatar Section */}
                <div className="flex items-center gap-8">
                  <div className="relative group">
                    <div
                      className={`relative transition-all duration-300 cursor-pointer ${
                        dragActive ? "scale-110 ring-4 ring-blue-300" : ""
                      }`}
                      onDragEnter={handleDrag}
                      onDragLeave={handleDrag}
                      onDragOver={handleDrag}
                      onDrop={handleDrop}
                      onClick={triggerFileInput}
                    >
                      <Avatar className="h-32 w-32 border-4 border-white shadow-2xl hover:scale-105 transition-transform duration-300">
                        <AvatarImage src={currentAvatarUrl || "/placeholder.svg"} alt="Profile" />
                        <AvatarFallback className="text-2xl bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                          {profile?.name ? getInitials(profile.name) : "U"}
                        </AvatarFallback>
                      </Avatar>

                      {/* Upload overlay */}
                      <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                        <div className="text-white text-center">
                          <Camera className="h-6 w-6 mx-auto mb-1" />
                          <span className="text-xs">Change</span>
                        </div>
                      </div>

                      {uploadingAvatar && (
                        <div className="absolute inset-0 bg-black/50 rounded-full flex items-center justify-center">
                          <Loader2 className="h-8 w-8 text-white animate-spin" />
                        </div>
                      )}

                      {dragActive && (
                        <div className="absolute inset-0 bg-blue-500/20 rounded-full flex items-center justify-center border-2 border-dashed border-blue-400">
                          <div className="text-blue-600 text-center">
                            <ImageIcon className="h-8 w-8 mx-auto mb-1" />
                            <span className="text-xs">Drop here</span>
                          </div>
                        </div>
                      )}
                    </div>

                    <div className="absolute -bottom-2 -right-2 flex gap-2">
                      <Button
                        type="button"
                        size="sm"
                        className="h-10 w-10 rounded-full p-0 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 shadow-lg hover:scale-110 transition-all duration-200"
                        onClick={triggerFileInput}
                        disabled={uploadingAvatar}
                      >
                        <Camera className="h-5 w-5" />
                      </Button>
                      {hasCustomAvatar && (
                        <Button
                          type="button"
                          size="sm"
                          variant="destructive"
                          className="h-10 w-10 rounded-full p-0 shadow-lg hover:scale-110 transition-all duration-200"
                          onClick={removeAvatar}
                          disabled={uploadingAvatar}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <h3 className="text-2xl font-bold text-gray-900">{profile?.name || "User"}</h3>
                      <p className="text-gray-600 text-lg">{profile?.email}</p>
                      {profile?.company && <p className="text-gray-500">{profile.company}</p>}
                    </div>

                    <div className="space-y-3">
                      <div className="flex gap-3">
                        <Button
                          type="button"
                          variant="outline"
                          size="lg"
                          onClick={triggerFileInput}
                          disabled={uploadingAvatar}
                          className="hover:scale-105 transition-all duration-200 bg-transparent border-2 hover:border-blue-300 hover:bg-blue-50"
                        >
                          <Upload className="h-5 w-5 mr-2" />
                          {uploadingAvatar ? "Uploading..." : "Change Photo"}
                        </Button>
                        {hasCustomAvatar && (
                          <Button
                            type="button"
                            variant="outline"
                            size="lg"
                            onClick={removeAvatar}
                            disabled={uploadingAvatar}
                            className="hover:scale-105 transition-all duration-200 bg-transparent border-2 hover:border-red-300 hover:bg-red-50 text-red-600"
                          >
                            <Trash2 className="h-5 w-5 mr-2" />
                            Remove
                          </Button>
                        )}
                      </div>

                      <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                        <div className="flex items-center gap-2 mb-2">
                          <FileImage className="h-4 w-4 text-blue-600" />
                          <span className="text-sm font-medium text-blue-800">Upload Instructions</span>
                        </div>
                        <ul className="text-xs text-blue-700 space-y-1">
                          <li>• Supported formats: JPG, PNG, GIF</li>
                          <li>• Maximum file size: 5MB</li>
                          <li>• Drag and drop or click to upload</li>
                          <li>• Square images work best</li>
                        </ul>
                      </div>
                    </div>

                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleFileInputChange}
                      className="hidden"
                    />
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  <div className="grid gap-6 md:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="name" className="text-sm font-medium text-gray-700">
                        Full Name
                      </Label>
                      <Input
                        id="name"
                        value={formData.name}
                        onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                        placeholder="Enter your full name"
                        className="h-12 transition-all duration-200 focus:scale-105 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                        Email
                      </Label>
                      <Input
                        id="email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
                        placeholder="Enter your email"
                        className="h-12 transition-all duration-200 focus:scale-105 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="company" className="text-sm font-medium text-gray-700">
                        Company
                      </Label>
                      <Input
                        id="company"
                        value={formData.company}
                        onChange={(e) => setFormData((prev) => ({ ...prev, company: e.target.value }))}
                        placeholder="Enter your company"
                        className="h-12 transition-all duration-200 focus:scale-105 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="role" className="text-sm font-medium text-gray-700">
                        Role
                      </Label>
                      <Input
                        id="role"
                        value={formData.role}
                        onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
                        placeholder="Enter your role"
                        className="h-12 transition-all duration-200 focus:scale-105 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                        Phone
                      </Label>
                      <Input
                        id="phone"
                        value={formData.phone}
                        onChange={(e) => setFormData((prev) => ({ ...prev, phone: e.target.value }))}
                        placeholder="Enter your phone number"
                        className="h-12 transition-all duration-200 focus:scale-105 focus:ring-2 focus:ring-blue-500"
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="bio" className="text-sm font-medium text-gray-700">
                      Bio
                    </Label>
                    <textarea
                      id="bio"
                      value={formData.bio}
                      onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                      placeholder="Tell us about yourself"
                      className="w-full min-h-[120px] px-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 focus:scale-105 resize-none"
                    />
                  </div>

                  <Button
                    type="submit"
                    disabled={loading}
                    size="lg"
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 transition-all duration-300 hover:scale-105 h-12"
                  >
                    {loading ? (
                      <>
                        <Loader2 className="h-5 w-5 mr-2 animate-spin" />
                        Saving Changes...
                      </>
                    ) : (
                      <>
                        <Save className="h-5 w-5 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Settings Tab */}
          <TabsContent value="settings" className="space-y-6 mt-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg">
                <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Shield className="h-6 w-6 text-green-600" />
                  Privacy & Security
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-8">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div>
                    <Label className="text-base font-medium">Data Sharing</Label>
                    <p className="text-sm text-gray-600 mt-1">Allow sharing anonymized data for product improvement</p>
                  </div>
                  <Switch
                    checked={settings.privacy.dataSharing}
                    onCheckedChange={(checked) => updatePrivacy("dataSharing", checked)}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div>
                    <Label className="text-base font-medium">Analytics Tracking</Label>
                    <p className="text-sm text-gray-600 mt-1">Help us improve by tracking usage analytics</p>
                  </div>
                  <Switch
                    checked={settings.privacy.analytics}
                    onCheckedChange={(checked) => updatePrivacy("analytics", checked)}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div>
                    <Label className="text-base font-medium">Cookie Preferences</Label>
                    <p className="text-sm text-gray-600 mt-1">Allow cookies for better user experience</p>
                  </div>
                  <Switch
                    checked={settings.privacy.cookies}
                    onCheckedChange={(checked) => updatePrivacy("cookies", checked)}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications" className="space-y-6 mt-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-yellow-50 to-orange-50 rounded-t-lg">
                <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <Bell className="h-6 w-6 text-yellow-600" />
                  Notification Preferences
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6 p-8">
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div>
                    <Label className="text-base font-medium">Email Reports</Label>
                    <p className="text-sm text-gray-600 mt-1">Receive weekly performance reports via email</p>
                  </div>
                  <Switch
                    checked={settings.notifications.emailReports}
                    onCheckedChange={(checked) => updateNotification("emailReports", checked)}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div>
                    <Label className="text-base font-medium">Campaign Alerts</Label>
                    <p className="text-sm text-gray-600 mt-1">Get notified when campaigns need attention</p>
                  </div>
                  <Switch
                    checked={settings.notifications.campaignAlerts}
                    onCheckedChange={(checked) => updateNotification("campaignAlerts", checked)}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div>
                    <Label className="text-base font-medium">Weekly Digest</Label>
                    <p className="text-sm text-gray-600 mt-1">Summary of your marketing performance</p>
                  </div>
                  <Switch
                    checked={settings.notifications.weeklyDigest}
                    onCheckedChange={(checked) => updateNotification("weeklyDigest", checked)}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </div>
                <Separator />
                <div className="flex items-center justify-between p-4 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200">
                  <div>
                    <Label className="text-base font-medium">System Updates</Label>
                    <p className="text-sm text-gray-600 mt-1">Important updates about the platform</p>
                  </div>
                  <Switch
                    checked={settings.notifications.systemUpdates}
                    onCheckedChange={(checked) => updateNotification("systemUpdates", checked)}
                    className="data-[state=checked]:bg-blue-600"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Billing Tab */}
          <TabsContent value="billing" className="space-y-6 mt-6">
            <Card className="shadow-lg border-0 bg-white/80 backdrop-blur-sm hover:shadow-xl transition-all duration-300">
              <CardHeader className="bg-gradient-to-r from-purple-50 to-pink-50 rounded-t-lg">
                <CardTitle className="text-xl font-semibold text-gray-800 flex items-center gap-2">
                  <CreditCard className="h-6 w-6 text-purple-600" />
                  Billing & Subscription
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-8 p-8">
                <div className="flex items-center justify-between p-6 bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl border border-blue-200">
                  <div>
                    <Label className="text-xl font-bold text-gray-900">Current Plan</Label>
                    <p className="text-gray-600 mt-1">Professional Plan - Full Access</p>
                  </div>
                  <Badge className="bg-gradient-to-r from-green-500 to-blue-500 text-white px-4 py-2 text-sm font-medium">
                    Active
                  </Badge>
                </div>

                <div className="grid gap-6 md:grid-cols-2">
                  <div className="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-300 transition-colors duration-200 bg-gradient-to-br from-white to-gray-50">
                    <Label className="text-lg font-semibold text-gray-900">Next Billing Date</Label>
                    <p className="text-gray-600 mt-2 text-lg">February 15, 2024</p>
                  </div>
                  <div className="p-6 border-2 border-gray-200 rounded-xl hover:border-blue-300 transition-colors duration-200 bg-gradient-to-br from-white to-gray-50">
                    <Label className="text-lg font-semibold text-gray-900">Amount</Label>
                    <p className="text-gray-600 mt-2 text-lg">$99/month</p>
                  </div>
                </div>

                <div className="flex flex-wrap gap-4">
                  <Button
                    variant="outline"
                    size="lg"
                    className="hover:scale-105 transition-all duration-200 bg-transparent border-2 hover:border-blue-300 hover:bg-blue-50"
                  >
                    Change Plan
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="hover:scale-105 transition-all duration-200 bg-transparent border-2 hover:border-blue-300 hover:bg-blue-50"
                  >
                    Update Payment Method
                  </Button>
                  <Button
                    variant="outline"
                    size="lg"
                    className="hover:scale-105 transition-all duration-200 bg-transparent border-2 hover:border-blue-300 hover:bg-blue-50"
                  >
                    View Billing History
                  </Button>
                </div>

                <div className="p-6 bg-gradient-to-r from-yellow-50 to-orange-50 border-2 border-yellow-200 rounded-xl">
                  <h4 className="text-lg font-semibold text-yellow-800 mb-4">Usage This Month</h4>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-gray-700 font-medium">API Calls</span>
                      <span className="text-gray-900 font-semibold">8,500 / 10,000</span>
                    </div>
                    <div className="w-full bg-yellow-200 rounded-full h-3">
                      <div
                        className="bg-gradient-to-r from-yellow-500 to-orange-500 h-3 rounded-full transition-all duration-500"
                        style={{ width: "85%" }}
                      ></div>
                    </div>
                    <p className="text-sm text-yellow-700">You're using 85% of your monthly quota</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </DialogContent>
    </Dialog>
  )
}
