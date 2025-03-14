"use client"

import { useState, useEffect } from "react"

interface PromoCountdownProps {
  targetDate: Date
}

export default function PromoCountdown({ targetDate }: PromoCountdownProps) {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  })

  useEffect(() => {
    const calculateTimeLeft = () => {
      const difference = targetDate.getTime() - new Date().getTime()

      if (difference > 0) {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24))
        const hours = Math.floor((difference / (1000 * 60 * 60)) % 24)
        const minutes = Math.floor((difference / 1000 / 60) % 60)
        const seconds = Math.floor((difference / 1000) % 60)

        setTimeLeft({ days, hours, minutes, seconds })
      } else {
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 })
      }
    }

    calculateTimeLeft()
    const timer = setInterval(calculateTimeLeft, 1000)

    return () => clearInterval(timer)
  }, [targetDate])

  const formatNumber = (num: number) => {
    return num < 10 ? `0${num}` : num
  }

  return (
    <div className="flex items-center space-x-2 text-xs">
      <div className="flex flex-col items-center">
        <span className="font-medium">{formatNumber(timeLeft.days)}</span>
        <span className="text-gray-500">días</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="font-medium">{formatNumber(timeLeft.hours)}</span>
        <span className="text-gray-500">hrs</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="font-medium">{formatNumber(timeLeft.minutes)}</span>
        <span className="text-gray-500">min</span>
      </div>
      <div className="flex flex-col items-center">
        <span className="font-medium">{formatNumber(timeLeft.seconds)}</span>
        <span className="text-gray-500">seg</span>
      </div>
    </div>
  )
}

