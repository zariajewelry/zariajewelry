"use client"

import { useState, useRef } from "react"
import Link from "next/link"
import { motion, useScroll, AnimatePresence } from "framer-motion"
import { X } from "lucide-react"

import { Button } from "@/components/ui/button"



import PromoCountdown from "@/components/promotions/promo-countdown"
import FeaturedProducts from "@/components/products/FeaturedProducts"

import FeaturedProductsShowcase from "@/components/home/FeaturedProductsShowCase"
import HomeStoryBanner from "@/components/home/banners/HomeStoryBanner"
import HomeCategoriesGrid from "@/components/home/categories/HomeCategoriesGrid"
import HomeNewsletterBanner from "@/components/home/HomeNewsletterBanner"
import Footer from "@/components/home/Footer"



export default function Home() {
  const [showPromo, setShowPromo] = useState(false)


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
      {/* <HomeBannerCarousel /> */}
      <FeaturedProductsShowcase />
      <HomeStoryBanner />
      <HomeCategoriesGrid />
       {/* Featured Products */}
       <FeaturedProducts />

       <HomeNewsletterBanner />
       <Footer />
     
      
    </div>
  )
}

