import React, { useState } from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Eye, EyeOff } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import AnimatedSection from "@/components/customs/animated/Animated-section";
import { validateEmail, validateLoginPassword } from "@/lib/validations";
import SocialAuthButton from "./SocialAuthButton";

interface SignInFormProps {
  onSubmit: (credentials: { email: string; password: string }) => Promise<void>;
  onGoogleSignIn: () => void;
  isSubmitting: boolean;
  isGoogleSubmitting: boolean;
  authError: string;
}

export default function SignInForm({
  onSubmit,
  onGoogleSignIn,
  isSubmitting,
  isGoogleSubmitting,
  authError,
}: SignInFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [errors, setErrors] = useState({ email: "", password: "" });

  const handleEmailChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setEmail(value);
    setErrors({ ...errors, email: validateEmail(value) });
  };

  const handlePasswordChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setPassword(value);
    setErrors({ ...errors, password: validateLoginPassword(value) });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const emailError = validateEmail(email);
    const passwordError = validateLoginPassword(password);

    setErrors({
      email: emailError,
      password: passwordError,
    });

    if (!emailError && !passwordError) {
      await onSubmit({ email, password });
    }
  };

  return (
    <div className="w-full max-w-md">
      <AnimatedSection
        animation="fadeSlideUp"
        className="mb-8 lg:mb-4 xl:mb-6 2xl:mb-8 text-center md:text-left"
      >
        <h2 className="font-mono text-2xl lg:text-xl xl:text-xl 2xl:text-2xl mb-2 lg:mb-1 xl:mb-1.5 2xl:mb-2">Iniciar Sesión</h2>
        <p className="text-gray-600 font-light text-sm lg:text-xs xl:text-xs 2xl:text-sm">
          Accede a tu cuenta para descubrir nuestras últimas colecciones
        </p>
      </AnimatedSection>

      <form onSubmit={handleSubmit}>
        <AnimatedSection
          animation="fadeSlideUp"
          delay={0.1}
          className="mb-6 lg:mb-3 xl:mb-4 2xl:mb-6"
        >
          <div className="space-y-4 lg:space-y-3 xl:space-y-3 2xl:space-y-4">
            <div>
              <label
                htmlFor="email"
                className="block text-sm lg:text-xs xl:text-xs 2xl:text-sm font-medium mb-1 font-mono"
              >
                Email
              </label>
              <Input
                id="email"
                type="email"
                value={email}
                onChange={handleEmailChange}
                placeholder="example@email.com"
                className={`h-12 lg:h-9 xl:h-10 2xl:h-12 rounded-none border-gray-300 focus:border-[#81D8D0] focus:ring focus:ring-[#81D8D0] focus:ring-opacity-50 ${
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
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={handlePasswordChange}
                  placeholder="••••••••"
                  className={`h-12 lg:h-9 xl:h-10 2xl:h-12 rounded-none border-gray-300 focus:border-[#81D8D0] focus:ring focus:ring-[#81D8D0] focus:ring-opacity-50 ${
                    errors.password || authError ? "border-red-500" : ""
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-700 cursor-pointer"
                >
                  {showPassword ? (
                    <EyeOff size={18} className="lg:w-4 lg:h-4 xl:w-4 xl:h-4 2xl:w-[18px] 2xl:h-[18px]" />
                  ) : (
                    <Eye size={18} className="lg:w-4 lg:h-4 xl:w-4 xl:h-4 2xl:w-[18px] 2xl:h-[18px]" />
                  )}
                </button>
              </div>
              {(errors.password || authError) && (
                <motion.div
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-red-500 text-sm lg:text-xs xl:text-xs 2xl:text-sm mt-1 lg:mt-0.5"
                >
                  {errors.password ? errors.password : authError}
                </motion.div>
              )}
            </div>
          </div>
        </AnimatedSection>

        <AnimatedSection
          animation="fadeSlideUp"
          delay={0.2}
          className="flex items-center justify-between mb-6 lg:mb-3 xl:mb-4 2xl:mb-6"
        >
          <div className="flex items-center">
            <Checkbox
              id="remember-me"
              checked={rememberMe}
              onCheckedChange={(checked) => setRememberMe(checked as boolean)}
              className="h-4 w-4 lg:h-3 lg:w-3 xl:h-3 xl:w-3 2xl:h-4 2xl:w-4 border-gray-300 rounded text-[#81D8D0] focus:ring-[#81D8D0]"
            />
            <label
              htmlFor="remember-me"
              className="ml-2 block text-sm lg:text-xs xl:text-xs 2xl:text-sm text-gray-700"
            >
              Recordarme
            </label>
          </div>
          <div className="text-sm lg:text-xs xl:text-xs 2xl:text-sm">
            <Link
              href="/auth/forgot-password"
              className="font-medium text-[#81D8D0] hover:text-[#5fb5ae] transition-colors"
            >
              ¿Olvidaste tu contraseña?
            </Link>
          </div>
        </AnimatedSection>

        <AnimatedSection
          animation="fadeSlideUp"
          delay={0.3}
          className="mb-4 lg:mb-3 xl:mb-4 2xl:mb-6"
        >
          <Button
            type="submit"
            disabled={isSubmitting}
            className={`w-full h-12 lg:h-9 xl:h-10 2xl:h-12 bg-black hover:bg-[#81D8D0] text-white cursor-pointer rounded-none transition-all duration-300 ${isSubmitting ? 'opacity-50' : ''}`}
          >
            {isSubmitting ? "Iniciando sesión..." : "Iniciar Sesión"}
          </Button>
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
            O continúa con
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
          ¿No tienes una cuenta?{" "}
          <Link
            href="/auth/signup"
            className="font-medium text-[#81D8D0] hover:text-[#5fb5ae] transition-colors"
          >
            Regístrate
          </Link>
        </p>
      </AnimatedSection>
    </div>
  );
}