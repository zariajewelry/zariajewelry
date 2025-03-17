"use client";

import Image from "next/image";
import AnimatedSection from "@/components/customs/animated/Animated-section";

interface HeroBannerProps {
  title: string;
  tagline: string;
  description: string;
  imageUrl: string;
  imageAlt: string;
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
  imageUrl,
  imageAlt,
  height = {
    mobile: "h-[40vh]",
    tablet: "md:h-[50vh]",
    desktop: "lg:h-[60vh]",
  },
  animationDelay = 0.1,
}: HeroBannerProps) {
  return (
      <div className={`relative ${height.mobile} ${height.tablet} ${height.desktop} overflow-hidden`}>
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60 z-10"></div>

        <Image
          src={imageUrl}
          alt={imageAlt}
          fill
          priority
          className="object-cover object-center scale-105 transition-transform duration-[25s] hover:scale-100"
        />

        <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
          <AnimatedSection animation="fadeSlideUp" delay={animationDelay}>
            <span className="inline-block text-zaria text-sm tracking-widest uppercase mb-2">
              {tagline}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-4 max-w-3xl">
              {title}
            </h1>
            <p className="text-white/80 max-w-xl mx-auto text-sm md:text-base">
              {description}
            </p>
          </AnimatedSection>
        </div>
      </div>
  );
}