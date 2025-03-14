"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { motion } from "framer-motion"
import { Heart, ShoppingBag, Star } from "lucide-react"

import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import AnimatedSection from "../customs/animated/Animated-section"


const products = [
  {
    id: 1,
    name: "Collar Eternity",
    price: "2.450€",
    image: "/placeholder.svg?height=600&width=600&text=Collar+Eternity",
    category: "Diamantes",
    rating: 4.8,
    reviews: 24,
    isNew: true,
  },
  {
    id: 2,
    name: "Collar Celestial",
    price: "1.890€",
    image: "/placeholder.svg?height=600&width=600&text=Collar+Celestial",
    category: "Oro & Plata",
    rating: 4.9,
    reviews: 18,
    isNew: false,
  },
  {
    id: 3,
    name: "Collar Serenity",
    price: "3.200€",
    image: "/placeholder.svg?height=600&width=600&text=Collar+Serenity",
    category: "Piedras Preciosas",
    rating: 5.0,
    reviews: 12,
    isNew: false,
  },
  {
    id: 4,
    name: "Collar Infinity",
    price: "2.750€",
    image: "/placeholder.svg?height=600&width=600&text=Collar+Infinity",
    category: "Diamantes",
    rating: 4.7,
    reviews: 32,
    isNew: true,
  },
  {
    id: 5,
    name: "Collar Radiance",
    price: "1.950€",
    image: "/placeholder.svg?height=600&width=600&text=Collar+Radiance",
    category: "Oro & Plata",
    rating: 4.6,
    reviews: 15,
    isNew: false,
  },
  {
    id: 6,
    name: "Collar Harmony",
    price: "2.890€",
    image: "/placeholder.svg?height=600&width=600&text=Collar+Harmony",
    category: "Piedras Preciosas",
    rating: 4.9,
    reviews: 27,
    isNew: false,
  },
]

export default function FeaturedProducts() {
  const [activeFilter, setActiveFilter] = useState("Todos")
  const categories = ["Todos", "Diamantes", "Oro & Plata", "Piedras Preciosas"]

  const filteredProducts =
    activeFilter === "Todos" ? products : products.filter((product) => product.category === activeFilter)

  return (
    <section className="py-24 px-4 bg-white">
      <div className="container mx-auto">
        <AnimatedSection className="text-center" animation="fadeIn">
          <h3 className="font-serif text-3xl mb-3">Productos Destacados</h3>
          <div className="h-[2px] w-16 bg-zaria mx-auto mb-6"></div>
          <p className="text-center text-gray-600 font-light max-w-2xl mx-auto mb-10">
            Descubra nuestra selección de collares de lujo, creados con los materiales más finos y diseñados para
            perdurar en el tiempo.
          </p>
        </AnimatedSection>

        <AnimatedSection className="flex justify-center mb-12" animation="fadeUp" delay={0.2}>
          <div className="inline-flex border-b border-gray-200">
            {categories.map((category, index) => (
              <button
                key={index}
                onClick={() => setActiveFilter(category)}
                className={cn(
                  "px-6 py-2 text-sm transition-all relative",
                  activeFilter === category ? "text-zaria font-medium" : "text-gray-500 hover:text-black",
                )}
              >
                {category}
                {activeFilter === category && (
                  <motion.span
                    layoutId="activeCategory"
                    className="absolute left-0 right-0 bottom-0 h-0.5 bg-zaria"
                  ></motion.span>
                )}
              </button>
            ))}
          </div>
        </AnimatedSection>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProducts.map((product, index) => (
            <AnimatedSection key={product.id} className="group" animation="fadeSlideUp" delay={index * 0.1}>
              <div className="relative overflow-hidden mb-4">
                <div className="relative aspect-square overflow-hidden bg-gray-50">
                  <Image
                    src={product.image || "/placeholder.svg"}
                    alt={product.name}
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                </div>

                {/* New badge */}
                {product.isNew && (
                  <div className="absolute top-3 left-3 bg-black text-white text-xs px-3 py-1">NUEVO</div>
                )}

                {/* Quick actions */}
                <div className="absolute bottom-4 left-0 right-0 flex justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-y-4 group-hover:translate-y-0">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button className="bg-white text-black hover:bg-zaria hover:text-white rounded-none shadow-md mx-1">
                      <ShoppingBag className="h-4 w-4 mr-2" />
                      Añadir
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      className="bg-white text-black hover:bg-zaria hover:text-white hover:border-zaria rounded-none shadow-md mx-1"
                    >
                      <Heart className="h-4 w-4" />
                    </Button>
                  </motion.div>
                </div>
              </div>

              <div className="space-y-1">
                {/* Rating */}
                <div className="flex items-center">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(product.rating)
                            ? "fill-amber-400 text-amber-400"
                            : i < product.rating
                              ? "fill-amber-400 text-amber-400"
                              : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <span className="text-xs text-gray-500 ml-1">({product.reviews})</span>
                </div>

                {/* Product info */}
                <Link href={`/products/${product.id}`}>
                  <h4 className="font-serif text-lg hover:text-zaria transition-colors">{product.name}</h4>
                </Link>
                <p className="text-gray-800">{product.price}</p>
              </div>
            </AnimatedSection>
          ))}
        </div>

        <AnimatedSection className="text-center mt-16" animation="fadeUp" delay={0.4}>
          <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
            <Link href="/products">
              <Button className="bg-transparent text-black hover:bg-zaria hover:text-white border border-black hover:border-zaria rounded-none px-8 py-6 text-sm transition-all duration-300">
                VER TODOS LOS PRODUCTOS
              </Button>
            </Link>
          </motion.div>
        </AnimatedSection>
      </div>
    </section>
  )
}

