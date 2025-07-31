"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Star } from "lucide-react"

const testimonials = [
  {
    name: "Sarah Chen",
    role: "Marketing Director",
    company: "TechCorp",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    quote:
      "Marketing Insights transformed how we track ROI. Our campaign performance improved by 40% in just 3 months.",
  },
  {
    name: "Michael Rodriguez",
    role: "Growth Manager",
    company: "StartupXYZ",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    quote: "The real-time analytics and automated reports save us 10+ hours per week. Absolutely game-changing!",
  },
  {
    name: "Emily Johnson",
    role: "CMO",
    company: "Enterprise Inc",
    avatar: "/placeholder.svg?height=40&width=40",
    rating: 5,
    quote: "Best marketing analytics platform we've used. The audience segmentation features are incredibly powerful.",
  },
]

export function TestimonialsSection() {
  return (
    <div className="space-y-4">
      <div className="text-center">
        <h3 className="font-semibold text-lg mb-2">Trusted by Marketing Leaders</h3>
        <div className="flex items-center justify-center gap-1 mb-4">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
          ))}
          <span className="ml-2 text-sm text-muted-foreground">4.9/5 from 500+ reviews</span>
        </div>
      </div>

      <div className="space-y-3">
        {testimonials.map((testimonial, index) => (
          <Card key={index} className="border-0 bg-white/50 backdrop-blur-sm">
            <CardContent className="p-4">
              <div className="flex items-start gap-3">
                <Avatar className="h-10 w-10">
                  <AvatarImage src={testimonial.avatar || "/placeholder.svg"} />
                  <AvatarFallback>
                    {testimonial.name
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </AvatarFallback>
                </Avatar>
                <div className="flex-1 space-y-2">
                  <div className="flex items-center gap-1">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <Star key={i} className="h-3 w-3 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-sm text-gray-700 italic">"{testimonial.quote}"</p>
                  <div className="text-xs text-muted-foreground">
                    <span className="font-medium">{testimonial.name}</span> • {testimonial.role} at{" "}
                    {testimonial.company}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
