// src/app/auth/resend-verification/page.tsx
"use client";

import { useState, useEffect } from "react";
import { Mail, Send, ArrowLeft, Check } from "lucide-react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AnimatedSection from "@/components/customs/animated/Animated-section";
import Copyright from "@/components/common/Copyright";
import { toast } from "sonner";

export default function ResendVerificationPage() {
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [verifiedMessage, setVerifiedMessage] = useState("");
  const [error, setError] = useState("");

  useEffect(() => {
    const savedEmail = localStorage.getItem("pendingVerificationEmail");
    if (savedEmail) {
      setEmail(savedEmail);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    if (!email) {
      setError("Por favor, ingrese su dirección de correo electrónico.");
      return;
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError(
        "Por favor, ingrese una dirección de correo electrónico válida."
      );
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch("/api/auth/resend-verification", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        localStorage.setItem("pendingVerificationEmail", email);
        setIsSuccess(true);
        toast.success("Correo enviado con éxito", {
          description:
            "Te hemos reenviado el email de verificación. Revisa tu bandeja de entrada.",
          position: "top-center",
        });
      } else {
        if (data.code === "ALREADY_VERIFIED") {
          setVerifiedMessage(
            "Tu email ya ha sido verificado. Serás redirigido para iniciar sesión."
          );
          toast.success("El email ya ha sido verificado", {
            description: "Serás redirigido para iniciar sesión.",
            position: "top-center",
          });

          setTimeout(() => {
            window.location.href = "/auth/signin";
          }, 8000);
          return;
        }

        setError(data.error || "No se pudo enviar el email de verificación.");
      }
    } catch (error) {
      console.error("Error al enviar solicitud:", error);
      setError("Ocurrió un error de conexión. Por favor, inténtelo de nuevo.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white">
      {/* Top section for logo */}
      <div className="pt-10 md:pt-20 px-6 md:px-12 flex justify-center items-center">
        <AnimatedSection animation="fadeSlideUp">
          <h1 className="font-serif text-3xl">ZARIA</h1>
        </AnimatedSection>
      </div>

      {/* Middle section with content */}
      <div className="flex-grow flex items-center justify-center p-6 md:px-12">
        <div className="w-full max-w-md">
          <AnimatedSection animation="fadeSlideUp" className="mb-8 text-center">
            <div className="flex mb-6 justify-center">
              <div className="relative">
                <div className="absolute inset-0 rounded-full bg-white animate-pulse" />
                {isSuccess ? (
                  <Check className="h-16 w-16 text-[#81D8D0] drop-shadow-md" />
                ) : (
                  <Mail className="h-16 w-16 text-[#81D8D0] drop-shadow-md" />
                )}
              </div>
            </div>
            <h2 className="font-mono text-3xl mb-2">
              {isSuccess ? "Email Enviado" : "Reenviar Verificación"}
            </h2>
            <p className="text-gray-600 font-light">
              {isSuccess
                ? `Hemos enviado un nuevo enlace de verificación a ${email}. Por favor, revise su bandeja de entrada y siga las instrucciones.`
                : "Ingrese su dirección de correo electrónico para recibir un nuevo enlace de verificación."}
            </p>
          </AnimatedSection>

          {!isSuccess ? (
            <form onSubmit={handleSubmit}>
              <AnimatedSection
                animation="fadeSlideUp"
                delay={0.1}
                className="mb-6"
              >
                <div className="mb-6">
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                  >
                    Correo Electrónico
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="ejemplo@correo.com"
                    className={`h-12 rounded-none border-gray-300 focus:border-[#81D8D0] focus:ring focus:ring-[#81D8D0] focus:ring-opacity-50 ${
                      error ? "border-red-500" : ""
                    }`}
                  />
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-sm mt-1"
                    >
                      {error}
                    </motion.p>
                  )}

                  {/* Mensaje de email ya verificado */}
                  {verifiedMessage && (
                    <AnimatedSection
                      animation="fadeSlideUp"
                      className="mb-4 mt-2"
                    >
                      <div className="bg-green-50 border border-green-100 p-4 rounded-md flex items-center text-green-800">
                        <Check className="h-5 w-5 text-green-500 mr-3 flex-shrink-0" />
                        <div>
                          <p className="text-sm font-medium">
                            Email verificado
                          </p>
                          <p className="text-xs mt-1">{verifiedMessage}</p>
                        </div>
                      </div>
                    </AnimatedSection>
                  )}
                </div>
              </AnimatedSection>

              <AnimatedSection
                animation="fadeSlideUp"
                delay={0.2}
                className="mb-4"
              >
                <Button
                  type="submit"
                  disabled={isLoading}
                  className={`w-full h-12 bg-black hover:bg-[#81D8D0] text-white cursor-pointer rounded-none transition-all duration-300 ${
                    isLoading ? "opacity-50" : ""
                  }`}
                >
                  {isLoading ? (
                    <>
                      <span className="mr-2 animate-spin">⟳</span>
                      Enviando...
                    </>
                  ) : (
                    <>
                      <Send className="mr-2 h-4 w-4" />
                      Enviar Enlace
                    </>
                  )}
                </Button>
              </AnimatedSection>

              <AnimatedSection
                animation="fadeSlideUp"
                delay={0.3}
                className="mb-6"
              >
                <Button
                  asChild
                  variant="outline"
                  type="button"
                  className="w-full h-12 border-gray-300 hover:bg-gray-100 text-black cursor-pointer rounded-none transition-all duration-300"
                >
                  <Link href="/auth/signin">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver a Iniciar Sesión
                  </Link>
                </Button>
              </AnimatedSection>
            </form>
          ) : (
            // Botones para estado de éxito
            <>
              <AnimatedSection
                animation="fadeSlideUp"
                delay={0.2}
                className="mb-6"
              >
                <Button
                  asChild
                  className="w-full h-12 bg-black hover:bg-[#81D8D0] text-white cursor-pointer rounded-none transition-all duration-300"
                >
                  <Link href="/auth/signin">Iniciar Sesión</Link>
                </Button>
              </AnimatedSection>

              <AnimatedSection
                animation="fadeSlideUp"
                delay={0.3}
                className="mb-6"
              >
                <Button
                  asChild
                  variant="outline"
                  className="w-full h-12 border-gray-300 hover:bg-gray-50 text-black cursor-pointer rounded-none transition-all duration-300"
                >
                  <Link href="/">Volver al Inicio</Link>
                </Button>
              </AnimatedSection>
            </>
          )}

          <AnimatedSection
            animation="fadeSlideUp"
            delay={0.4}
            className="text-center"
          >
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
  );
}
