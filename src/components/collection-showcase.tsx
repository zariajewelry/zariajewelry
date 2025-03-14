"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion, AnimatePresence } from "framer-motion"
import { ArrowRight } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"

interface Collection {
  id: string
  name: string
  description: string
  image: string
  color: string
  products: number
}

const collections: Collection[] = [
  {
    id: "essentials",
    name: "Esenciales",
    description: "Piezas atemporales que nunca pasan de moda, diseñadas para el uso diario con un toque de elegancia.",
    image: "/placeholder.svg?height=600&width=800&text=Esenciales",
    color: "#81D8D0",
    products: 12,
  },
  {
    id: "statement",
    name: "Statement",
    description: "Diseños audaces y llamativos que se convierten en el centro de atención de cualquier conjunto.",
    image: "/placeholder.svg?height=600&width=800&text=Statement",
    color: "#F5B0CB",
    products: 8,
  },
  {
    id: "bridal",
    name: "Bridal",
    description: "Piezas especiales para el día más importante, con detalles que capturan la magia del momento.",
    image: "/placeholder.svg?height=600&width=800&text=Bridal",
    color: "#D0E2FF",
    products: 10,
  },
  {
    id: "limited",
    name: "Edición Limitada",
    description:
      "Creaciones exclusivas disponibles por tiempo limitado, para quienes buscan algo verdaderamente único.",
    image: "/placeholder.svg?height=600&width=800&text=Limited+Edition",
    color: "#FFD0D0",
    products: 6,
  },
]

export default function CollectionShowcase() {
  const [activeCollection, setActiveCollection] = useState<string>(collections[0].id)

  const currentCollection = collections.find((c) => c.id === activeCollection) || collections[0]

  return (
    <section className="py-20 relative overflow-hidden">

    </section>
  )
}

