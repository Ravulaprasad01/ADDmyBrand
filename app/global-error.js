'use client'

import { useEffect } from 'react'
import { Button } from '@/components/ui/button'

export default function GlobalError({
  error,
  reset,
}) {
  useEffect(() => {
    // Log the error to an error reporting service
    console.error('Global error:', error)
  }, [error])

  return (
    <html>
      <body>
        <div className="flex items-center justify-center min-h-screen p-4 bg-blue-50">
          <div className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
            <h2 className="text-2xl font-bold text-center mb-6">Something went very wrong!</h2>
            <p className="text-gray-600 mb-6 text-center">
              A critical error has occurred. Please try refreshing the page.
            </p>
            <div className="flex justify-center">
              <Button 
                onClick={() => reset()}
                className="bg-blue-600 hover:bg-blue-700 text-white font-medium py-2 px-4 rounded"
              >
                Try again
              </Button>
            </div>
          </div>
        </div>
      </body>
    </html>
  )
}