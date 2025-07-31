"use client"
import { Home, BarChart3, Megaphone, Users, Settings, HelpCircle, X, Plus } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { cn } from "@/lib/utils"

interface SidebarProps {
  open: boolean
  onClose: () => void
  onNavigate: (page: string) => void
  currentPage: string
}

const navigation = [
  { name: "Dashboard", icon: Home, id: "dashboard" },
  { name: "Reports", icon: BarChart3, id: "reports" },
  { name: "Campaigns", icon: Megaphone, id: "campaigns" },
  { name: "Audiences", icon: Users, id: "audiences" },
  { name: "Settings", icon: Settings, id: "settings" },
]

export function Sidebar({ open, onClose, onNavigate, currentPage }: SidebarProps) {
  const handleNavigation = (pageId: string) => {
    onNavigate(pageId)
    onClose() // Close sidebar on mobile after navigation
  }

  const handleNewReport = () => {
    onNavigate("new-report")
    onClose()
  }

  const handleHelp = () => {
    onNavigate("help")
    onClose()
  }

  return (
    <>
      {/* Mobile overlay */}
      {open && <div className="fixed inset-0 z-40 bg-black/50 md:hidden" onClick={onClose} />}

      {/* Sidebar */}
      <div
        className={cn(
          "fixed inset-y-0 left-0 z-50 w-80 bg-background border-r transform transition-transform duration-200 ease-in-out md:relative md:translate-x-0",
          open ? "translate-x-0" : "-translate-x-full",
        )}
      >
        <div className="flex h-full flex-col">
          {/* Close button for mobile */}
          <div className="flex items-center justify-between p-4 md:hidden">
            <div className="flex items-center gap-3">
              <Avatar className="h-10 w-10">
                <AvatarImage src="/admybrand.jpg" />
                <AvatarFallback>AD</AvatarFallback>
              </Avatar>
              <span className="font-medium">ADmyBRAND</span>
            </div>
            <Button variant="ghost" size="icon" onClick={onClose}>
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Desktop header */}
          <div className="hidden md:flex items-center gap-3 p-4">
            <Avatar className="h-10 w-10">
              <AvatarImage src="/admybrand.jpg" />
              <AvatarFallback>AD</AvatarFallback>
            </Avatar>
            <span className="font-medium">ADmyBRAND</span>
          </div>

          {/* Navigation */}
          <nav className="flex-1 px-4 space-y-2">
            {navigation.map((item) => {
              const Icon = item.icon
              const isActive = currentPage === item.id

              return (
                <Button
                  key={item.name}
                  variant={isActive ? "secondary" : "ghost"}
                  className="w-full justify-start gap-3 h-12"
                  onClick={() => handleNavigation(item.id)}
                >
                  <Icon className="h-5 w-5" />
                  {item.name}
                </Button>
              )
            })}
          </nav>

          {/* Bottom section */}
          <div className="p-4 space-y-4">
            <Button className="w-full gap-2" onClick={handleNewReport}>
              <Plus className="h-4 w-4" />
              New Report
            </Button>

            <Button variant="ghost" className="w-full justify-start gap-3 h-12" onClick={handleHelp}>
              <HelpCircle className="h-5 w-5" />
              Help and feedback
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
