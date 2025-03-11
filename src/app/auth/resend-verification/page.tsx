"use client"

import { useState } from "react"
import { Mail, Send, ArrowLeft, CheckCircle } from "lucide-react"
import Link from "next/link"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import AnimatedSection from "@/components/customs/animated/Animated-section"
import Copyright from "@/components/common/Copyright"

export default function ResendVerificationPage() {
  const [email, setEmail] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [error, setError] = useState("")

  // Simulate sending verification email
  const handleSubmit = (e) => {
    e.preventDefault()
    setError("")

    if (!email) {
      setError("Por favor, ingrese su dirección de correo electrónico.")
      return
    }

    if (!/^\S+@\S+\.\S+$/.test(email)) {
      setError("Por favor, ingrese una dirección de correo electrónico válida.")
      return
    }

    setIsLoading(true)

    // Simulate API call
    setTimeout(() => {
      setIsLoading(false)
      setIsSuccess(true)
    }, 2000)
  }

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
                  <CheckCircle className="h-16 w-16 text-[#81D8D0] drop-shadow-md" />
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

          {!isSuccess && (
            <AnimatedSection animation="fadeSlideUp" delay={0.1} className="mb-6">
              <form onSubmit={handleSubmit}>
                <div className="mb-6">
                  <label htmlFor="email" className="block text-sm font-medium mb-1">
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
                </div>
              </form>
            </AnimatedSection>
          )}

          {isSuccess ? (
            <>
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
                  className="w-full h-12 border-gray-300 hover:bg-gray-50 text-black cursor-pointer rounded-none transition-all duration-300"
                >
                  <Link href="/">Volver al Inicio</Link>
                </Button>
              </AnimatedSection>
            </>
          ) : (
            <>
              <AnimatedSection animation="fadeSlideUp" delay={0.2} className="mb-4">
                <Button
                  onClick={handleSubmit}
                  disabled={isLoading}
                  className="w-full h-12 bg-black hover:bg-[#81D8D0] text-white cursor-pointer rounded-none transition-all duration-300"
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

              <AnimatedSection animation="fadeSlideUp" delay={0.3} className="mb-6">
                <Button
                  asChild
                  variant="outline"
                  className="w-full h-12 border-gray-300 hover:bg-gray-100 text-black cursor-pointer rounded-none transition-all duration-300"
                >
                  <Link href="/auth/signin">
                    <ArrowLeft className="mr-2 h-4 w-4" />
                    Volver a Iniciar Sesión
                  </Link>
                </Button>
              </AnimatedSection>
            </>
          )}

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