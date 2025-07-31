"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Play, Sparkles, Eye } from "lucide-react"

interface DemoBannerProps {
  onStartDemo: () => void
}

export function DemoBanner({ onStartDemo }: DemoBannerProps) {
  return (
    <Card className="border-2 border-dashed border-primary/30 bg-gradient-to-r from-primary/5 to-blue-500/5">
      <CardContent className="p-6 text-center">
        <div className="flex items-center justify-center gap-2 mb-3">
          <Sparkles className="h-5 w-5 text-primary" />
          <Badge variant="secondary" className="bg-primary/10 text-primary border-primary/20">
            Try Demo
          </Badge>
        </div>

        <h3 className="font-semibold text-lg mb-2">Explore Without Signing Up</h3>
        <p className="text-sm text-muted-foreground mb-4 max-w-md mx-auto">
          Take a guided tour of our platform with sample data. See how Marketing Insights can transform your marketing
          analytics.
        </p>

        <div className="flex flex-col sm:flex-row gap-3 justify-center items-center">
          <Button
            onClick={onStartDemo}
            className="gap-2 bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90"
          >
            <Play className="h-4 w-4" />
            Start Interactive Demo
          </Button>
          <div className="flex items-center gap-2 text-xs text-muted-foreground">
            <Eye className="h-3 w-3" />
            <span>No registration required • 5 min tour</span>
          </div>
        </div>

        <div className="mt-4 flex items-center justify-center gap-4 text-xs text-muted-foreground">
          <span>✓ Real dashboard preview</span>
          <span>✓ Sample campaigns</span>
          <span>✓ Live analytics</span>
        </div>
      </CardContent>
    </Card>
  )
}
