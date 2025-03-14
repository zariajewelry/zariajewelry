"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import AnimatedSection from "./customs/animated/Animated-section"


const testimonials = [
  {
    id: 1,
    name: "Elena García",
    role: "Madrid",
    content:
      "Las joyas de LUXE han sido mi elección para momentos especiales durante años. La calidad y el diseño son incomparables, y siempre recibo cumplidos cuando las uso.",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100&text=EG",
  },
  {
    id: 2,
    name: "Carlos Mendoza",
    role: "Barcelona",
    content:
      "Compré un collar para mi esposa por nuestro aniversario y quedó encantada. El servicio al cliente fue excepcional y el empaque es tan elegante como la joya misma.",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100&text=CM",
  },
  {
    id: 3,
    name: "Lucía Fernández",
    role: "Valencia",
    content:
      "LUXE representa la perfección en joyería. Cada pieza está elaborada con una atención al detalle que refleja verdadero lujo y artesanía.",
    rating: 5,
    image: "/placeholder.svg?height=100&width=100&text=LF",
  },
]

export default function TestimonialSlider() {
  const [current, setCurrent] = useState(0)
  const [autoplay, setAutoplay] = useState(true)

  useEffect(() => {
    if (!autoplay) return

    const interval = setInterval(() => {
      setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
    }, 5000)

    return () => clearInterval(interval)
  }, [autoplay])

  const next = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev === testimonials.length - 1 ? 0 : prev + 1))
  }

  const prev = () => {
    setAutoplay(false)
    setCurrent((prev) => (prev === 0 ? testimonials.length - 1 : prev - 1))
  }

  return (
    <section className="py-24 px-4 bg-white">
      <div className="container mx-auto max-w-5xl">
        <AnimatedSection className="text-center mb-16" animation="fadeIn">
          <h3 className="font-serif text-3xl mb-2">Lo que dicen nuestros clientes</h3>
          <div className="h-[2px] w-16 bg-zaria mx-auto"></div>
        </AnimatedSection>

        <div className="relative">
          <AnimatePresence mode="wait">
            <motion.div
              key={current}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
              className="text-center px-4 md:px-20"
            >
              <div className="mb-6 flex justify-center">
                <div className="relative w-20 h-20 rounded-full overflow-hidden">
                  <Image
                    src={testimonials[current].image || "/placeholder.svg"}
                    alt={testimonials[current].name}
                    fill
                    className="object-cover"
                  />
                </div>
              </div>
              <div className="flex justify-center mb-6">
                {[...Array(testimonials[current].rating)].map((_, i) => (
                  <Star key={i} className="h-5 w-5 fill-amber-400 text-amber-400" />
                ))}
              </div>
              <p className="text-xl font-light italic mb-8">{testimonials[current].content}</p>
              <h4 className="font-serif text-lg">{testimonials[current].name}</h4>
              <p className="text-sm text-gray-500">{testimonials[current].role}</p>
            </motion.div>
          </AnimatePresence>

          <button
            onClick={prev}
            className="absolute left-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={next}
            className="absolute right-0 top-1/2 transform -translate-y-1/2 bg-white rounded-full p-2 shadow-md hover:bg-gray-50 transition-colors"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>

        <div className="flex justify-center mt-8">
          {testimonials.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setAutoplay(false)
                setCurrent(index)
              }}
              className={`w-2 h-2 mx-1 rounded-full transition-all ${
                current === index ? "bg-zaria w-6" : "bg-gray-300"
              }`}
            />
          ))}
        </div>
      </div>
    </section>
  )
}

