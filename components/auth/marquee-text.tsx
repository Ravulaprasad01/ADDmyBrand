"use client"

export function MarqueeText() {
  const messages = [
    "🚀 Boost ROI by 300% with AI-powered insights",
    "📊 Real-time analytics for smarter decisions",
    "🎯 Target audiences with precision marketing",
    "💡 Unlock growth opportunities instantly",
  ]

  return (
    <div className="bg-blue-600 text-white py-2 overflow-hidden relative">
      <div className="animate-marquee whitespace-nowrap">
        {messages.map((message, index) => (
          <span key={index} className="mx-8 text-sm font-medium">
            {message}
          </span>
        ))}
        {/* Duplicate for seamless loop */}
        {messages.map((message, index) => (
          <span key={`duplicate-${index}`} className="mx-8 text-sm font-medium">
            {message}
          </span>
        ))}
      </div>
    </div>
  )
}
