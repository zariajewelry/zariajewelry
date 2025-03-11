import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import AnimatedSection from "@/components/customs/animated/Animated-section";
import SocialAuthButton from "./SocialAuthButton";

export interface FormData {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export interface FormErrors {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  confirmPassword: string;
  terms: string;
}

interface SignUpFormProps {
  formData: FormData;
  errors: FormErrors;
  acceptTerms: boolean;
  acceptNewsletter: boolean;
  showPassword: boolean;
  showConfirmPassword: boolean;
  isSubmitting: boolean;
  isGoogleSubmitting: boolean;
  passwordStrength: {
    color: string;
    text: string;
    percentage: number;
  };
  onSubmit: (e: React.FormEvent) => void;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onTogglePassword: () => void;
  onToggleConfirmPassword: () => void;
  onTermsChange: (checked: boolean) => void;
  onNewsletterChange: (checked: boolean) => void;
  onGoogleSignIn: () => void;
}

export default function SignUpForm({
  formData,
  errors,
  acceptTerms,
  acceptNewsletter,
  showPassword,
  showConfirmPassword,
  isSubmitting,
  isGoogleSubmitting,
  passwordStrength,
  onSubmit,
  onChange,
  onTogglePassword,
  onToggleConfirmPassword,
  onTermsChange,
  onNewsletterChange,
  onGoogleSignIn,
}: SignUpFormProps) {
  return (
    <div className="w-full max-w-md mt-6 md:mt-12">
      <AnimatedSection
        animation="fadeSlideUp"
        className="mb-8 text-center md:text-left"
      >
        <h2 className="font-mono text-3xl mb-2">Crear Cuenta</h2>
        <p className="text-gray-600 font-light">
          Únete a ZARIA para disfrutar de una experiencia de compra exclusiva
        </p>
      </AnimatedSection>

      <form onSubmit={onSubmit}>
        <AnimatedSection animation="fadeSlideUp" delay={0.1} className="mb-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm font-medium mb-1"
              >
                Nombre
              </label>
              <Input
                id="firstName"
                name="firstName"
                type="text"
                value={formData.firstName}
                onChange={onChange}
                placeholder="Teresa"
                className={`h-12 rounded-none border-gray-300 focus:border-[#81D8D0] focus:ring focus:ring-[#81D8D0] focus:ring-opacity-50 ${
                  errors.firstName ? "border-red-500" : ""
                }`}
              />
              {errors.firstName && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.firstName}
                </motion.p>
              )}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm font-medium mb-1"
              >
                Apellido
              </label>
              <Input
                id="lastName"
                name="lastName"
                type="text"
                value={formData.lastName}
                onChange={onChange}
                placeholder="Barberena"
                className={`h-12 rounded-none border-gray-300 focus:border-[#81D8D0] focus:ring focus:ring-[#81D8D0] focus:ring-opacity-50 ${
                  errors.lastName ? "border-red-500" : ""
                }`}
              />
              {errors.lastName && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm mt-1"
                >
                  {errors.lastName}
                </motion.p>
              )}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="fadeSlideUp" delay={0.2} className="mb-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium mb-1">
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={onChange}
              placeholder="example@email.com"
              className={`h-12 rounded-none border-gray-300 focus:border-[#81D8D0] focus:ring focus:ring-[#81D8D0] focus:ring-opacity-50 ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-1"
              >
                {errors.email}
              </motion.p>
            )}
          </div>
        </AnimatedSection>

        <AnimatedSection animation="fadeSlideUp" delay={0.3} className="mb-6">
          <div>
            <label htmlFor="password" className="block text-sm font-medium mb-1">
              Contraseña
            </label>
            <div className="relative">
              <Input
                id="password"
                name="password"
                type={showPassword ? "text" : "password"}
                value={formData.password}
                onChange={onChange}
                placeholder="••••••••"
                className={`h-12 rounded-none border-gray-300 focus:border-[#81D8D0] focus:ring focus:ring-[#81D8D0] focus:ring-opacity-50 ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={onTogglePassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.password && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-1"
              >
                {errors.password}
              </motion.p>
            )}

            {/* Password strength indicator */}
            {formData.password && (
              <div className="mt-2">
                <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${passwordStrength.color} transition-all duration-300`}
                    style={{
                      width: `${passwordStrength.percentage}%`,
                    }}
                  ></div>
                </div>
                <p className="text-xs text-gray-500 mt-1">
                  {passwordStrength.text}
                </p>
              </div>
            )}
          </div>
        </AnimatedSection>

        <AnimatedSection animation="fadeSlideUp" delay={0.4} className="mb-6">
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium mb-1"
            >
              Confirmar Contraseña
            </label>
            <div className="relative">
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type={showConfirmPassword ? "text" : "password"}
                value={formData.confirmPassword}
                onChange={onChange}
                placeholder="••••••••"
                className={`h-12 rounded-none border-gray-300 focus:border-[#81D8D0] focus:ring focus:ring-[#81D8D0] focus:ring-opacity-50 ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={onToggleConfirmPassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
            {errors.confirmPassword && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm mt-1"
              >
                {errors.confirmPassword}
              </motion.p>
            )}
          </div>
        </AnimatedSection>

        <AnimatedSection
          animation="fadeSlideUp"
          delay={0.5}
          className="mb-6 space-y-4"
        >
          <div className="flex items-start">
            <div className="flex items-center h-5">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => onTermsChange(checked as boolean)}
                className="h-4 w-4 border-gray-300 rounded text-[#81D8D0] focus:ring-[#81D8D0]"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="terms" className="text-gray-700">
                Acepto los{" "}
                <Link
                  href="/terms"
                  className="font-medium text-[#81D8D0] hover:text-[#5fb5ae] transition-colors"
                >
                  Términos y Condiciones
                </Link>{" "}
                y la{" "}
                <Link
                  href="/privacy"
                  className="font-medium text-[#81D8D0] hover:text-[#5fb5ae] transition-colors"
                >
                  Política de Privacidad
                </Link>
              </label>
            </div>
          </div>
          {errors.terms && (
            <motion.p
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-red-500 text-sm ml-7"
            >
              {errors.terms}
            </motion.p>
          )}

          <div className="flex items-start">
            <div className="flex items-center h-5">
              <Checkbox
                id="newsletter"
                checked={acceptNewsletter}
                onCheckedChange={(checked) => onNewsletterChange(checked as boolean)}
                className="h-4 w-4 border-gray-300 rounded text-[#81D8D0] focus:ring-[#81D8D0]"
              />
            </div>
            <div className="ml-3 text-sm">
              <label htmlFor="newsletter" className="text-gray-700">
                Quiero recibir novedades, ofertas exclusivas y contenido
                personalizado
              </label>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection animation="fadeSlideUp" delay={0.6} className="mb-6">
          <Button
            type="submit"
            disabled={isSubmitting}
            className={`w-full h-12 bg-black hover:bg-[#81D8D0] text-white cursor-pointer rounded-none transition-all duration-300 ${isSubmitting ? "opacity-50" : ""}`}
          >
            {isSubmitting ? "Creando cuenta..." : "Crear Cuenta"}
          </Button>
        </AnimatedSection>
      </form>

      <AnimatedSection animation="fadeSlideUp" delay={0.7} className="mb-6">
        <div className="relative flex items-center justify-center">
          <div className="border-t border-gray-300 absolute w-full"></div>
          <div className="bg-white px-4 relative z-10 text-sm text-gray-500">
            O regístrate con
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection
        animation="fadeSlideUp"
        delay={0.8}
        className="grid grid-cols-1 gap-3 mb-8"
      >
        <SocialAuthButton
          provider="google"
          onClick={onGoogleSignIn}
          disabled={isGoogleSubmitting}
          isLoading={isGoogleSubmitting}
        />
      </AnimatedSection>

      <AnimatedSection
        animation="fadeSlideUp"
        delay={0.9}
        className="text-center"
      >
        <p className="text-sm text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <Link
            href="/auth/signin"
            className="font-medium text-[#81D8D0] hover:text-[#5fb5ae] transition-colors"
          >
            Inicia sesión
          </Link>
        </p>
      </AnimatedSection>
    </div>
  );
}