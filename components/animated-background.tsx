"use client"

import { useEffect, useRef } from "react"

export function AnimatedBackground() {
  const bgRef = useRef<HTMLDivElement>(null)
  const galaxyRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    // Create stars
    if (bgRef.current) {
      const container = bgRef.current
      // Clear any existing stars
      container.innerHTML = ""

      // Create stars with varied properties for a more natural look
      for (let i = 0; i < 100; i++) {
        const star = document.createElement("div")
        star.className = "celestial-star"

        // Random size between 1px and 3px
        const size = Math.random() * 2 + 1
        star.style.width = `${size}px`
        star.style.height = `${size}px`

        // Random position
        star.style.left = `${Math.random() * 100}%`
        star.style.top = `${Math.random() * 100}%`

        // Custom animation properties with smoother timing
        star.style.setProperty("--twinkle-duration", `${Math.random() * 4 + 3}s`)
        star.style.setProperty("--twinkle-delay", `${Math.random() * 5}s`)
        star.style.setProperty("--star-opacity", `${Math.random() * 0.5 + 0.3}`)
        star.style.setProperty("--star-scale", `${Math.random() * 0.5 + 1}`)

        container.appendChild(star)
      }

      // Create ancient ruin symbols that fade in and out
      for (let i = 0; i < 15; i++) {
        const ruin = document.createElement("div")
        ruin.className = "celestial-ruin"

        // Random size between 50px and 150px
        const size = Math.random() * 100 + 50
        ruin.style.width = `${size}px`
        ruin.style.height = `${size}px`

        // Random position
        ruin.style.left = `${Math.random() * 100}%`
        ruin.style.top = `${Math.random() * 100}%`

        // Custom animation properties with smoother timing
        ruin.style.setProperty("--ruin-duration", `${Math.random() * 20 + 15}s`)
        ruin.style.setProperty("--ruin-delay", `${Math.random() * 10}s`)
        ruin.style.setProperty("--ruin-opacity", `${Math.random() * 0.05 + 0.02}`)
        ruin.style.setProperty("--ruin-rotate", `${Math.random() * 360}deg`)

        container.appendChild(ruin)
      }
    }

    // Create galaxy arms with different rotation speeds
    if (galaxyRef.current) {
      const container = galaxyRef.current
      // Clear any existing arms
      container.innerHTML = ""

      // Create multiple galaxy arms with different rotation speeds
      for (let i = 0; i < 3; i++) {
        const arm = document.createElement("div")
        arm.className = "galaxy-arm"

        // Different rotation speeds with smoother timing
        arm.style.setProperty("--rotation-duration", `${180 + i * 60}s`)
        // Add slight opacity variation
        arm.style.setProperty("--arm-opacity", `${0.05 - i * 0.01}`)

        container.appendChild(arm)
      }
    }

    // Return cleanup function
    return () => {
      if (bgRef.current) bgRef.current.innerHTML = ""
      if (galaxyRef.current) galaxyRef.current.innerHTML = ""
    }
  }, [])

  return (
    <>
      <div ref={galaxyRef} className="animated-galaxy"></div>
      <div ref={bgRef} className="celestial-bg"></div>
    </>
  )
}
