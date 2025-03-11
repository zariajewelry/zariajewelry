"use client"

import type React from "react"
import { useEffect, useRef } from "react"
import { motion, useAnimation, useInView } from "framer-motion"

type AnimationType = "fadeIn" | "fadeUp" | "fadeSlideUp" | "fadeSlideRight" | "fadeSlideLeft" | "scale"

interface AnimatedSectionProps {
  children: React.ReactNode
  className?: string
  animation: AnimationType
  delay?: number
  once?: boolean
  duration?: number
}

const animationVariants = {
  fadeIn: {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
  },
  fadeUp: {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  },
  fadeSlideUp: {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0 },
  },
  fadeSlideRight: {
    hidden: { opacity: 0, x: -50 },
    visible: { opacity: 1, x: 0 },
  },
  fadeSlideLeft: {
    hidden: { opacity: 0, x: 50 },
    visible: { opacity: 1, x: 0 },
  },
  scale: {
    hidden: { opacity: 0, scale: 0.9 },
    visible: { opacity: 1, scale: 1 },
  },
}

export default function AnimatedSection({
  children,
  className = "",
  animation = "fadeIn",
  delay = 0,
  once = true,
  duration = 0.6,
}: AnimatedSectionProps) {
  const controls = useAnimation()
  const ref = useRef(null)
  const inView = useInView(ref, { once })

  useEffect(() => {
    if (inView) {
      controls.start("visible")
    } else if (!once) {
      controls.start("hidden")
    }
  }, [controls, inView, once])

  return (
    <motion.div
      ref={ref}
      initial="hidden"
      animate={controls}
      variants={animationVariants[animation]}
      transition={{ duration, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  )
}

