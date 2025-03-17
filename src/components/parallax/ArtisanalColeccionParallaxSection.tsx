"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "framer-motion";
import { ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function GeometricCollectionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Animaciones para las formas
  const shapeProgress = useTransform(scrollYProgress, [0, 1], [0, 1]);
  const backgroundOpacity = useTransform(scrollYProgress, [0, 0.2], [1, 0]);
  
  // Movimiento para el rectángulo celeste
  const cyanX = useTransform(shapeProgress, [0, 1], [-100, 0]);
  const cyanRotate = useTransform(shapeProgress, [0, 1], [-15, 0]);
  
  // Movimiento para el cuadrado rosa
  const pinkX = useTransform(shapeProgress, [0, 1], [100, 0]);
  const pinkRotate = useTransform(shapeProgress, [0, 1], [15, 0]);
  
  // Efecto de aparición del CTA
  const ctaOpacity = useTransform(scrollYProgress, [0.6, 0.8], [0, 1]);
  const ctaY = useTransform(scrollYProgress, [0.6, 0.8], [50, 0]);

  return (
    <div 
      ref={containerRef} 
      className="relative min-h-[200vh] w-full overflow-hidden isolate"
      style={{ clipPath: 'inset(0 0 0 0)' }} // Contiene el efecto dentro del componente
    >
      {/* Fondo blanco inicial que se desvanece */}
      <motion.div 
        className="absolute inset-0 bg-white z-10"
        style={{ opacity: backgroundOpacity }}
      />
      
      {/* Formas geométricas animadas */}
      <div className="fixed inset-0 flex items-center justify-center">
        {/* Rectángulo celeste */}
        <motion.div 
          className="absolute w-[300px] h-[500px] bg-[#7AD0E6] rounded-2xl shadow-xl"
          style={{
            x: cyanX,
            rotate: cyanRotate,
            opacity: shapeProgress,
            left: '30%',
            top: '40%'
          }}
        />
        
        {/* Cuadrado rosa */}
        <motion.div 
          className="absolute w-[400px] h-[400px] bg-[#FFB6C1] rounded-2xl shadow-xl"
          style={{
            x: pinkX,
            rotate: pinkRotate,
            opacity: shapeProgress,
            right: '25%',
            bottom: '30%'
          }}
        />
        
        {/* Líneas decorativas */}
        <motion.div 
          className="absolute w-1 h-32 bg-gray-300"
          style={{
            opacity: shapeProgress,
            y: useTransform(shapeProgress, [0, 1], [100, 0]),
            left: '45%',
            top: '20%'
          }}
        />
      </div>

      {/* Texto y CTA */}
      <motion.div 
        className="fixed top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-center"
        style={{
          opacity: useTransform(scrollYProgress, [0.3, 0.5], [0, 1]),
          y: useTransform(scrollYProgress, [0.3, 0.5], [50, 0])
        }}
      >
        <h2 className="text-4xl md:text-6xl font-bold mb-6 text-gray-800">
          Descubre Nuestra Colección
        </h2>
        <motion.div style={{ opacity: ctaOpacity, y: ctaY }}>
          <Button className="bg-gray-800 hover:bg-gray-700 text-white px-8 py-6 text-lg rounded-lg">
            Explorar Ahora
            <ChevronRight className="ml-2 h-5 w-5" />
          </Button>
        </motion.div>
      </motion.div>

      {/* Efectos decorativos adicionales */}
      <motion.div 
        className="absolute w-40 h-40 rounded-full bg-[#7AD0E6]/30 mix-blend-multiply"
        style={{
          x: useTransform(shapeProgress, [0, 1], [-200, 0]),
          top: '20%',
          right: '10%'
        }}
      />
      <motion.div 
        className="absolute w-60 h-60 rounded-full bg-[#FFB6C1]/30 mix-blend-multiply"
        style={{
          x: useTransform(shapeProgress, [0, 1], [200, 0]),
          bottom: '20%',
          left: '10%'
        }}
      />
    </div>
  );
}