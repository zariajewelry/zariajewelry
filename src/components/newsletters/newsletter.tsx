"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AnimatedSection from "../customs/animated/Animated-section"


export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (email) {
      setIsSubmitted(true)
      // Here you would normally send the email to your API
      setEmail("")
      setTimeout(() => setIsSubmitted(false), 3000)
    }
  }

  return (
    <section className="py-24 px-4 bg-[#f8f8f8] relative overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-0 left-0 w-full h-full">
        <div className="absolute top-10 left-10 w-40 h-40 rounded-full border border-zaria/10"></div>
        <div className="absolute bottom-10 right-10 w-60 h-60 rounded-full border border-zaria/10"></div>
        <div className="absolute top-1/2 right-1/4 w-20 h-20 rounded-full border border-zaria/20"></div>
      </div>

      <div className="container mx-auto max-w-4xl text-center relative z-10">
        <AnimatedSection className="space-y-6" animation="fadeIn">
          <h3 className="font-serif text-3xl mb-2">Únase a Nuestra Lista Exclusiva</h3>
          <div className="h-[2px] w-16 bg-zaria mx-auto"></div>
          <p className="text-gray-600 font-light mb-8 max-w-2xl mx-auto">
            Suscríbase para recibir actualizaciones sobre nuevas colecciones, eventos exclusivos e invitaciones
            especiales.
          </p>

          <form onSubmit={handleSubmit} className="relative max-w-md mx-auto">
            <div className="flex flex-col sm:flex-row gap-3">
              <Input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Su dirección de email"
                className="rounded-none border-gray-200 focus:border-zaria focus:ring-0 flex-1 bg-white"
                required
              />
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  type="submit"
                  className="bg-zaria hover:bg-[#61c8c0] text-white rounded-none transition-colors duration-300"
                >
                  SUSCRIBIRSE
                </Button>
              </motion.div>
            </div>

            {/* Success message */}
            <AnimatePresence>
              {isSubmitted && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="absolute left-0 right-0 mt-2 text-sm text-zaria"
                >
                  ¡Gracias por suscribirse! Recibirá nuestras novedades pronto.
                </motion.div>
              )}
            </AnimatePresence>
          </form>

          <p className="text-xs text-gray-500 mt-4">
            Al suscribirse, acepta nuestra política de privacidad y recibir comunicaciones de marketing.
          </p>
        </AnimatedSection>
      </div>
    </section>
  )
}

