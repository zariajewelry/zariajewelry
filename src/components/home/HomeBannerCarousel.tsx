"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { MoveRight, ChevronLeft, ChevronRight } from "lucide-react";

interface BannerSlide {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
}

const bannerSlides: BannerSlide[] = [
  {
    id: 1,
    title: "COLECCIÓN VERANO",
    subtitle: "2025",
    description: "Piezas elegantes para momentos especiales",
    imageUrl: "https://www.wolfandmoon.com/cdn/shop/files/grapefruit-slice-necklace-lifestyle-5.jpg?v=1684847284",
    linkUrl: "/collections/summer"
  },
  {
    id: 2,
    title: "EDICIÓN LIMITADA",
    subtitle: "ORO Y PLATA",
    description: "Diseños exclusivos para esta temporada",
    imageUrl: "https://www.wolfandmoon.com/cdn/shop/files/grapefruit-slice-necklace-lifestyle-5.jpg?v=1684847284",
    linkUrl: "/collections/limited"
  },
  {
    id: 3,
    title: "NUEVA COLECCIÓN",
    subtitle: "DIAMANTES",
    description: "Lo mejor de nuestra joyería premium",
    imageUrl: "https://www.wolfandmoon.com/cdn/shop/files/grapefruit-slice-necklace-lifestyle-5.jpg?v=1684847284",
    linkUrl: "/collections/diamonds"
  }
];

export default function HomeBannerCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev === bannerSlides.length - 1 ? 0 : prev + 1));
  };
  
  const prevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? bannerSlides.length - 1 : prev - 1));
  };

  // Auto-rotate slides
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, 6000);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [currentSlide]);

  return (
    <section className="pt-[15px] px-[15px]">
    <div className="bg-zaria-salmon w-full relative overflow-hidden border-b border-black/10">
      <div className="py-16 relative">
        {/* Carousel Card */}
        <div className="relative mx-auto max-w-5xl">
          <div className="relative bg-white h-[300px] md:h-[400px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={bannerSlides[currentSlide].id}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.5 }}
                  className="absolute inset-0"
                >
                  {/* Imagen a ancho completo */}
                  <div className="relative h-full w-full py-[15px] px-[15px]">
                    <div className="relative h-full w-full overflow-hidden bg-[#f5f5f7]">
                      <Image
                        src={bannerSlides[currentSlide].imageUrl}
                        alt={bannerSlides[currentSlide].title}
                        fill
                        className="object-cover transition-all duration-700 hover:scale-[1.05] z-10"
                        priority
                      />
                      
                      {/* Overlay para mejorar legibilidad del texto */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-black/25 to-transparent z-20"></div>
                      
                      {/* Contenido centrado sobre la imagen */}
                      <div className="absolute inset-0 z-30 flex flex-col justify-center items-center text-center px-6">
                        <motion.div
                          initial={{ y: 20, opacity: 0 }}
                          animate={{ y: 0, opacity: 1 }}
                          transition={{ delay: 0.2, duration: 0.5 }}
                          className="max-w-lg bg-black/30 backdrop-blur-sm p-6 rounded-sm"
                        >
                          <h2 className="font-vollkorn text-2xl md:text-4xl font-bold mb-2 text-white">
                            {bannerSlides[currentSlide].title}
                          </h2>
                          <p className="font-univers-next text-sm md:text-base mb-1 text-white">
                            {bannerSlides[currentSlide].subtitle}
                          </p>
                          <p className="font-univers-next text-[10px] md:text-sm text-white/80 mb-6">
                            {bannerSlides[currentSlide].description}
                          </p>
                          
                          <motion.div
                            whileHover={{ x: 5 }}
                            whileTap={{ scale: 0.98 }}
                            className="inline-block"
                          >
                            <Link 
                              href={bannerSlides[currentSlide].linkUrl}
                              className="inline-flex items-center font-univers-next text-xs text-white hover:text-zaria-salmon transition-colors border-b border-white pb-0.5 hover:border-zaria-salmon"
                            >
                              SHOP <MoveRight className="h-3 w-3 ml-1" />
                            </Link>
                          </motion.div>
                        </motion.div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
            
            </div>
          
          {/* Navigation buttons reposicionados */}
          <div className="absolute z-40 inset-x-0 top-1/2 -translate-y-1/2 flex justify-between pointer-events-none px-4">
            <button 
              onClick={prevSlide}
              className="bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all transform hover:scale-105 pointer-events-auto"
              aria-label="Anterior"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            
            <button 
              onClick={nextSlide}
              className="bg-white/80 hover:bg-white p-2 rounded-full shadow-md transition-all transform hover:scale-105 pointer-events-auto"
              aria-label="Siguiente"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          
          <div className="flex justify-center mt-8 space-x-2">
            {bannerSlides.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`w-10 h-[2px] transition-all duration-300 ${
                  index === currentSlide ? "bg-white" : "bg-white/30"
                }`}
                aria-label={`Ver slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

