"use client"

import { useEffect, useState } from "react"

export function AnimatedBackground() {
  const [particles, setParticles] = useState<Array<{ id: number; x: number; y: number; size: number; delay: number }>>(
    [],
  )

  useEffect(() => {
    const newParticles = Array.from({ length: 20 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      size: Math.random() * 4 + 2,
      delay: Math.random() * 5,
    }))
    setParticles(newParticles)
  }, [])

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none" style={{ zIndex: 1 }}>
      {/* Gradient Orbs */}
      <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-blue-400/20 to-purple-400/20 rounded-full blur-3xl animate-float"></div>
      <div
        className="absolute bottom-1/4 right-1/4 w-80 h-80 bg-gradient-to-r from-teal-400/20 to-blue-400/20 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "2s" }}
      ></div>
      <div
        className="absolute top-1/2 right-1/3 w-64 h-64 bg-gradient-to-r from-indigo-400/20 to-cyan-400/20 rounded-full blur-3xl animate-float"
        style={{ animationDelay: "4s" }}
      ></div>

      {/* Floating Particles */}
      {particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute bg-white/30 rounded-full animate-float"
          style={{
            left: `${particle.x}%`,
            top: `${particle.y}%`,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.delay}s`,
            animationDuration: `${3 + Math.random() * 2}s`,
          }}
        />
      ))}

      {/* Grid Pattern */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
    </div>
  )
}
