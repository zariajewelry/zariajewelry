"use client";

import { useState } from "react";
import { AlertCircle, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/customs/animated/Animated-section";
import Copyright from "@/components/common/Copyright";
import { toast } from "sonner";

export default function VerificationErrorPage() {
  const [isLoading, setIsLoading] = useState(false);

  const handleResendVerification = async () => {
    setIsLoading(true);

    try {
      const email = localStorage.getItem("pendingVerificationEmail");

      if (!email) {
        window.location.href = "/auth/resend-verification";
        return;
      }

      const response = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (!response.ok) {
        const data = await response.json();

        if (data.code === "ALREADY_VERIFIED") {
          toast.success("El email ya ha sido verificado", {
            description:
              "Tu email ya ha sido verificado. Serás redirigido para iniciar sesión.",
            position: "top-center",
          });
          window.location.href = "/auth/signin";
          return;
        }

        throw new Error(
          data.error || "No se pudo enviar el email de verificación"
        );
      }

      window.location.href = "/";
    } catch (error) {
      console.error("Error:", error);
      setIsLoading(false);
      toast.error("Ocurrió un error al reenviar el email", {
        description: "Por favor, intente nuevamente.",
        position: "top-center",
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top section for logo */}
      <div className="pt-10 lg:pt-8 xl:pt-10 2xl:pt-20 px-6 lg:px-8 xl:px-10 2xl:px-12 flex justify-center items-center">
        <AnimatedSection animation="fadeSlideUp">
          <h1 className="font-serif text-3xl lg:text-2xl xl:text-2xl 2xl:text-3xl">ZARIA</h1>
        </AnimatedSection>
      </div>

      {/* Middle section with verification message */}
      <div className="flex-grow flex items-center justify-center p-6 lg:p-5 xl:p-6 2xl:p-12 md:px-12">
        <div className="w-full max-w-md">
          <AnimatedSection animation="fadeSlideUp" className="mb-8 lg:mb-6 xl:mb-7 2xl:mb-8 text-center">
            <div className="flex mb-6 lg:mb-4 xl:mb-5 2xl:mb-6 justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-red-100" />
                <AlertCircle className="h-16 w-16 lg:h-14 lg:w-14 xl:h-14 xl:w-14 2xl:h-16 2xl:w-16 text-red-500 drop-shadow-md" />
              </div>
            </div>
            <h2 className="font-mono text-2xl lg:text-2xl xl:text-2xl 2xl:text-3xl mb-2 lg:mb-1.5 xl:mb-1.5 2xl:mb-2">Error de Verificación</h2>
            <p className="text-gray-600 font-light text-sm lg:text-sm xl:text-sm 2xl:text-base">
              No pudimos verificar su correo electrónico. El enlace de
              verificación ha expirado o no es válido. Para completar la
              verificación, solicite un nuevo enlace o contacte con nuestro
              servicio de atención al cliente.
            </p>
          </AnimatedSection>

          <AnimatedSection animation="fadeSlideUp" delay={0.2} className="mb-4 lg:mb-3 xl:mb-3 2xl:mb-4">
            <Button
              onClick={handleResendVerification}
              disabled={isLoading}
              className={`w-full h-12 lg:h-10 xl:h-10 2xl:h-12 bg-black hover:bg-[#81D8D0] text-white cursor-pointer rounded-none transition-all duration-300 ${
                isLoading ? "opacity-50" : ""
              }`}
            >
              {isLoading ? (
                <>
                  <span className="mr-2 animate-spin">⟳</span>
                  Enviando...
                </>
              ) : (
                "Solicitar Nuevo Enlace"
              )}
            </Button>
          </AnimatedSection>

          <AnimatedSection animation="fadeSlideUp" delay={0.3} className="mb-6 lg:mb-4 xl:mb-5 2xl:mb-6">
            <Button
              asChild
              variant="outline"
              className="w-full h-12 lg:h-10 xl:h-10 2xl:h-12 border-gray-300 hover:bg-gray-100 text-black cursor-pointer rounded-none transition-all duration-300"
            >
              <Link href="/auth/signin">
                <ArrowLeft className="mr-2 h-4 w-4" />
                Volver a Iniciar Sesión
              </Link>
            </Button>
          </AnimatedSection>

          <AnimatedSection
            animation="fadeSlideUp"
            delay={0.4}
            className="text-center"
          >
            <p className="text-sm lg:text-xs xl:text-xs 2xl:text-sm text-gray-600">
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
      <div className="pb-6 lg:pb-5 xl:pb-5 2xl:pb-10 px-6 lg:px-8 xl:px-10 2xl:px-12">
        <Copyright />
      </div>
    </div>
  );
}