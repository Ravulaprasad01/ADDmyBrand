"use client"

import { useState, useEffect } from "react"

interface TypingAnimationProps {
  texts: string[]
  className?: string
}

export function TypingAnimation({ texts, className = "" }: TypingAnimationProps) {
  const [currentTextIndex, setCurrentTextIndex] = useState(0)
  const [currentText, setCurrentText] = useState("")
  const [isDeleting, setIsDeleting] = useState(false)

  useEffect(() => {
    const text = texts[currentTextIndex]
    const timeout = setTimeout(
      () => {
        if (!isDeleting) {
          setCurrentText(text.substring(0, currentText.length + 1))
          if (currentText === text) {
            setTimeout(() => setIsDeleting(true), 2000)
          }
        } else {
          setCurrentText(text.substring(0, currentText.length - 1))
          if (currentText === "") {
            setIsDeleting(false)
            setCurrentTextIndex((prev) => (prev + 1) % texts.length)
          }
        }
      },
      isDeleting ? 50 : 100,
    )

    return () => clearTimeout(timeout)
  }, [currentText, isDeleting, currentTextIndex, texts])

  return (
    <span className={className}>
      {currentText}
      <span className="animate-pulse">|</span>
    </span>
  )
}
