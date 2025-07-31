"use client"

import { useState } from "react"
import { Bell, Menu, Sun, Moon, Settings, CreditCard, LogOut, Sparkles } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { useTheme } from "next-themes"
import { useAuth } from "@/contexts/auth-context"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { EnhancedProfileModal } from "@/components/modals/enhanced-profile-modal"

interface HeaderProps {
  onMenuClick: () => void
}

const notifications = [
  {
    id: "1",
    title: "Campaign Performance Alert",
    message: "Summer Sale campaign is performing 20% above target",
    time: "2 minutes ago",
    read: false,
  },
  {
    id: "2",
    title: "Weekly Report Ready",
    message: "Your weekly performance report is now available",
    time: "1 hour ago",
    read: false,
  },
  {
    id: "3",
    title: "Budget Alert",
    message: "Holiday Promotion campaign has reached 80% of budget",
    time: "3 hours ago",
    read: true,
  },
]

export function Header({ onMenuClick }: HeaderProps) {
  const { setTheme, resolvedTheme } = useTheme()
  const { profile, signOut } = useAuth()
  const [notificationsList, setNotificationsList] = useState(notifications)

  const unreadCount = notificationsList.filter((n) => !n.read).length

  const markAsRead = (id: string) => {
    setNotificationsList((prev) =>
      prev.map((notification) => (notification.id === id ? { ...notification, read: true } : notification)),
    )
  }

  const markAllAsRead = () => {
    setNotificationsList((prev) => prev.map((notification) => ({ ...notification, read: true })))
  }

  const handleLogout = async () => {
    if (confirm("Are you sure you want to log out?")) {
      await signOut()
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

  return (
    <header className="border-b bg-white/95 dark:bg-zinc-900/95 backdrop-blur-xl supports-[backdrop-filter]:bg-white/80 dark:supports-[backdrop-filter]:bg-zinc-900/80 shadow-sm transition-colors duration-300">
      <div className="flex h-16 items-center justify-between px-4 sm:px-6">
        <div className="flex items-center gap-4">
          <Button
            variant="ghost"
            size="icon"
            className="md:hidden hover:scale-110 transition-transform duration-200"
            onClick={onMenuClick}
            aria-label="Open menu"
          >
            <Menu className="h-5 w-5 text-blue-600 dark:text-blue-400" />
          </Button>

          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-gradient-to-br from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-800 flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-300 cursor-pointer">
              <Sparkles className="h-5 w-5 text-white" />
            </div>
            <div>
              <h2 className="text-lg font-bold bg-gradient-to-r from-blue-600 to-purple-600 dark:from-blue-400 dark:to-purple-800 bg-clip-text text-transparent transition-colors duration-300">
                ADmyBRAND Insights
              </h2>
              <p className="text-xs text-gray-500 dark:text-gray-400">a fictional analytics platform</p>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          {/* Combined Theme Toggle */}
          <Button
            variant="outline"
            size="sm"
            onClick={() => {
              console.log("Theme toggle clicked");
              setTheme(resolvedTheme === "dark" ? "light" : "dark");
            }}
            className="hover:scale-105 transition-all duration-200 flex items-center gap-2 px-3 py-2 rounded-lg border-2 hover:border-blue-300 hover:bg-blue-50 dark:hover:bg-blue-900 dark:hover:border-blue-700 bg-transparent"
          >
            {resolvedTheme === "dark" ? (
              <>
                <Moon className="h-4 w-4 text-blue-500" />
                <span className="text-sm font-medium">Dark</span>
              </>
            ) : (
              <>
                <Sun className="h-4 w-4 text-yellow-500" />
                <span className="text-sm font-medium">Light</span>
              </>
            )}
          </Button>

          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="icon"
                className="relative hover:scale-110 transition-transform duration-200"
              >
                <Bell className="h-5 w-5" />
                {unreadCount > 0 && (
                  <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-gradient-to-r from-red-500 to-pink-500 animate-pulse">
                    {unreadCount}
                  </Badge>
                )}
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-80" align="end">
              <div className="space-y-4">
                <div className="flex items-center justify-between">
                  <h4 className="font-semibold">Notifications</h4>
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={markAllAsRead}
                      className="hover:scale-105 transition-transform duration-200"
                    >
                      Mark all as read
                    </Button>
                  )}
                </div>
                <div className="space-y-2">
                  {notificationsList.map((notification) => (
                    <div
                      key={notification.id}
                      className={`p-3 rounded-lg border cursor-pointer transition-all duration-200 hover:scale-105 ${
                        notification.read ? "bg-gray-50" : "bg-blue-50 hover:bg-blue-100 border-blue-200"
                      }`}
                      onClick={() => markAsRead(notification.id)}
                    >
                      <div className="flex items-start justify-between">
                        <div className="space-y-1 flex-1">
                          <p className="text-sm font-medium">{notification.title}</p>
                          <p className="text-xs text-gray-600">{notification.message}</p>
                          <p className="text-xs text-gray-500">{notification.time}</p>
                        </div>
                        {!notification.read && <div className="h-2 w-2 bg-blue-500 rounded-full mt-1 animate-pulse" />}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </PopoverContent>
          </Popover>

          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                variant="ghost"
                className="relative h-10 w-10 rounded-full hover:scale-110 transition-transform duration-200"
              >
                <Avatar className="h-10 w-10 border-2 border-white shadow-lg">
                  <AvatarImage src={profile?.avatar_url || "/placeholder.svg"} alt="Profile" />
                  <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white font-semibold">
                    {profile?.name ? getInitials(profile.name) : "U"}
                  </AvatarFallback>
                </Avatar>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-64" align="end" forceMount>
              <DropdownMenuLabel className="font-normal">
                <div className="flex flex-col space-y-2 p-2">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-12 w-12">
                      <AvatarImage src={profile?.avatar_url || "/placeholder.svg"} />
                      <AvatarFallback className="bg-gradient-to-br from-blue-500 to-purple-500 text-white">
                        {profile?.name ? getInitials(profile.name) : "U"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="text-sm font-medium leading-none">{profile?.name || "User"}</p>
                      <p className="text-xs leading-none text-gray-600 mt-1">{profile?.email}</p>
                      {profile?.company && <p className="text-xs text-gray-500 mt-1">{profile.company}</p>}
                    </div>
                  </div>
                </div>
              </DropdownMenuLabel>
              <DropdownMenuSeparator />
              <EnhancedProfileModal />
              <DropdownMenuItem
                onClick={() => alert("Quick Settings opened")}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <Settings className="mr-2 h-4 w-4" />
                <span>Quick Settings</span>
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={() => alert("Billing opened")}
                className="hover:bg-gray-50 transition-colors duration-200"
              >
                <CreditCard className="mr-2 h-4 w-4" />
                <span>Billing & Usage</span>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                onClick={handleLogout}
                className="text-red-600 hover:bg-red-50 transition-colors duration-200"
              >
                <LogOut className="mr-2 h-4 w-4" />
                <span>Log out</span>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>
    </header>
  )
}
