"use client"

import { useEffect, useState } from "react"

export function PageViewCounter() {
  const [views, setViews] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    // Simulate fetching page views
    const storedViews = localStorage.getItem("pageViews")
    const currentViews = storedViews ? Number.parseInt(storedViews) : 1247
    const newViews = currentViews + 1

    localStorage.setItem("pageViews", newViews.toString())

    // Animate counter
    setIsAnimating(true)
    const start = currentViews
    const end = newViews
    const duration = 1000
    const startTime = Date.now()

    const animate = () => {
      const now = Date.now()
      const progress = Math.min((now - startTime) / duration, 1)
      const easeOutQuad = 1 - (1 - progress) * (1 - progress)
      const current = Math.floor(start + (end - start) * easeOutQuad)

      setViews(current)

      if (progress < 1) {
        requestAnimationFrame(animate)
      } else {
        setIsAnimating(false)
      }
    }

    animate()
  }, [])

  return (
    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-border/40 bg-card/50 backdrop-blur-sm">
      <div className="flex items-center gap-2">
        <div className={`w-2 h-2 rounded-full bg-accent ${isAnimating ? "animate-pulse" : ""}`} />
        <span className="text-sm text-muted-foreground">Page Views:</span>
        <span className="text-sm font-mono font-semibold text-foreground">{views.toLocaleString()}</span>
      </div>
    </div>
  )
}
