"use client";

import AnimatedSection from "@/components/customs/animated/Animated-section";

interface HeroBannerProps {
  title: string;
  tagline: string;
  description: string;
  imageUrl?: string; 
  imageAlt?: string; 
  height?: {
    mobile?: string;
    tablet?: string;
    desktop?: string;
  };
  animationDelay?: number;
}

export default function HeroBanner({
  title,
  tagline,
  description,
  height = {
    mobile: "h-[30vh]",
    tablet: "md:h-[35vh]",
    desktop: "lg:h-[30vh]",
  },
  animationDelay = 0.1,
}: HeroBannerProps) {
  return (
    <div className="relative">
      {/* Línea negra superior */}
      <div className="w-screen border-t border-black"></div>
      
      {/* Contenido del banner */}
      <div className={`relative ${height.mobile} ${height.tablet} ${height.desktop} flex items-center justify-center`}>
        <div className="z-20 flex flex-col items-center justify-center text-center px-4">
          <AnimatedSection animation="fadeSlideUp" delay={animationDelay}>
            <span className="inline-block text-zariablack font-realtime text-sm tracking-widest uppercase mb-3">
              {tagline}
            </span>
            <h1 className="font-vollkorn text-4xl md:text-5xl lg:text-3xl text-black mb-5 max-w-3xl">
              {title}
            </h1>
            <p className="text-zariablack max-w-xl mx-auto font-realtime text-sm md:text-sm font-normal">
              {description}
            </p>
          </AnimatedSection>
        </div>
      </div>
      
      {/* Línea negra inferior */}
      <div className="w-screen border-b border-black"></div>
    </div>
  );
}