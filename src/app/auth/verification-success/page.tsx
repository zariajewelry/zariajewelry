"use client"

import { useEffect } from "react"
import { Check } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import AnimatedSection from "@/components/customs/animated/Animated-section"
import Copyright from "@/components/common/Copyright"
import { useRouter } from "next/navigation"

export default function VerificationSuccessPage() {
  const router = useRouter();

  useEffect(() => {
    const confetti = async () => {
      const { default: confetti } = await import("canvas-confetti")

      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ["#81D8D0", "#FFD700", "#FFFFFF", "#000000"],
        shapes: ["circle", "square"],
        ticks: 200,
        gravity: 0.8,
        scalar: 1.2,
      })
    }

    const timer = setTimeout(() => {
      confetti()
    }, 600)

    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const redirectTimer = setTimeout(() => {
      router.push('/auth/signin');
    }, 15000); 
    
    return () => clearTimeout(redirectTimer);
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top section for logo */}
      <div className="pt-10 md:pt-20 px-6 md:px-12 flex justify-center items-center">
        <AnimatedSection animation="fadeSlideUp">
          <h1 className="font-serif text-3xl">ZARIA</h1>
        </AnimatedSection>
      </div>

      {/* Middle section with verification message */}
      <div className="flex-grow flex items-center justify-center p-6 md:px-12">
        <div className="w-full max-w-md">
          <AnimatedSection animation="fadeSlideUp" className="mb-8 text-center">
            <div className="flex mb-6 justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-[#81D8D0]/20 animate-pulse" />
                <Check className="h-16 w-16 text-[#81D8D0] drop-shadow-md" />
              </div>
            </div>
            <h2 className="font-mono text-3xl mb-2">Email Verificado</h2>
            <p className="text-gray-600 font-light">
              Su dirección de correo electrónico ha sido verificada exitosamente. Ahora puede disfrutar de todos los
              beneficios exclusivos de nuestra colección de joyería de lujo.
            </p>
          </AnimatedSection>

        
          <AnimatedSection animation="fadeSlideUp" delay={0.2} className="mb-6">
            <Button
              asChild
              className="w-full h-12 bg-black hover:bg-[#81D8D0] text-white cursor-pointer rounded-none transition-all duration-300"
            >
              <Link href="/auth/signin">Iniciar Sesión</Link>
            </Button>
          </AnimatedSection>

          <AnimatedSection animation="fadeSlideUp" delay={0.3} className="mb-6">
            <Button
              asChild
              variant="outline"
              className="w-full h-12 border-gray-300 hover:bg-gray-100 text-black cursor-pointer rounded-none transition-all duration-300"
            >
              <Link href="/products">Explorar Colección</Link>
            </Button>
          </AnimatedSection>

          <AnimatedSection animation="fadeSlideUp" delay={0.4} className="text-center">
            <p className="text-sm text-gray-600">
              ¿Necesita ayuda?{" "}
              <Link
                href="/contact"
                className="font-medium text-[#81D8D0] hover:text-[#5fb5ae] transition-colors"
              >
                Contáctenos
              </Link>
            </p>
          </AnimatedSection>
        </div>
      </div>

      {/* Bottom section with copyright */}
      <div className="pb-6 md:pb-10 px-6 md:px-12">
        <Copyright />
      </div>
    </div>
  )
}