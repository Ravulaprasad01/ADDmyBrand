"use client"

import { Alert, AlertDescription } from "@/components/ui/alert"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { useAuth } from "@/contexts/auth-context"
import { Eye, X } from "lucide-react"
import { useState } from "react"

export function DemoBanner() {
  const { isDemoMode, signOut } = useAuth()
  const [dismissed, setDismissed] = useState(false)

  if (!isDemoMode || dismissed) return null

  return (
    <Alert className="border-blue-200 bg-gradient-to-r from-blue-50 to-indigo-50 mb-6">
      <Eye className="h-4 w-4 text-blue-600" />
      <AlertDescription className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Badge variant="secondary" className="bg-blue-100 text-blue-800 border-blue-200">
            Demo Mode
          </Badge>
          <span className="text-blue-800 text-sm">
            You're exploring with sample data. Sign up to access your real dashboard.
          </span>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={signOut}
            className="border-blue-300 text-blue-700 hover:bg-blue-100 bg-transparent"
          >
            Exit Demo
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setDismissed(true)}
            className="h-6 w-6 p-0 text-blue-600 hover:bg-blue-100"
          >
            <X className="h-3 w-3" />
          </Button>
        </div>
      </AlertDescription>
    </Alert>
  )
}
