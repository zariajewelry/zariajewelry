import Image from "next/image";
import AnimatedSection from "@/components/customs/animated/Animated-section";

interface AuthHeroProps {
  title: string;
  subtitle: string;
  imageSrc: string;
  overlayOpacity?: number;
  className?: string;
}

export default function AuthHero({ 
  title, 
  subtitle, 
  imageSrc,
  overlayOpacity = 0.3,
  className = ""
}: AuthHeroProps) {
  return (
    <div className={`hidden md:block md:w-1/2 relative ${className}`}>
      <div className={`absolute inset-0 bg-black/30 z-10`} style={{ opacity: overlayOpacity }} />
      <Image
        src={imageSrc}
        alt={title}
        fill
        className="object-cover"
        priority 
      />
      <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-12 lg:p-8 xl:p-10 2xl:p-12">
        <AnimatedSection animation="fadeIn" className="text-center">
          <h1 className="font-serif text-4xl lg:text-3xl xl:text-4xl 2xl:text-5xl mb-6 lg:mb-4 xl:mb-5 2xl:mb-6">{title}</h1>
          <p className="text-lg lg:text-base xl:text-lg 2xl:text-xl max-w-md mx-auto font-light">
            {subtitle}
          </p>
        </AnimatedSection>
      </div>
    </div>
  );
}