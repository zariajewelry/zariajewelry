"use client";

import { useState, useEffect, useRef } from "react";
import Image from "next/image";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowRight, ChevronLeft, ChevronRight } from "lucide-react";

// Define la estructura de datos para cada slide
interface SlideType {
  id: number;
  title: string;
  subtitle: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
  color: "aquamarina" | "salmon" | "neutral";
}

const slides: SlideType[] = [
  {
    id: 1,
    title: "COLECCIÓN PRIMAVERA",
    subtitle: "2025",
    description: "Diseños exclusivos inspirados en la naturaleza y sus formas orgánicas.",
    imageUrl: "/images/hero-1.jpg", // Reemplazar con imagen real
    linkUrl: "/collections/spring",
    color: "aquamarina"
  },
  {
    id: 2,
    title: "JOYAS ARTESANALES",
    subtitle: "EDICIÓN LIMITADA",
    description: "Creaciones únicas elaboradas a mano por nuestros maestros joyeros.",
    imageUrl: "/images/hero-2.jpg", // Reemplazar con imagen real
    linkUrl: "/collections/artisan",
    color: "salmon"
  },
  {
    id: 3,
    title: "DIAMANTES",
    subtitle: "COLECCIÓN ETERNITY",
    description: "Piezas atemporales diseñadas para perdurar generaciones.",
    imageUrl: "/images/hero-3.jpg", // Reemplazar con imagen real
    linkUrl: "/collections/diamonds",
    color: "neutral"
  }
];

export default function HeroCarousel() {
  const [current, setCurrent] = useState(0);
  const [direction, setDirection] = useState(0);
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);
  
  const nextSlide = () => {
    setDirection(1);
    setCurrent((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setDirection(-1);
    setCurrent((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  // Auto-advance carousel
  useEffect(() => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    
    timeoutRef.current = setTimeout(() => {
      nextSlide();
    }, 7000);
    
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [current]);

  const slide = slides[current];
  
  // Variants for animations
  const slideVariants = {
    hidden: (direction: number) => ({
      x: direction > 0 ? "100%" : "-100%",
      opacity: 0
    }),
    visible: {
      x: 0,
      opacity: 1,
      transition: {
        duration: 0.9,
        ease: [0.16, 1, 0.3, 1],
        staggerChildren: 0.1,
        delayChildren: 0.3
      }
    },
    exit: (direction: number) => ({
      x: direction > 0 ? "-100%" : "100%",
      opacity: 0,
      transition: {
        duration: 0.7,
        ease: [0.16, 1, 0.3, 1]
      }
    })
  };

  const contentVariants = {
    hidden: { y: 30, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        duration: 0.6,
        ease: [0.16, 1, 0.3, 1]
      }
    }
  };

  // Estilos condicionales basados en el color
  const getTextColor = (color: SlideType["color"]) => {
    switch(color) {
      case "aquamarina": return "text-zaria-aquamarina";
      case "salmon": return "text-zaria-salmon";
      default: return "text-zariablack";
    }
  };

  const getButtonStyle = (color: SlideType["color"]) => {
    switch(color) {
      case "aquamarina": return "bg-zaria-aquamarina hover:bg-zaria-aquamarina/90 text-white";
      case "salmon": return "bg-zaria-salmon hover:bg-zaria-salmon/90 text-white";
      default: return "bg-black hover:bg-black/90 text-white";
    }
  };

  const textColor = getTextColor(slide.color);
  const buttonStyle = getButtonStyle(slide.color);

  return (
    <section className="relative border-b border-black/10 overflow-hidden">
      {/* Container con margen similar a otros componentes */}
      <div className="pt-[15px] px-[15px] relative">
        {/* Indicadores de progreso en la parte superior */}
        <div className="absolute z-30 top-8 left-8 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              onClick={() => {
                setDirection(index > current ? 1 : -1);
                setCurrent(index);
              }}
              className={`h-[2px] transition-all duration-300 ${
                index === current 
                  ? `w-16 ${getTextColor(slides[index].color)}` 
                  : 'w-6 bg-black/20'
              }`}
              aria-label={`Ir al slide ${index + 1}`}
            />
          ))}
        </div>

        {/* Contenedor principal del carousel */}
        <div className="w-full h-[550px] md:h-[650px] overflow-hidden relative">
          <AnimatePresence initial={false} custom={direction} mode="wait">
            <motion.div 
              key={slide.id}
              className="absolute inset-0"
              custom={direction}
              variants={slideVariants}
              initial="hidden"
              animate="visible"
              exit="exit"
            >
              {/* Imagen de fondo */}
              <div className="relative w-full h-full">
                <Image 
                  src={slide.imageUrl}
                  alt={slide.title}
                  fill
                  className="object-cover"
                  priority
                />
                
                {/* Overlay para mejorar legibilidad del texto */}
                <div className="absolute inset-0 bg-gradient-to-r from-black/40 via-black/20 to-transparent" />
                
                {/* Contenido del slide */}
                <motion.div 
                  className="absolute bottom-12 left-12 max-w-xl"
                  variants={contentVariants}
                >
                  <h3 className="font-vollkorn text-white text-4xl md:text-5xl font-bold mb-2">
                    {slide.title}
                  </h3>
                  
                  <p className="font-univers-next text-white text-lg mb-2">
                    {slide.subtitle}
                  </p>
                  
                  <p className="font-univers-next text-white/90 text-sm md:text-base mb-6 max-w-md">
                    {slide.description}
                  </p>
                  
                  <motion.div
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  >
                    <Link href={slide.linkUrl}>
                      <span className={`inline-flex items-center px-6 py-2.5 ${buttonStyle} font-archivo text-xs uppercase tracking-wider`}>
                        Explorar colección <ArrowRight className="ml-2 h-4 w-4" />
                      </span>
                    </Link>
                  </motion.div>
                </motion.div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* Navegación */}
        <div className="absolute bottom-8 right-8 z-20 flex space-x-3">
          <button
            onClick={prevSlide}
            className="p-2 bg-white/80 hover:bg-white border border-black/10 transition-colors"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={nextSlide}
            className="p-2 bg-white/80 hover:bg-white border border-black/10 transition-colors"
            aria-label="Siguiente"
          >
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>
  );
}