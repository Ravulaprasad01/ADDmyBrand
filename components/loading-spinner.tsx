import { cn } from "@/lib/utils"

interface LoadingSpinnerProps {
  size?: "sm" | "md" | "lg"
  className?: string
}

export function LoadingSpinner({ size = "md", className }: LoadingSpinnerProps) {
  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-8 w-8",
    lg: "h-12 w-12",
  }

  return (
    <div
      className={cn(
        "animate-spin rounded-full border-2 border-gray-300 border-t-primary",
        sizeClasses[size],
        className,
      )}
    />
  )
}

export function LoadingCard() {
  return (
    <div className="animate-pulse">
      <div className="bg-muted rounded-lg h-32 w-full" />
    </div>
  )
}

export function LoadingTable() {
  return (
    <div className="space-y-3">
      {Array.from({ length: 5 }).map((_, i) => (
        <div key={i} className="animate-pulse flex space-x-4">
          <div className="rounded bg-muted h-4 w-1/4" />
          <div className="rounded bg-muted h-4 w-1/4" />
          <div className="rounded bg-muted h-4 w-1/4" />
          <div className="rounded bg-muted h-4 w-1/4" />
        </div>
      ))}
    </div>
  )
}
