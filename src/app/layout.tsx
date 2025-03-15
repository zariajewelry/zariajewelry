import "./globals.css";
import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import { AuthProvider } from "@/components/providers/session-provider";
import { Toaster } from "sonner";
import ReduxProvider from "@/components/providers/redux-provider";
import CartSidebar from "@/components/cart/sidebar/CartSidebar";
import FloatingNavbar from "@/components/navbars/floating-navbar";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Next.js E-commerce | Modern Shopping Platform",
  description: "Professional e-commerce platform built with Next.js 14",
  keywords: ["e-commerce", "Next.js", "modern web", "shopping"],
  authors: [{ name: "Your Name", url: "https://yourwebsite.com" }],
  themeColor: "#ffffff",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body
        className={`${geistSans.variable} ${geistMono.variable} bg-background antialiased`}
      >
        <ReduxProvider>
          <AuthProvider>
            <Toaster position="top-center" />
            
            <div>
              <FloatingNavbar />
              
              <main>
                {children}
              </main>

              <CartSidebar />
            </div>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}