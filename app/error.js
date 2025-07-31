'use client'

import { useEffect } from 'react'
import { ErrorBoundary } from '@/components/error-boundary'

// This is a Client Component that will be used as a fallback for errors
export default function Error({
  error,
  reset,
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Unhandled error:', error)
  }, [error])

  return (
    <div className="flex items-center justify-center min-h-[400px] p-4">
      <div className="w-full max-w-md">
        <h2 className="text-xl font-bold mb-4">Something went wrong!</h2>
        <p className="text-muted-foreground mb-4">
          We encountered an unexpected error. Please try refreshing the page or click the button below to try again.
        </p>
        {process.env.NODE_ENV === 'development' && (
          <div className="bg-muted p-3 rounded mb-4">
            <p className="font-medium mb-2">Error Details:</p>
            <pre className="text-sm whitespace-pre-wrap">{error.message}</pre>
          </div>
        )}
        <button
          onClick={() => reset()}
          className="bg-primary text-primary-foreground hover:bg-primary/90 px-4 py-2 rounded w-full flex items-center justify-center"
        >
          Try again
        </button>
      </div>
    </div>
  )
}