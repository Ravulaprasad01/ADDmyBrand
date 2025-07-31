'use client'

import Link from 'next/link'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { FileQuestion, Home } from 'lucide-react'

export default function NotFound() {
  return (
    <div className="flex items-center justify-center min-h-screen p-4 bg-blue-50">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="mx-auto mb-4 h-12 w-12 rounded-full bg-blue-100 flex items-center justify-center">
            <FileQuestion className="h-6 w-6 text-blue-600" />
          </div>
          <CardTitle className="text-xl">Page Not Found</CardTitle>
        </CardHeader>
        <CardContent className="text-center space-y-4">
          <p className="text-muted-foreground">
            The page you are looking for doesn't exist or has been moved.
          </p>
          <Button asChild className="w-full">
            <Link href="/">
              <Home className="h-4 w-4 mr-2" />
              Return to Dashboard
            </Link>
          </Button>
        </CardContent>
      </Card>
    </div>
  )
}