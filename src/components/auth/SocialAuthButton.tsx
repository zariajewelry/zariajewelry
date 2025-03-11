import { Button } from "@/components/ui/button";
import { ReactNode } from "react";

type SocialProvider = "google" | "github" | "facebook" | "apple";

interface SocialAuthButtonProps {
  provider: SocialProvider;
  onClick: () => void;
  disabled?: boolean;
  isLoading?: boolean;
  className?: string;
}

const providerIcons: Record<SocialProvider, ReactNode> = {
  google: (
    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
      <path
        d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
        fill="#4285F4"
      />
      <path
        d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
        fill="#34A853"
      />
      <path
        d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
        fill="#FBBC05"
      />
      <path
        d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
        fill="#EA4335"
      />
    </svg>
  ),
  github: (
    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
      <path
        d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.87 8.17 6.84 9.5.5.08.66-.23.66-.5v-1.69c-2.77.6-3.36-1.34-3.36-1.34-.46-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.89 1.52 2.34 1.08 2.91.83.09-.65.35-1.09.63-1.34-2.22-.25-4.55-1.11-4.55-4.92 0-1.11.38-2 1.03-2.71-.1-.25-.45-1.29.1-2.64 0 0 .84-.27 2.75 1.02.79-.22 1.65-.33 2.5-.33.85 0 1.71.11 2.5.33 1.91-1.29 2.75-1.02 2.75-1.02.55 1.35.2 2.39.1 2.64.65.71 1.03 1.6 1.03 2.71 0 3.82-2.34 4.66-4.57 4.91.36.31.69.92.69 1.85V21c0 .27.16.59.67.5C19.14 20.16 22 16.42 22 12A10 10 0 0 0 12 2z"
        fill="currentColor"
      />
    </svg>
  ),
  facebook: (
    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
      <path
        d="M24 12.073c0-5.8-4.701-10.5-10.5-10.5s-10.5 4.7-10.5 10.5c0 5.241 3.84 9.59 8.86 10.382v-7.342h-2.666v-3.04h2.666V9.53c0-2.633 1.568-4.085 3.966-4.085 1.15 0 2.351.205 2.351.205v2.584h-1.324c-1.304 0-1.712.81-1.712 1.64v1.97h2.912l-.465 3.04h-2.447v7.342C20.16 21.664 24 17.314 24 12.073z"
        fill="#1877F2"
      />
    </svg>
  ),
  apple: (
    <svg className="h-4 w-4 mr-2" viewBox="0 0 24 24">
      <path
        d="M14.94 5.19A4.38 4.38 0 0 0 16 2.5a4.38 4.38 0 0 0-2.89 1.52 4.09 4.09 0 0 0-1 2.6 3.6 3.6 0 0 0 2.83-1.43zM22 17.5c-.26.77-3.68 6.14-6.75 6-1.65-.08-2.94-1.16-4.74-1.16-1.8 0-3.32 1.09-4.73 1.16-3.07.14-6.5-5.23-6.78-6C-2 11.86 2.11 2.21 8.5 2.21c1.86 0 3.93 1.16 5.5 1.16 1.58 0 3.73-1.25 5.5-1.16A9.38 9.38 0 0 1 24 7.41a9.39 9.39 0 0 1-2 10.09z"
        fill="currentColor"
      />
    </svg>
  ),
};

const providerNames: Record<SocialProvider, string> = {
  google: "Google",
  github: "GitHub",
  facebook: "Facebook",
  apple: "Apple",
};

export default function SocialAuthButton({
  provider,
  onClick,
  disabled = false,
  isLoading,
  className = "",
}: SocialAuthButtonProps) {
  return (
    <Button
      variant="outline"
      className={`h-12 rounded-none border-gray-300 hover:border-[#81D8D0] hover:bg-[#81D8D0]/10 transition-all cursor-pointer ${className}`}
      onClick={onClick}
      disabled={disabled}
    >
      {isLoading ? (
        <>
          <div className="h-4 w-4 mr-2 rounded-full border-2 border-b-transparent border-white animate-spin" />
          Conectando...
        </>
      ) : (
        <>
          {providerIcons[provider]}
          {providerNames[provider]}
        </>
      )}
    </Button>
  );
}
