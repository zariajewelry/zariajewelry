"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { signIn } from "next-auth/react";
import AnimatedSection from "@/components/customs/animated/Animated-section";
import SignInForm from "@/components/auth/SignInForm";
import AuthHero from "@/components/auth/AuthHero";
import Copyright from "@/components/common/Copyright";

export default function SignIn() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const callbackUrl = searchParams.get("callbackUrl") || "/";
  const [isCredentialsSubmitting, setIsCredentialsSubmitting] = useState(false);
  const [isGoogleSubmitting, setIsGoogleSubmitting] = useState(false);
  const [authError, setAuthError] = useState("");

  const handleCredentialsSignIn = async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    setIsCredentialsSubmitting(true);
    setAuthError("");

    try {
      const result = await signIn("credentials", {
        redirect: false,
        email,
        password,
        callbackUrl,
      });

      if (!result?.ok) {
        setAuthError("Credenciales inválidas. Por favor, inténtalo de nuevo.");
      } else {
        router.push(callbackUrl);
      }
    } catch (error) {
      console.error("Authentication error:", error);
      setAuthError(
        "Ocurrió un error durante la autenticación. Por favor, inténtalo más tarde."
      );
    } finally {
      setIsCredentialsSubmitting(false);
    }
  };

  const handleGoogleSignIn = () => {
    setIsGoogleSubmitting(true);
    signIn("google", { callbackUrl });
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row">
      {/* Left side - Image */}
      <AuthHero
        title="ZARIA"
        subtitle="Bienvenido de nuevo a nuestra colección de joyería exclusiva, donde cada pieza cuenta una historia de elegancia atemporal."
        imageSrc="https://i.ibb.co/HDGGCYFS/zaria-auth-banner.png"
        className=""
      />

      {/* Right side - Form */}
      <div className="w-full h-screen md:w-1/2 flex flex-col bg-white">
        {/* Top section for logo */}
        <div className="pt-10 lg:pt-6 xl:pt-8 2xl:pt-20 px-6 lg:px-8 xl:px-10 2xl:px-12 flex justify-center items-center">
          <AnimatedSection animation="fadeSlideUp">
            <h1 className="font-serif text-3xl lg:text-2xl xl:text-2xl 2xl:text-3xl">ZARIA</h1>
          </AnimatedSection>
        </div>

        {/* Middle section with form */}
        <div className="flex-grow flex items-center justify-center p-6 lg:p-4 xl:p-5 2xl:p-12 md:px-12 lg:px-8 xl:px-10 2xl:px-12">
          <SignInForm
            onSubmit={handleCredentialsSignIn}
            onGoogleSignIn={handleGoogleSignIn}
            isSubmitting={isCredentialsSubmitting}
            isGoogleSubmitting={isGoogleSubmitting}
            authError={authError}
          />
        </div>

        {/* Bottom section with copyright */}
        <div className="pb-6 lg:pb-4 xl:pb-6 2xl:pb-10 px-6 lg:px-8 xl:px-10 2xl:px-12">
          <Copyright />
        </div>
      </div>
    </div>
  );
}