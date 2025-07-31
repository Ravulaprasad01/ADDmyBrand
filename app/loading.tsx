'use client'

import { LoadingSpinner } from '@/components/loading-spinner'

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-blue-50">
      <LoadingSpinner size="lg" />
    </div>
  )
}