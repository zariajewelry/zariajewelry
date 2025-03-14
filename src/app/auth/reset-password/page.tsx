"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { ArrowLeft, Eye, EyeOff, Check, AlertCircle } from "lucide-react";
import { toast } from "sonner";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import AnimatedSection from "@/components/customs/animated/Animated-section";
import {
  getPasswordStrength,
  validatePassword,
  validatePasswordMatch,
} from "@/lib/validations";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const token = searchParams.get("token");

  const [formState, setFormState] = useState({
    password: "",
    confirmPassword: "",
  });
  const [passwordVisible, setPasswordVisible] = useState(false);
  const [confirmPasswordVisible, setConfirmPasswordVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState({
    password: "",
    confirmPassword: "",
    token: "",
  });

  const [passwordStrengthInfo, setPasswordStrengthInfo] = useState({
    color: "bg-gray-200",
    text: "",
    percentage: 0,
  });

  useEffect(() => {
    if (!token) {
      setErrors((prev) => ({
        ...prev,
        token:
          "El enlace no es válido o ha expirado. Por favor, solicita un nuevo enlace.",
      }));
    }
  }, [token]);

  useEffect(() => {
    const strength = getPasswordStrength(formState.password);
    setPasswordStrengthInfo(strength);
  }, [formState.password]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormState((prev) => ({ ...prev, [name]: value }));

    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: "" }));
    }

    if (name === "password") {
      const passwordError = validatePassword(value);
      if (passwordError) {
        setErrors((prev) => ({ ...prev, password: passwordError }));
      }

      if (formState.confirmPassword) {
        const matchError = validatePasswordMatch(
          value,
          formState.confirmPassword
        );
        setErrors((prev) => ({ ...prev, confirmPassword: matchError || "" }));
      }
    }

    if (name === "confirmPassword") {
      const matchError = validatePasswordMatch(formState.password, value);
      setErrors((prev) => ({ ...prev, confirmPassword: matchError || "" }));
    }
  };

  const validateForm = () => {
    const newErrors = {
      password: "",
      confirmPassword: "",
      token: errors.token,
    };

    newErrors.password = validatePassword(formState.password);

    if (!formState.confirmPassword) {
      newErrors.confirmPassword = "Confirma tu contraseña";
    } else {
      const matchError = validatePasswordMatch(
        formState.password,
        formState.confirmPassword
      );
      if (matchError) newErrors.confirmPassword = matchError;
    }

    if (!newErrors.password && passwordStrengthInfo.percentage < 67) {
      newErrors.password = "La contraseña es demasiado débil";
    }

    setErrors(newErrors);

    return !Object.values(newErrors).some((error) => error);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm() || !token) {
      return;
    }

    setIsSubmitting(true);

    try {
      const response = await fetch("/api/auth/reset-password", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          token,
          password: formState.password,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Ha ocurrido un error");
      }

      setIsSubmitted(true);
      toast.success("Contraseña actualizada correctamente");

      setTimeout(() => {
        router.push("/auth/signin");
      }, 8000);
    } catch (error: any) {
      console.error("Error resetting password:", error);
      if (
        error.message?.includes("token inválido") ||
        error.message?.includes("expirado")
      ) {
        setErrors((prev) => ({
          ...prev,
          token:
            "El enlace no es válido o ha expirado. Por favor, solicita un nuevo enlace.",
        }));
      } else {
        toast.error("No se pudo actualizar tu contraseña");
      }
    } finally {
      setIsSubmitting(false);
    }
  };
  

  if (errors.token) {
    return (
      <div className="min-h-screen flex flex-col md:flex-row">
        <div className="w-full h-screen md:h-auto md:w-1/2 flex items-center justify-center py-10 px-6 md:py-0 md:p-10 lg:p-12 xl:p-10 2xl:p-12 bg-white">
          <div className="w-full max-w-md">
            <AnimatedSection animation="fadeSlideUp" className="mb-2">
              <Link
                href="/auth/signin"
                className="inline-flex items-center text-sm text-gray-600 hover:text-zaria mb-6 md:mb-7 xl:mb-6 2xl:mb-8 transition-colors"
              >
                <ArrowLeft size={16} className="mr-2" />
                Volver a inicio de sesión
              </Link>
            </AnimatedSection>

            <AnimatedSection
              animation="fadeIn"
              className="text-center p-5 md:p-7 xl:p-6 2xl:p-8 border border-red-200 bg-red-50"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 xl:w-14 xl:h-14 2xl:w-16 2xl:h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <AlertCircle className="w-7 h-7 md:w-8 md:h-8 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 text-red-500" />
              </div>
              <h3 className="text-lg md:text-xl xl:text-lg 2xl:text-xl font-serif mb-2">
                Enlace no válido
              </h3>
              <p className="text-sm md:text-base xl:text-sm 2xl:text-base text-gray-600 mb-3 md:mb-4">
                {errors.token}
              </p>
              <Link href="/auth/forgot-password">
                <Button className="w-full h-11 md:h-12 xl:h-10 2xl:h-12 bg-black hover:bg-zaria text-white rounded-none cursor-pointer transition-all duration-300">
                  Solicitar nuevo enlace
                </Button>
              </Link>
            </AnimatedSection>
          </div>
        </div>

        {/* Right side - Image */}
        <div className="hidden md:block md:w-1/2 relative">
          <div className="absolute inset-0 bg-black/30 z-10" />
          <Image
            src="/images/auth/reset-password-banner.jpg"
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

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Form */}
      <div className="w-full h-screen md:h-auto md:w-1/2 flex items-center justify-center py-10 px-6 md:py-0 md:p-10 lg:p-12 xl:p-10 2xl:p-12 bg-white">
        <div className="w-full max-w-md">
          <AnimatedSection animation="fadeSlideUp" className="mb-2">
            <Link
              href="/auth/signin"
              className="inline-flex items-center text-sm text-gray-600 hover:text-zaria mb-6 md:mb-7 xl:mb-6 2xl:mb-8 transition-colors"
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
              Cambiar Contraseña
            </h2>
            <p className="text-gray-600 font-light text-sm md:text-base xl:text-sm 2xl:text-base">
              Introduce tu nueva contraseña para restablecer el acceso a tu
              cuenta
            </p>
          </AnimatedSection>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit}>
              <AnimatedSection
                animation="fadeSlideUp"
                delay={0.1}
                className="mb-5 md:mb-6 xl:mb-4 2xl:mb-6"
              >
                <div>
                  <label
                    htmlFor="password"
                    className="block text-sm font-medium mb-1 font-mono"
                  >
                    Nueva Contraseña
                  </label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={passwordVisible ? "text" : "password"}
                      value={formState.password}
                      onChange={handleInputChange}
                      placeholder="Introduce tu nueva contraseña"
                      className={`h-11 md:h-12 xl:h-10 2xl:h-12 rounded-none border-gray-300 focus:border-zaria focus:ring focus:ring-zaria focus:ring-opacity-50 pr-10 ${
                        errors.password ? "border-red-500" : ""
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() => setPasswordVisible(!passwordVisible)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      tabIndex={-1}
                    >
                      {passwordVisible ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                  {errors.password && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs md:text-sm mt-1"
                    >
                      {errors.password}
                    </motion.p>
                  )}

                  {formState.password && (
                    <div className="mt-2 md:mt-3 xl:mt-2 2xl:mt-3">
                      <div className="flex justify-between items-center mb-1">
                        <span className="text-xs text-gray-500">
                          Fortaleza de la contraseña
                        </span>
                        <span
                          className="text-xs font-medium"
                          style={{
                            color: passwordStrengthInfo.color.replace(
                              "bg-",
                              "text-"
                            ),
                          }}
                        >
                          {passwordStrengthInfo.text}
                        </span>
                      </div>
                      <div className="h-1.5 w-full bg-gray-200 rounded-full overflow-hidden">
                        <div
                          className={`h-full ${passwordStrengthInfo.color} transition-all duration-300`}
                          style={{
                            width: `${passwordStrengthInfo.percentage}%`,
                          }}
                        ></div>
                      </div>

                      <div className="grid grid-cols-2 gap-x-2 gap-y-1 mt-2 md:mt-3 xl:mt-2 2xl:mt-3">
                        <div className="flex items-center text-xs">
                          <Check
                            size={14}
                            className={`${
                              formState.password.length >= 6
                                ? "text-green-500"
                                : "text-gray-400"
                            } mr-1`}
                          />
                          <span
                            className={
                              formState.password.length >= 6
                                ? "text-gray-700"
                                : "text-gray-400"
                            }
                          >
                            Mínimo 6 caracteres
                          </span>
                        </div>
                        <div className="flex items-center text-xs">
                          <Check
                            size={14}
                            className={`${
                              /[A-Z]/.test(formState.password)
                                ? "text-green-500"
                                : "text-gray-400"
                            } mr-1`}
                          />
                          <span
                            className={
                              /[A-Z]/.test(formState.password)
                                ? "text-gray-700"
                                : "text-gray-400"
                            }
                          >
                            Mayúscula (A-Z)
                          </span>
                        </div>
                        <div className="flex items-center text-xs">
                          <Check
                            size={14}
                            className={`${
                              /[a-z]/.test(formState.password)
                                ? "text-green-500"
                                : "text-gray-400"
                            } mr-1`}
                          />
                          <span
                            className={
                              /[a-z]/.test(formState.password)
                                ? "text-gray-700"
                                : "text-gray-400"
                            }
                          >
                            Minúscula (a-z)
                          </span>
                        </div>
                        <div className="flex items-center text-xs">
                          <Check
                            size={14}
                            className={`${
                              /[0-9]/.test(formState.password)
                                ? "text-green-500"
                                : "text-gray-400"
                            } mr-1`}
                          />
                          <span
                            className={
                              /[0-9]/.test(formState.password)
                                ? "text-gray-700"
                                : "text-gray-400"
                            }
                          >
                            Número (0-9)
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </AnimatedSection>
              
              <AnimatedSection
                animation="fadeSlideUp"
                delay={0.2}
                className="mb-6 md:mb-7 xl:mb-6 2xl:mb-8"
              >
                <div>
                  <label
                    htmlFor="confirmPassword"
                    className="block text-sm font-medium mb-1 font-mono"
                  >
                    Confirmar Contraseña
                  </label>
                  <div className="relative">
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type={confirmPasswordVisible ? "text" : "password"}
                      value={formState.confirmPassword}
                      onChange={handleInputChange}
                      placeholder="Confirma tu nueva contraseña"
                      className={`h-11 md:h-12 xl:h-10 2xl:h-12 rounded-none border-gray-300 focus:border-zaria focus:ring focus:ring-zaria focus:ring-opacity-50 pr-10 ${
                        errors.confirmPassword ? "border-red-500" : ""
                      }`}
                    />
                    <button
                      type="button"
                      onClick={() =>
                        setConfirmPasswordVisible(!confirmPasswordVisible)
                      }
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700"
                      tabIndex={-1}
                    >
                      {confirmPasswordVisible ? (
                        <EyeOff size={18} />
                      ) : (
                        <Eye size={18} />
                      )}
                    </button>
                  </div>
                  {errors.confirmPassword && (
                    <motion.p
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-red-500 text-xs md:text-sm mt-1"
                    >
                      {errors.confirmPassword}
                    </motion.p>
                  )}
                </div>
              </AnimatedSection>

              <AnimatedSection
                animation="fadeSlideUp"
                delay={0.3}
                className="mb-5 md:mb-6 xl:mb-5 2xl:mb-6"
              >
                <Button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full h-11 md:h-12 xl:h-10 2xl:h-12 bg-black hover:bg-zaria text-white rounded-none cursor-pointer transition-all duration-300"
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
                      Cambiando contraseña...
                    </div>
                  ) : (
                    "Cambiar Contraseña"
                  )}
                </Button>
              </AnimatedSection>
            </form>
          ) : (
            <AnimatedSection
              animation="fadeIn"
              className="text-center p-5 md:p-7 xl:p-6 2xl:p-8 border border-zaria/20 bg-zaria/5"
            >
              <div className="w-14 h-14 md:w-16 md:h-16 xl:w-14 xl:h-14 2xl:w-16 2xl:h-16 bg-zaria/20 rounded-full flex items-center justify-center mx-auto mb-3 md:mb-4">
                <svg
                  className="w-7 h-7 md:w-8 md:h-8 xl:w-7 xl:h-7 2xl:w-8 2xl:h-8 text-zaria"
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
                ¡Contraseña Actualizada!
              </h3>
              <p className="text-sm md:text-base xl:text-sm 2xl:text-base text-gray-600 mb-3 md:mb-4">
                Tu contraseña ha sido cambiada correctamente. Ya puedes iniciar
                sesión con tu nueva contraseña.
              </p>
              <Link href="/auth/signin">
                <Button className="w-full h-11 md:h-12 xl:h-10 2xl:h-12 bg-black hover:bg-zaria text-white rounded-none transition-all duration-300">
                  Iniciar Sesión
                </Button>
              </Link>
            </AnimatedSection>
          )}
        </div>
      </div>

      {/* Right side - Image */}
      <div className="hidden md:block md:w-1/2 relative">
        <div className="absolute inset-0 bg-black/30 z-10" />
        <Image
          src="/images/auth/reset-password-banner.jpg"
          alt="ZARIA Security"
          fill
          className="object-cover"
          priority
        />
        <div className="absolute inset-0 z-20 flex flex-col justify-center items-center text-white p-8 md:p-10 lg:p-12 xl:p-10 2xl:p-12">
          <AnimatedSection animation="fadeIn" className="text-center">
            <h1 className="font-serif text-3xl md:text-4xl lg:text-4xl xl:text-3xl 2xl:text-5xl mb-4 md:mb-5 xl:mb-4 2xl:mb-6">
              Seguridad garantizada
            </h1>
            <p className="text-base md:text-lg lg:text-lg xl:text-base 2xl:text-xl max-w-md mx-auto font-light">
              Protegemos tu cuenta con los más altos estándares de seguridad
              para que disfrutes de una experiencia exclusiva sin
              preocupaciones.
            </p>
          </AnimatedSection>
        </div>
      </div>
    </div>
  );
}
