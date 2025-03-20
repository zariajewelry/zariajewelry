"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import Image from "next/image"
import { motion, useScroll, AnimatePresence } from "framer-motion"
import { ChevronRight, X } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"


import AnimatedSection from "@/components/customs/animated/Animated-section"
import PromoCountdown from "@/components/promotions/promo-countdown"
import FeaturedProducts from "@/components/products/featured-products"
import Newsletter from "@/components/newsletters/newsletter"
import ArtisticDivider from "@/components/customs/Artistic-divider"
import TestimonialSlider from "@/components/testimonial-slider"
import CollectionShowcase from "@/components/collection-showcase"
import FeaturedProductsShowcase from "@/components/home/FeaturedProductsShowCase"
import HeroCarousel from "@/components/home/HomeCaroussel"
import HomeBannerCarousel from "@/components/home/HomeBannerCarousel"


export default function Home() {
  const [showPromo, setShowPromo] = useState(false)

  const heroRef = useRef<HTMLDivElement>(null)
  const { scrollY } = useScroll()


  // Close promo banner
  const closePromo = () => {
    setShowPromo(false)
  }

  return (
    <div className="min-h-screen bg-white overflow-x-hidden">
      {/* Promo Banner */}
      <AnimatePresence>
        {showPromo && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="bg-zaria/10 relative z-50"
          >
            <div className="container mx-auto px-4 py-2.5">
              <div className="flex items-center justify-center">
                <motion.div
                  initial={{ opacity: 0.8 }}
                  animate={{ opacity: [0.8, 1, 0.8] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  className="flex items-center"
                >
                  <span className="text-sm font-light">✨ Ofertas exclusivas por tiempo limitado ✨</span>
                  <div className="ml-4 hidden md:block">
                    <PromoCountdown targetDate={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000)} />
                  </div>
                  <Link href="/products" className="ml-4">
                    <Button
                      size="sm"
                      className="bg-zaria hover:bg-zaria/80 text-white rounded-full text-xs px-4"
                    >
                      Ver ofertas
                    </Button>
                  </Link>
                </motion.div>
                <button
                  onClick={closePromo}
                  className="absolute right-4 text-gray-500 hover:text-black transition-colors"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Floating Navbar */}
      <HomeBannerCarousel />
      <FeaturedProductsShowcase />

      

      {/* Brand Statement with Artistic Elements */}
      <section className="py-20 px-4 bg-white relative overflow-hidden">
        <div className="container mx-auto max-w-4xl relative z-10">
          <AnimatedSection className="text-center" animation="fadeIn">
            <h3 className="font-serif text-3xl mb-6">Elegancia Atemporal</h3>
            <ArtisticDivider className="mx-auto mb-8" />
            <p className="text-gray-600 leading-relaxed text-lg max-w-2xl mx-auto">
              Cada pieza de LUXE es una celebración de belleza, artesanía y tradición. Nuestras joyas representan un
              compromiso con la excelencia, donde cada detalle cuenta y cada diseño narra una historia de elegancia
              atemporal.
            </p>
          </AnimatedSection>
        </div>

        {/* Decorative elements */}
        <div className="absolute top-20 left-10 w-32 h-32 border border-zaria/20 rounded-full" />
        <div className="absolute bottom-20 right-10 w-48 h-48 border border-zaria/10 rounded-full" />
        <div className="absolute top-40 right-20 w-16 h-16 border border-zaria/30 rounded-full" />
      </section>

      {/* Collection Showcase - New Dynamic Layout */}
      <CollectionShowcase />

      {/* Featured Products */}
      <FeaturedProducts />

      {/* Craftsmanship Section with Parallax */}
      <section className="py-24 px-4 bg-[#f8f8f8] relative overflow-hidden">
        <div className="container mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <AnimatedSection animation="fadeSlideRight">
              <div className="relative">
                <div className="relative h-[500px] overflow-hidden rounded-sm">
                  <Image
                    src="/placeholder.svg?height=1000&width=800&text=Artesanía"
                    alt="Artesanía de lujo"
                    fill
                    className="object-cover"
                  />
                </div>
                {/* Decorative element */}
                <div className="absolute -bottom-6 -left-6 w-full h-full border border-zaria rounded-sm -z-10" />
              </div>
            </AnimatedSection>

            <AnimatedSection className="space-y-6" animation="fadeSlideLeft">
              <h3 className="font-serif text-3xl">La Artesanía LUXE</h3>
              <ArtisticDivider />
              <p className="text-gray-600 leading-relaxed">
                Cada pieza LUXE representa décadas de artesanía tradicional, combinadas con técnicas innovadoras.
                Nuestros maestros joyeros seleccionan cuidadosamente cada piedra y metal, trabajando con precisión
                milimétrica para crear diseños que perduran a través de generaciones.
              </p>
              <p className="text-gray-600 leading-relaxed">
                La perfección no es solo un objetivo, sino un estándar. Desde la concepción hasta la creación, cada joya
                pasa por un riguroso proceso de control de calidad, garantizando que solo lo mejor lleve el nombre LUXE.
              </p>
              <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.98 }}>
                <Button className="bg-transparent text-black hover:bg-zaria hover:text-white border border-black hover:border-zaria rounded-none px-8 py-6 text-sm transition-all duration-300 mt-4">
                  DESCUBRIR NUESTRO PROCESO
                </Button>
              </motion.div>
            </AnimatedSection>
          </div>
        </div>

        {/* Background decorative elements */}
        <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-white to-transparent" />
        <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* Testimonials Section */}
      <TestimonialSlider />

      {/* Magazine/Editorial Section with Creative Layout */}
      <section className="py-24 px-4 bg-white">
        <div className="container mx-auto">
          <AnimatedSection className="text-center mb-16" animation="fadeIn">
            <h3 className="font-serif text-3xl mb-4">LUXE Magazine</h3>
            <ArtisticDivider className="mx-auto" />
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
            <AnimatedSection className="md:col-span-8" animation="fadeSlideUp" delay={0.1}>
              <div className="relative group">
                <div className="relative aspect-[16/9] overflow-hidden">
                  <Image
                    src="/placeholder.svg?height=800&width=1200&text=Tendencias+2025"
                    alt="Tendencias 2025"
                    fill
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                </div>
                <div className="absolute bottom-0 left-0 p-8 text-white">
                  <span className="text-xs uppercase tracking-wider bg-zaria text-white px-3 py-1">Tendencias</span>
                  <h4 className="font-serif text-2xl mt-3 mb-2">Tendencias 2025</h4>
                  <p className="text-white/80 mb-4 max-w-lg">
                    Las tendencias que definirán el mundo de la joyería de lujo este año.
                  </p>
                  <Link href="#" className="text-sm text-zaria hover:underline flex items-center">
                    Leer artículo <ChevronRight className="h-4 w-4 ml-1" />
                  </Link>
                </div>
              </div>
            </AnimatedSection>

            <div className="md:col-span-4 space-y-8">
              <AnimatedSection animation="fadeSlideUp" delay={0.2}>
                <div className="relative group">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=600&width=600&text=Arte+Joyería"
                      alt="El Arte de la Joyería"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h4 className="font-serif text-lg mb-2">El Arte de la Joyería</h4>
                    <Link href="#" className="text-sm text-zaria hover:underline flex items-center">
                      Leer artículo <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>

              <AnimatedSection animation="fadeSlideUp" delay={0.3}>
                <div className="relative group">
                  <div className="relative aspect-square overflow-hidden">
                    <Image
                      src="/placeholder.svg?height=600&width=600&text=Diamantes"
                      alt="Historias de Diamantes"
                      fill
                      className="object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent" />
                  </div>
                  <div className="absolute bottom-0 left-0 p-6 text-white">
                    <h4 className="font-serif text-lg mb-2">Historias de Diamantes</h4>
                    <Link href="#" className="text-sm text-zaria hover:underline flex items-center">
                      Leer artículo <ChevronRight className="h-4 w-4 ml-1" />
                    </Link>
                  </div>
                </div>
              </AnimatedSection>
            </div>
          </div>
        </div>
      </section>

      {/* Newsletter with Creative Design */}
      <Newsletter />

      {/* Footer */}
      <footer className="bg-white border-t border-gray-100 py-16">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h5 className="font-serif text-lg mb-6">LUXE</h5>
              <p className="text-sm text-gray-600 font-light">
                Joyería de lujo diseñada para momentos inolvidables y conexiones eternas.
              </p>
              <div className="mt-6 flex space-x-4">
                {["Instagram", "Facebook", "Pinterest"].map((social) => (
                  <Link
                    key={social}
                    href="#"
                    className="text-xs uppercase tracking-wider text-gray-400 hover:text-zaria transition-colors"
                  >
                    {social}
                  </Link>
                ))}
              </div>
            </div>
            <div>
              <h5 className="font-serif text-sm mb-6 uppercase tracking-wider">Colecciones</h5>
              <ul className="space-y-3">
                {["Diamantes", "Oro", "Plata", "Piedras Preciosas", "Edición Limitada"].map((item, index) => (
                  <li key={index}>
                    <Link href="#" className="text-sm text-gray-600 font-light hover:text-zaria transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-serif text-sm mb-6 uppercase tracking-wider">Atención al cliente</h5>
              <ul className="space-y-3">
                {["Contacto", "FAQs", "Envíos & Devoluciones", "Cuidado de Joyas", "Garantía"].map((item, index) => (
                  <li key={index}>
                    <Link href="#" className="text-sm text-gray-600 font-light hover:text-zaria transition-colors">
                      {item}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h5 className="font-serif text-sm mb-6 uppercase tracking-wider">Newsletter</h5>
              <p className="text-sm text-gray-600 font-light mb-4">
                Suscríbase para recibir las últimas novedades y ofertas exclusivas.
              </p>
              <div className="flex">
                <Input
                  type="email"
                  placeholder="Su email"
                  className="rounded-none border-gray-200 focus:border-zaria focus:ring-0"
                />
                <Button className="bg-black hover:bg-zaria text-white rounded-none">Enviar</Button>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-100 mt-16 pt-8 text-center">
            <p className="text-xs text-gray-500">© 2025 LUXE. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  )
}

