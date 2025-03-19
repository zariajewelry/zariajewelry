"use client";

import AnimatedSection from "@/components/customs/animated/Animated-section";

interface HeroBannerProps {
  title: string;
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
  description,
  height = {
    mobile: "h-[16vh]",
    tablet: "md:h-[20vh]",
    desktop: "lg:h-[20vh]",
  },
  animationDelay = 0.1,
}: HeroBannerProps) {
  return (
    <div className="relative">
      {/* Línea negra superior */}
      <div className="w-full"></div>
      
      {/* Contenido del banner */}
      <div className={`relative ${height.mobile} ${height.tablet} ${height.desktop} flex items-center justify-center`}>
        <div className="z-20 flex flex-col items-center justify-center text-center px-4">
          <AnimatedSection animation="fadeSlideUp" delay={animationDelay}>
            <h1 className="font-vollkorn text-[16px] md:text-5xl lg:text-[22px] text-black mb-3 max-w-3xl">
              {title}
            </h1>
            <p className="text-zariablack max-w-xl mx-auto font-univers-next text-xs md:text-sm font-normal">
              {description}
            </p>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}