"use client";

import type React from "react";
import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AnimatedSection from "@/components/customs/animated/Animated-section";
import { toast } from "sonner";
import { validateEmail } from "@/lib/validations";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    if (error) setError("");
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    if (emailError) {
      setError(emailError);
      return;
    }

    setIsSubmitting(true);
    setError("");

    try {
      const response = await fetch("/api/auth/forgot-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ha ocurrido un error");
      }

      setIsSubmitted(true);
    } catch (error: any) {
      console.error("Error in forgot password:", error);
      if (error.message?.includes("rate limit")) {
        toast.error(
          "Has excedido el límite de intentos. Por favor, inténtalo más tarde."
        );
        setError(
          "Has excedido el límite de intentos. Por favor, inténtalo más tarde."
        );
      } else {
        toast.error(
          "No se pudo procesar tu solicitud. Por favor, inténtalo de nuevo."
        );
        setError(
          "Ha ocurrido un error. Por favor, inténtalo de nuevo más tarde."
        );
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Form */}
      <div className="w-full h-screen md:h-auto md:w-1/2 flex items-center justify-center py-10 px-6 md:py-0 md:p-10 lg:p-12 xl:p-10 2xl:p-12 bg-white">
        <div className="w-full max-w-md">
          <AnimatedSection animation="fadeSlideUp" className="mb-2">
            <Link
              href="/auth/signin"
              className="inline-flex items-center text-sm text-gray-600 hover:text-[#81D8D0] mb-6 md:mb-7 xl:mb-6 2xl:mb-8 transition-colors"
            >
              <ArrowLeft size={16} className="mr-2" />
              Volver a inicio de sesión
            </Link>
          </AnimatedSection>

          <AnimatedSection
            animation="fadeSlideUp"
            className="mb-6 md:mb-7 xl:mb-6 2xl:mb-8"
          >
            <h2 className="font-serif text-2xl md:text-2xl xl:text-2xl 2xl:text-3xl mb-1.5 md:mb-2">
              Recuperar Contraseña
            </h2>
            <p className="text-gray-600 font-light text-sm md:text-base xl:text-sm 2xl:text-base">
              Introduce tu email y te enviaremos instrucciones para restablecer
              tu contraseña
            </p>
          </AnimatedSection>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <AnimatedSection
                animation="fadeSlideUp"
                delay={0.1}
                className="mb-5 md:mb-6 xl:mb-5 2xl:mb-6"
              >
                <div>
                  <label
                    htmlFor="email"
                    className="block text-sm font-medium mb-1"
                  >
                    Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    value={email}
                    onChange={handleEmailChange}
                    placeholder="tu@email.com"
                    className={`h-11 md:h-12 xl:h-10 2xl:h-12 rounded-none border-gray-300 focus:border-[#81D8D0] focus:ring focus:ring-[#81D8D0] focus:ring-opacity-50 ${
                      error ? "border-red-500" : ""
                    }`}
                    disabled={isSubmitting}
                  />
                  {error && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs md:text-sm mt-1"
                    >
                      {error}
                    </motion.p>
                  )}
                </div>
              </AnimatedSection>

              <AnimatedSection
                animation="fadeSlideUp"
                delay={0.2}
                className="mb-5 md:mb-6 xl:mb-5 2xl:mb-6"
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 md:h-12 xl:h-10 2xl:h-12 bg-black hover:bg-[#81D8D0] text-white cursor-pointer rounded-none transition-all duration-300"
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg
                        className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"
                        ></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                        ></path>
                      </svg>
                      Enviando...
                    </div>
                  ) : (
                    "Enviar Instrucciones"
                  )}
                </Button>
              </AnimatedSection>
            </form>
          ) : (
            <AnimatedSection
              animation="fadeIn"
              className="text-center p-5 md:p-7 xl:p-6 2xl:p-8 border border-[#81D8D0]/20 bg-[#81D8D0]/5"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 xl:w-14 xl:h-14 2xl:w-16 2xl:h-16 bg-[#81D8D0]/20 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <svg
                  className="w-7 h-7 md:w-8 md:h-8 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 text-[#81D8D0]"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M5 13l4 4L19 7"
                  ></path>
                </svg>
              </div>
              <h3 className="text-lg md:text-xl xl:text-lg 2xl:text-xl font-serif mb-2">
                Email Enviado
              </h3>
              <p className="text-sm md:text-base xl:text-sm 2xl:text-base text-gray-600 mb-3 md:mb-4">
                Hemos enviado instrucciones para restablecer tu contraseña a{" "}
                <strong>{email}</strong>
              </p>
              <p className="text-xs md:text-sm xl:text-xs 2xl:text-sm text-gray-500">
                Si no recibes el email en unos minutos, revisa tu carpeta de
                spam o{" "}
                <button
                  onClick={() => setIsSubmitted(false)}
                  className="text-[#81D8D0] hover:text-[#5fb5ae] transition-colors cursor-pointer"
                >
                  intenta de nuevo
                </button>
              </p>
            </AnimatedSection>
          )}
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden md:block md:w-1/2 relative">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <Image
          src="https://i.ibb.co/6jFrYXn/zaria-auth-banner-forgot-password.png"
          alt="ZARIA Support"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-8 md:p-10 lg:p-12 xl:p-10 2xl:p-12">
          <AnimatedSection animation="fadeIn" className="text-center">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-4xl xl:text-3xl 2xl:text-5xl mb-4 md:mb-5 xl:mb-4 2xl:mb-6">
              Estamos aquí para ayudarte
            </h1>
            <p className="text-base md:text-lg lg:text-lg xl:text-base 2xl:text-xl max-w-md mx-auto font-light">
              Recupera el acceso a tu cuenta y continúa disfrutando de nuestra
              exclusiva colección de joyería.
            </p>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
