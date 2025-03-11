"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import SignUpForm, { FormData, FormErrors } from "@/components/auth/SignUpForm";
import AuthHero from "@/components/auth/AuthHero";
import Copyright from "@/components/common/Copyright";
import {
  getPasswordStrength,
  validateEmail,
  validatePasswordMatch,
  validateSignUpForm,
} from "@/lib/validations";

export default function SignUp() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [acceptTerms, setAcceptTerms] = useState(false);
  const [acceptNewsletter, setAcceptNewsletter] = useState(true);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
    terms: "",
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });

    if (errors[name as keyof FormErrors]) {
      setErrors({ ...errors, [name]: "" });
    }

    if (name === "password" && formData.confirmPassword) {
      const matchError = validatePasswordMatch(value, formData.confirmPassword);
      if (matchError) {
        setErrors({ ...errors, confirmPassword: matchError });
      } else {
        setErrors({ ...errors, confirmPassword: "" });
      }
    }

    if (name === "confirmPassword") {
      const matchError = validatePasswordMatch(formData.password, value);
      if (matchError) {
        setErrors({ ...errors, confirmPassword: matchError });
      } else {
        setErrors({ ...errors, confirmPassword: "" });
      }
    }

    if (name === "email" && value) {
      const emailError = validateEmail(value);
      if (emailError) {
        setErrors({ ...errors, email: emailError });
      }
    }
  };

  const validateForm = () => {
    const validationErrors = validateSignUpForm(formData, acceptTerms);
    setErrors(validationErrors);
    
    return !Object.values(validationErrors).some(error => error !== "");
  };


const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (validateForm()) {
    setIsSubmitting(true);
    
    try {
      const response = await fetch('/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          firstName: formData.firstName,
          lastName: formData.lastName,
          email: formData.email,
          password: formData.password,
          acceptNewsletter
        })
      });
      
      const data = await response.json();
      
      if (!response.ok) {
        if (data.code === "EMAIL_EXISTS") {
          setErrors(prev => ({ ...prev, email: "Este email ya está en uso" }));
          return;
        }

        throw new Error(data.error || "Error al registrar usuario");
      }
      
      localStorage.setItem("pendingVerificationEmail", formData.email);
      
      router.push('/auth/registration-success');
      
    } catch (error: any) {
      console.error("Error:", error.message);
      
      if (error.message.includes("email")) {
        setErrors(prev => ({ ...prev, email: "Este email ya está en uso" }));
      }
    } finally {
      setIsSubmitting(false);
    }
  }
};

  const handleGoogleSignIn = () => {
    setIsGoogleSubmitting(true);
    signIn("google", { callbackUrl });
  };

  const passwordStrength = getPasswordStrength(formData.password);

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Form */}
      <div className="w-full md:w-1/2 flex flex-col items-center p-6 md:p-12 bg-white order-2 md:order-1">
        <div className="pt-4 md:pt-8 md:pb-4 px-6 md:px-12 flex justify-center items-center">
          <h1 className="font-serif text-3xl">ZARIA</h1>
        </div>
        
        <SignUpForm
          formData={formData}
          errors={errors}
          acceptTerms={acceptTerms}
          acceptNewsletter={acceptNewsletter}
          showPassword={showPassword}
          showConfirmPassword={showConfirmPassword}
          isSubmitting={isSubmitting}
          isGoogleSubmitting={isGoogleSubmitting}
          passwordStrength={passwordStrength}
          onSubmit={handleSubmit}
          onChange={handleInputChange}
          onTogglePassword={() => setShowPassword(!showPassword)}
          onToggleConfirmPassword={() => setShowConfirmPassword(!showConfirmPassword)}
          onTermsChange={(checked) => {
            setAcceptTerms(checked);
            if (checked) {
              setErrors({ ...errors, terms: "" });
            }
          }}
          onNewsletterChange={(checked) => setAcceptNewsletter(checked)}
          onGoogleSignIn={handleGoogleSignIn}
        />
        
        <Copyright className="mt-8" />
      </div>

      {/* Right side - Image */}
      <AuthHero
        title="Únete a ZARIA"
        subtitle="Crea tu cuenta para acceder a colecciones exclusivas, ofertas personalizadas y una experiencia de compra premium."
        imageSrc="https://kzmgdmv1zd295sepvy2b.lite.vusercontent.net/placeholder.svg?height=1200&width=800&text=LUXE+Jewelry"
      />
    </div>
  );
}