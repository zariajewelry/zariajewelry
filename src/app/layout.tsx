import "./globals.css";
import type { Metadata } from "next";
import { Playfair_Display, Montserrat } from "next/font/google";
import { AuthProvider } from "@/components/providers/session-provider";
import { Toaster } from "sonner";
import ReduxProvider from "@/components/providers/redux-provider";
import CartSidebar from "@/components/cart/sidebar/CartSidebar";
import FloatingNavbar from "@/components/navbars/floating-navbar";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"], // Ajusta los pesos según necesites
});

const montserrat = Montserrat({
  variable: "--font-montserrat",
  subsets: ["latin"],
  display: "swap",
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"], // Ajusta los pesos según necesites
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
        className={`${playfairDisplay.variable} ${montserrat.variable} bg-zaria antialiased`}
      >
        <ReduxProvider>
          <AuthProvider>
            <Toaster position="top-center" />

            <div>
              <FloatingNavbar />

              <main>{children}</main>

              <CartSidebar />
            </div>
          </AuthProvider>
        </ReduxProvider>
      </body>
    </html>
  );
}
