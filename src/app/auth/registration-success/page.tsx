"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Mail, ArrowRight, RefreshCw, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/customs/animated/Animated-section";
import Copyright from "@/components/common/Copyright";
import { toast } from "sonner";

export default function RegistrationSuccessPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [countdown, setCountdown] = useState(60);
  const [isCountingDown, setIsCountingDown] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  useEffect(() => {
    const storedEmail = localStorage.getItem("pendingVerificationEmail");
    const urlParams = new URLSearchParams(window.location.search);
    const emailParam = urlParams.get("email");

    setEmail(storedEmail || emailParam || "tu correo");

    setIsCountingDown(true);
  }, []);

  useEffect(() => {
    let timer: NodeJS.Timeout;

    if (isCountingDown && countdown > 0) {
      timer = setTimeout(() => setCountdown(countdown - 1), 1000);
    } else if (countdown === 0) {
      setIsCountingDown(false);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [countdown, isCountingDown]);

  const handleResendEmail = async () => {
    if (isCountingDown) return;

    try {
      const storedEmail = localStorage.getItem("pendingVerificationEmail");

      if (!storedEmail) {
        setErrorMessage(
          "No se encontró un email para reenviar la verificación"
        );
        return;
      }

      setIsResending(true);

      const response = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: storedEmail }),
      });

      if (!response.ok) {
        const error = await response.json();

        if (error.code === "ALREADY_VERIFIED") {
          setShowSuccessMessage(true);
          setIsResending(false);

          const messageElement = document.querySelector(".bg-green-50 p");
          if (messageElement) {
            messageElement.textContent =
              "Tu email ya ha sido verificado. Serás redirigido al inicio de sesión.";
          }

          setTimeout(() => (window.location.href = "/auth/signin"), 2000);
          return;
        }
        throw new Error(error.error || "Error desconocido");
      }

      setCountdown(60);
      setIsCountingDown(true);

      toast.success("Email reenviado correctamente", {
        description:
          "Email reenviado correctamente. Por favor revisa tu bandeja de entrada.",
        position: "top-center",
      });

      setShowSuccessMessage(true);
      setTimeout(() => setShowSuccessMessage(false), 5000);
    } catch (error: any) {
      console.error("Error al reenviar email:", error);
      setErrorMessage(error.message || "Ocurrió un error al reenviar el email");
      toast.error("Ocurrió un error al reenviar el email", {
        description: "Por favor, intente nuevamente.",
        position: "top-center",
      });
      setTimeout(() => setErrorMessage(""), 5000);
    } finally {
      setIsResending(false);
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

      {/* Middle section with success message */}
      <div className="flex-grow flex items-center justify-center p-6 lg:p-4 xl:p-5 2xl:p-6 md:px-12">
        <div className="w-full max-w-md">
          <AnimatedSection animation="fadeSlideUp" className="mb-8 lg:mb-5 xl:mb-6 2xl:mb-8 text-center">
            <div className="flex mb-6 lg:mb-4 xl:mb-5 2xl:mb-6 justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-zaria/20 animate-pulse" />
                <Check
                  className="h-16 w-16 lg:h-14 lg:w-14 xl:h-14 xl:w-14 2xl:h-16 2xl:w-16 text-zaria drop-shadow-md"
                  strokeWidth={1.5}
                />
              </div>
            </div>
            <h2 className="font-mono text-2xl lg:text-2xl xl:text-2xl 2xl:text-3xl mb-2 lg:mb-1.5 xl:mb-1.5 2xl:mb-2">¡Registro completado!</h2>
            <p className="text-gray-600 font-light text-base lg:text-sm xl:text-sm 2xl:text-base mb-2 lg:mb-1.5 xl:mb-1.5 2xl:mb-2">
              Te hemos enviado un email de verificación a{" "}
              <span className="font-medium text-gray-800">{email}</span>
            </p>
            <p className="text-gray-600 font-light text-sm lg:text-sm xl:text-sm 2xl:text-base">
              Por favor, revisa tu bandeja de entrada y haz clic en el enlace
              para activar tu cuenta.
            </p>
          </AnimatedSection>

          <AnimatedSection animation="fadeSlideUp" delay={0.1} className="mb-6 lg:mb-4 xl:mb-5 2xl:mb-6">
            <div className="bg-gray-50 p-4 lg:p-3 xl:p-3.5 2xl:p-4 rounded-lg border border-gray-100">
              <div className="flex items-start">
                <Mail className="w-5 h-5 lg:w-4 lg:h-4 xl:w-4 xl:h-4 2xl:w-5 2xl:h-5 text-zaria mt-0.5 mr-3 flex-shrink-0" />
                <div className="text-sm lg:text-xs xl:text-xs 2xl:text-sm text-gray-600">
                  <p className="mb-2 lg:mb-1 xl:mb-1.5 2xl:mb-2">
                    <span className="font-medium text-gray-800">
                      No olvides revisar tu carpeta de spam
                    </span>{" "}
                    si no encuentras el email en tu bandeja de entrada.
                  </p>
                  <p>El enlace de verificación caducará en 24 horas.</p>
                </div>
              </div>
            </div>
          </AnimatedSection>

          {showSuccessMessage && (
            <AnimatedSection animation="fadeSlideUp" className="mb-4 lg:mb-3 xl:mb-3.5 2xl:mb-4">
              <div className="bg-green-50 border border-green-100 p-4 lg:p-3 xl:p-3.5 2xl:p-4 rounded-md flex items-center text-green-800">
                <Check className="h-5 w-5 lg:h-4 lg:w-4 xl:h-4 xl:w-4 2xl:h-5 2xl:w-5 text-zaria mr-3 flex-shrink-0" />
                <p className="text-sm lg:text-xs xl:text-xs 2xl:text-sm">
                  Email reenviado correctamente. Por favor revisa tu bandeja de
                  entrada.
                </p>
              </div>
            </AnimatedSection>
          )}

          {errorMessage && (
            <AnimatedSection animation="fadeSlideUp" className="mb-4 lg:mb-3 xl:mb-3.5 2xl:mb-4">
              <div className="bg-red-50 border border-red-100 p-4 lg:p-3 xl:p-3.5 2xl:p-4 rounded-md flex items-center text-red-800">
                <Mail className="h-5 w-5 lg:h-4 lg:w-4 xl:h-4 xl:w-4 2xl:h-5 2xl:w-5 text-red-500 mr-3 flex-shrink-0" />
                <p className="text-sm lg:text-xs xl:text-xs 2xl:text-sm">{errorMessage}</p>
              </div>
            </AnimatedSection>
          )}

          <AnimatedSection animation="fadeSlideUp" delay={0.2} className="mb-6 lg:mb-4 xl:mb-5 2xl:mb-6">
            <Button
              variant="outline"
              className="w-full h-12 lg:h-10 xl:h-10 2xl:h-12 relative overflow-hidden group border-zaria text-zaria hover:text-white hover:bg-zaria rounded-none cursor-pointer transition-all duration-300"
              onClick={handleResendEmail}
              disabled={isCountingDown || isResending}
            >
              <span className="flex items-center justify-center">
                <RefreshCw
                  className={`w-4 h-4 lg:w-3.5 lg:h-3.5 xl:w-3.5 xl:h-3.5 2xl:w-4 2xl:h-4 mr-2 ${
                    isResending ? "animate-spin" : "group-hover:animate-spin"
                  }`}
                />
                {isResending
                  ? "Enviando..."
                  : isCountingDown
                  ? `Reenviar email (${countdown}s)`
                  : "Reenviar email de verificación"}
              </span>
            </Button>
          </AnimatedSection>

          <AnimatedSection animation="fadeSlideUp" delay={0.3} className="mb-6 lg:mb-4 xl:mb-5 2xl:mb-6">
            <Button
              asChild
              className="w-full h-12 lg:h-10 xl:h-10 2xl:h-12 bg-black hover:bg-zaria text-white cursor-pointer rounded-none transition-all duration-300"
            >
              <Link href="/">
                <span className="flex items-center justify-center">
                  Volver a la página principal
                  <ArrowRight className="w-4 h-4 lg:w-3.5 lg:h-3.5 xl:w-3.5 xl:h-3.5 2xl:w-4 2xl:h-4 ml-2" />
                </span>
              </Link>
            </Button>
          </AnimatedSection>

          <AnimatedSection
            animation="fadeSlideUp"
            delay={0.4}
            className="text-center"
          >
            <p className="text-sm lg:text-xs xl:text-xs 2xl:text-sm text-gray-600">
              ¿Necesitas ayuda?{" "}
              <Link
                href="/contact"
                className="font-medium text-zaria hover:text-[#5fb5ae] transition-colors"
              >
                Contáctanos
              </Link>
            </p>
          </AnimatedSection>
        </div>
      </div>

      {/* Bottom section with copyright */}
      <div className="pb-6 lg:pb-4 xl:pb-5 2xl:pb-10 px-6 lg:px-8 xl:px-10 2xl:px-12">
        <Copyright />
      </div>
    </div>
  );
}