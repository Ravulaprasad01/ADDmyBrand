"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import type { ButtonProps } from "@/components/ui/button"

interface PulseButtonProps extends ButtonProps {
  children: React.ReactNode
}

export function PulseButton({ children, className, ...props }: PulseButtonProps) {
  return (
    <Button
      className={cn(
        "relative overflow-hidden transition-all duration-300 hover:scale-105 hover:shadow-lg",
        "before:absolute before:inset-0 before:bg-gradient-to-r before:from-transparent before:via-white/20 before:to-transparent",
        "before:translate-x-[-100%] hover:before:translate-x-[100%] before:transition-transform before:duration-700",
        className,
      )}
      {...props}
    >
      {children}
    </Button>
  )
}

<PulseButton
  variant="outline"
  size="sm"
  onClick={handleDemoLogin}
  className="border-blue-300 text-blue-700 hover:bg-blue-100 bg-transparent hover:scale-110 shadow-sm"
  disabled={loading}
>
  Demo Login
</PulseButton>
