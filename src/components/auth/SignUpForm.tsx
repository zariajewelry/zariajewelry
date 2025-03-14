import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import AnimatedSection from "@/components/customs/animated/Animated-section";
import SocialAuthButton from "./SocialAuthButton";
import { LoadingButton } from "../customs/Loading-button";

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
    <div className="w-full max-w-md mt-6 lg:mt-3 xl:mt-12 2xl:mt-12">
      <AnimatedSection
        animation="fadeSlideUp"
        className="mb-8 lg:mb-4 xl:mb-6 2xl:mb-8 text-center md:text-left"
      >
        <h2 className="font-mono text-2xl lg:text-2xl xl:text-xl 2xl:text-2xl mb-2 lg:mb-1">
          Crear Cuenta
        </h2>
        <p className="text-gray-600 font-light text-sm lg:text-sm xl:text-xs 2xl:text-sm">
          Únete a ZARIA para disfrutar de una experiencia de compra exclusiva
        </p>
      </AnimatedSection>

      <form onSubmit={onSubmit}>
        <AnimatedSection
          animation="fadeSlideUp"
          delay={0.1}
          className="mb-6 lg:mb-3 xl:mb-4 2xl:mb-6"
        >
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 lg:gap-2 xl:gap-3 2xl:gap-4">
            <div>
              <label
                htmlFor="firstName"
                className="block text-sm lg:text-xs xl:text-xs 2xl:text-sm font-medium mb-1 font-mono"
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
                className={`h-12 lg:h-9 xl:h-10 2xl:h-12 rounded-none border-gray-300 focus:border-zaria focus:ring focus:ring-zaria focus:ring-opacity-50 ${
                  errors.firstName ? "border-red-500" : ""
                }`}
              />
              {errors.firstName && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm lg:text-xs xl:text-xs 2xl:text-sm mt-1 lg:mt-0.5"
                >
                  {errors.firstName}
                </motion.p>
              )}
            </div>

            <div>
              <label
                htmlFor="lastName"
                className="block text-sm lg:text-xs xl:text-xs 2xl:text-sm font-medium mb-1 font-mono"
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
                className={`h-12 lg:h-9 xl:h-10 2xl:h-12 rounded-none border-gray-300 focus:border-zaria focus:ring focus:ring-zaria focus:ring-opacity-50 ${
                  errors.lastName ? "border-red-500" : ""
                }`}
              />
              {errors.lastName && (
                <motion.p
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm lg:text-xs xl:text-xs 2xl:text-sm mt-1 lg:mt-0.5"
                >
                  {errors.lastName}
                </motion.p>
              )}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection
          animation="fadeSlideUp"
          delay={0.2}
          className="mb-6 lg:mb-3 xl:mb-4 2xl:mb-6"
        >
          <div>
            <label
              htmlFor="email"
              className="block text-sm lg:text-xs xl:text-xs 2xl:text-sm font-medium mb-1 font-mono"
            >
              Email
            </label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={onChange}
              placeholder="example@email.com"
              className={`h-12 lg:h-9 xl:h-10 2xl:h-12 rounded-none border-gray-300 focus:border-zaria focus:ring focus:ring-zaria focus:ring-opacity-50 ${
                errors.email ? "border-red-500" : ""
              }`}
            />
            {errors.email && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm lg:text-xs xl:text-xs 2xl:text-sm mt-1 lg:mt-0.5"
              >
                {errors.email}
              </motion.p>
            )}
          </div>
        </AnimatedSection>

        <AnimatedSection
          animation="fadeSlideUp"
          delay={0.3}
          className="mb-6 lg:mb-3 xl:mb-4 2xl:mb-6"
        >
          <div>
            <label
              htmlFor="password"
              className="block text-sm lg:text-xs xl:text-xs 2xl:text-sm font-medium mb-1 font-mono"
            >
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
                className={`h-12 lg:h-9 xl:h-10 2xl:h-12 rounded-none border-gray-300 focus:border-zaria focus:ring focus:ring-zaria focus:ring-opacity-50 ${
                  errors.password ? "border-red-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={onTogglePassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? (
                  <EyeOff
                    size={18}
                    className="lg:w-4 lg:h-4 xl:w-4 xl:h-4 2xl:w-[18px] 2xl:h-[18px]"
                  />
                ) : (
                  <Eye
                    size={18}
                    className="lg:w-4 lg:h-4 xl:w-4 xl:h-4 2xl:w-[18px] 2xl:h-[18px]"
                  />
                )}
              </button>
            </div>
            {errors.password && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm lg:text-xs xl:text-xs 2xl:text-sm mt-1 lg:mt-0.5"
              >
                {errors.password}
              </motion.p>
            )}

            {/* Password strength indicator */}
            {formData.password && (
              <div className="mt-2 lg:mt-1 xl:mt-1.5 2xl:mt-2">
                <div className="h-1 w-full bg-gray-200 rounded-full overflow-hidden">
                  <div
                    className={`h-full ${passwordStrength.color} transition-all duration-300`}
                    style={{
                      width: `${passwordStrength.percentage}%`,
                    }}
                  ></div>
                </div>
                <p className="text-xs lg:text-[10px] xl:text-[10px] 2xl:text-xs text-gray-500 mt-1 lg:mt-0.5">
                  {passwordStrength.text}
                </p>
              </div>
            )}
          </div>
        </AnimatedSection>

        <AnimatedSection
          animation="fadeSlideUp"
          delay={0.4}
          className="mb-6 lg:mb-3 xl:mb-4 2xl:mb-6"
        >
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm lg:text-xs xl:text-xs 2xl:text-sm font-medium mb-1 font-mono"
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
                className={`h-12 lg:h-9 xl:h-10 2xl:h-12 rounded-none border-gray-300 focus:border-zaria focus:ring focus:ring-zaria focus:ring-opacity-50 ${
                  errors.confirmPassword ? "border-red-500" : ""
                }`}
              />
              <button
                type="button"
                onClick={onToggleConfirmPassword}
                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showConfirmPassword ? (
                  <EyeOff
                    size={18}
                    className="lg:w-4 lg:h-4 xl:w-4 xl:h-4 2xl:w-[18px] 2xl:h-[18px]"
                  />
                ) : (
                  <Eye
                    size={18}
                    className="lg:w-4 lg:h-4 xl:w-4 xl:h-4 2xl:w-[18px] 2xl:h-[18px]"
                  />
                )}
              </button>
            </div>
            {errors.confirmPassword && (
              <motion.p
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-red-500 text-sm lg:text-xs xl:text-xs 2xl:text-sm mt-1 lg:mt-0.5"
              >
                {errors.confirmPassword}
              </motion.p>
            )}
          </div>
        </AnimatedSection>

        <AnimatedSection
          animation="fadeSlideUp"
          delay={0.5}
          className="mb-6 lg:mb-3 xl:mb-4 2xl:mb-6 space-y-4 lg:space-y-2 xl:space-y-2 2xl:space-y-4"
        >
          <div className="flex items-start">
            <div className="flex items-center h-5 lg:h-4 xl:h-4 2xl:h-5">
              <Checkbox
                id="terms"
                checked={acceptTerms}
                onCheckedChange={(checked) => onTermsChange(checked as boolean)}
                className="h-4 w-4 lg:h-3 lg:w-3 xl:h-3 xl:w-3 2xl:h-4 2xl:w-4 border-gray-300 rounded text-zaria focus:ring-zaria"
              />
            </div>
            <div className="ml-3 text-sm lg:text-xs xl:text-xs 2xl:text-sm">
              <label htmlFor="terms" className="text-gray-700">
                Acepto los{" "}
                <Link
                  href="/terms"
                  className="font-medium text-zaria hover:text-[#5fb5ae] transition-colors"
                >
                  Términos y Condiciones
                </Link>{" "}
                y la{" "}
                <Link
                  href="/privacy"
                  className="font-medium text-zaria hover:text-[#5fb5ae] transition-colors"
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
              className="text-red-500 text-sm lg:text-xs xl:text-xs 2xl:text-sm ml-7 lg:ml-6"
            >
              {errors.terms}
            </motion.p>
          )}

          <div className="flex items-start">
            <div className="flex items-center h-5 lg:h-4 xl:h-4 2xl:h-5">
              <Checkbox
                id="newsletter"
                checked={acceptNewsletter}
                onCheckedChange={(checked) =>
                  onNewsletterChange(checked as boolean)
                }
                className="h-4 w-4 lg:h-3 lg:w-3 xl:h-3 xl:w-3 2xl:h-4 2xl:w-4 border-gray-300 rounded text-zaria focus:ring-zaria"
              />
            </div>
            <div className="ml-3 text-sm lg:text-xs xl:text-xs 2xl:text-sm">
              <label htmlFor="newsletter" className="text-gray-700">
                Quiero recibir novedades, ofertas exclusivas y contenido
                personalizado
              </label>
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection
          animation="fadeSlideUp"
          delay={0.3}
          className="mb-4 lg:mb-3 xl:mb-4 2xl:mb-6"
        >
          <LoadingButton
            type="submit"
            isLoading={isSubmitting}
            spinnerSize='lg'
            className="w-full h-12 lg:h-9 xl:h-10 2xl:h-12 bg-black hover:bg-zaria text-white cursor-pointer rounded-none transition-all duration-300"
          >
            Crear Cuenta
          </LoadingButton>
        </AnimatedSection>
      </form>

      <AnimatedSection
        animation="fadeSlideUp"
        delay={0.4}
        className="mb-4 lg:mb-3 xl:mb-4 2xl:mb-6"
      >
        <div className="relative flex items-center justify-center">
          <div className="border-t border-gray-300 absolute w-full"></div>
          <div className="bg-white px-4 relative z-10 text-sm lg:text-xs xl:text-xs 2xl:text-sm text-gray-500">
            O regístrate con
          </div>
        </div>
      </AnimatedSection>

      <AnimatedSection
        animation="fadeSlideUp"
        delay={0.5}
        className="grid grid-cols-1 gap-3 lg:gap-2 xl:gap-2 2xl:gap-3 mb-8 lg:mb-4 xl:mb-5 2xl:mb-8"
      >
        <SocialAuthButton
          provider="google"
          onClick={onGoogleSignIn}
          disabled={isGoogleSubmitting}
          isLoading={isGoogleSubmitting}
          className="lg:h-9 xl:h-10 2xl:h-12"
        />
      </AnimatedSection>

      <AnimatedSection
        animation="fadeSlideUp"
        delay={0.6}
        className="text-center"
      >
        <p className="text-sm lg:text-xs xl:text-xs 2xl:text-sm text-gray-600">
          ¿Ya tienes una cuenta?{" "}
          <Link
            href="/auth/signin"
            className="font-medium text-zaria hover:text-[#5fb5ae] transition-colors"
          >
            Inicia sesión
          </Link>
        </p>
      </AnimatedSection>
    </div>
  );
}
