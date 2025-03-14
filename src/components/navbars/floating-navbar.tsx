"use client";

import { useState, useEffect, useCallback, useRef, RefObject } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Menu, Search, UserRound, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import CartButton from "../buttons/cart-button";
import { useOnClickOutside } from "@/hooks/use-click-outside";
import { UserDropdown } from "./user-navbar-dropdown";
import SearchOverlay from "./search-overlay-navbar";
import {
  FaGem,
  FaStar,
  FaGift,
  FaUser,
  FaShoppingCart,
  FaHeart,
} from "react-icons/fa";


const MAIN_NAVIGATION = [
  { href: "/products", label: "Colecciones" },
  { href: "#new", label: "Novedades" },
  { href: "#gifts", label: "Regalos" },
];

const MOBILE_NAVIGATION = [
  ...MAIN_NAVIGATION,
  { href: "/account", label: "Mi Cuenta" },
  { href: "/cart", label: "Carrito" },
  { href: "#wishlist", label: "Lista de Deseos" },
];

export default function FloatingNavbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState(false);
  const [searchOpen, setSearchOpen] = useState(false);
  const isMobile = useIsMobile();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isAuthenticated = false;

  useOnClickOutside(dropdownRef as RefObject<HTMLElement>, () =>
    setUserDropdownOpen(false)
  );

  useEffect(() => {
    let scrollTimer: NodeJS.Timeout | null = null;

    const handleScroll = () => {
      if (scrollTimer) clearTimeout(scrollTimer);

      const isScrolled = window.scrollY > 50;
      if (isScrolled !== scrolled) {
        setScrolled(isScrolled);
      }

      scrollTimer = setTimeout(() => {
        const finalScrollPosition = window.scrollY > 50;
        if (finalScrollPosition !== scrolled) {
          setScrolled(finalScrollPosition);
        }
      }, 100);
    };

    window.addEventListener("scroll", handleScroll, { passive: true });

    return () => {
      if (scrollTimer) clearTimeout(scrollTimer);
      window.removeEventListener("scroll", handleScroll);
    };
  }, [scrolled]);

  useEffect(() => {
    if (mobileMenuOpen) {
      const scrollY = window.scrollY;
      document.body.style.position = "fixed";
      document.body.style.top = `-${scrollY}px`;
      document.body.style.width = "100%";
      document.body.style.overflowY = "scroll";
    } else {
      const scrollY = document.body.style.top;
      document.body.style.position = "";
      document.body.style.top = "";
      document.body.style.width = "";
      document.body.style.overflowY = "";
      if (scrollY) {
        window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
      }
    }
  }, [mobileMenuOpen]);

  const toggleMobileMenu = useCallback(() => {
    setMobileMenuOpen((prev) => !prev);
  }, []);

  const getNavLinkStyles = (isScrolled: boolean) =>
    cn(
      "text-sm font-light transition-colors",
      isScrolled
        ? "text-gray-800 hover:text-zaria"
        : "text-white hover:text-white/80"
    );

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{
          y: 0,
          backgroundColor: scrolled
            ? "rgba(255, 255, 255, 0.9)"
            : "transparent",
          backdropFilter: scrolled ? "blur(10px)" : "none",
          boxShadow: scrolled ? "0 2px 10px rgba(0, 0, 0, 0.05)" : "none",
        }}
        transition={{
          duration: 0.4,
          ease: [0.22, 1, 0.36, 1],
          backgroundColor: {
            type: "tween",
            duration: 0.5,
            ease: [0.33, 1, 0.68, 1],
          },
          backdropFilter: { delay: 0.05 },
          boxShadow: { delay: 0.05 },
        }}
        className={cn(
          "fixed top-0 left-0 right-0 z-50 transition-all duration-300",
          scrolled ? "py-3" : "py-5"
        )}
      >
        <div className="container mx-auto px-4  2xl:max-w-7xl">
          <div className="flex items-center justify-between">
            {/* Lado izquierdo - Menú en móvil, links en desktop */}
            <div className="flex items-center">
              {isMobile ? (
                <div className="flex items-center space-x-4">
                  <button
                    onClick={toggleMobileMenu}
                    aria-expanded={mobileMenuOpen}
                    aria-controls="mobile-menu"
                    aria-label="Abrir menú"
                    className={cn(
                      "transition-colors cursor-pointer hover:text-zaria",
                      scrolled ? "text-gray-800" : "text-white"
                    )}
                  >
                    <Menu className="h-6 w-6" />
                  </button>

                  {/* Botón de búsqueda para móvil */}
                  <button
                    onClick={() => setSearchOpen(true)}
                    aria-label="Buscar"
                    className={cn(
                      "relative hover:text-zaria transition-colors cursor-pointer flex items-center justify-center",
                      scrolled ? "text-gray-800" : "text-white"
                    )}
                  >
                    <Search className="h-5 w-5" />
                  </button>
                </div>
              ) : (
                <div className="flex items-center space-x-8">
                  {MAIN_NAVIGATION.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={getNavLinkStyles(scrolled)}
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* Logo centrado - Posicionamiento absoluto para alineación perfecta */}
            <div className="absolute left-1/2 transform -translate-x-1/2">
              <Link href="/">
                <h1
                  className={cn(
                    "font-serif text-2xl tracking-wider transition-colors cursor-pointer",
                    scrolled ? "text-black" : "text-white"
                  )}
                >
                  ZARIA
                </h1>
              </Link>
            </div>

            {/* Iconos a la derecha */}
            <div className="flex items-center space-x-4">
              {!isMobile && (
                <>
                  {isAuthenticated ? (
                    <Link href="/account">
                      <button
                        aria-label="Mi cuenta"
                        className={cn(
                          "relative hover:text-zaria transition-colors cursor-pointer flex items-center justify-center",
                          scrolled ? "text-gray-800" : "text-white"
                        )}
                      >
                        <UserRound
                          className="h-5 w-5"
                          style={{ marginTop: "-1px" }}
                        />
                      </button>
                    </Link>
                  ) : (
                    <UserDropdown
                      isOpen={userDropdownOpen}
                      toggleOpen={() => setUserDropdownOpen(!userDropdownOpen)}
                      isScrolled={scrolled}
                    />
                  )}
                  <button
                    onClick={() => setSearchOpen(true)}
                    aria-label="Buscar"
                    className={cn(
                      "relative hover:text-zaria transition-colors cursor-pointer flex items-center justify-center",
                      scrolled ? "text-gray-800" : "text-white"
                    )}
                  >
                    <Search className="h-5 w-5" />
                  </button>
                </>
              )}
              <button
                aria-label="Lista de deseos"
                className={cn(
                  "relative hover:text-zaria transition-colors cursor-pointer flex items-center justify-center", // Añadido a todos los botones
                  scrolled ? "text-gray-800" : "text-white"
                )}
              >
                <Heart className="h-5 w-5" />
              </button>

              <CartButton
                className={cn(
                  "flex items-center justify-center", 
                  scrolled ? "text-gray-800" : "text-white"
                )}
              />
            </div>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            id="mobile-menu"
            role="dialog"
            aria-modal="true"
            aria-label="Menú de navegación"
            initial={{ opacity: 0, x: "-100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "-100%" }} //
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
            className="fixed inset-0 z-50 flex flex-col bg-gradient-to-b from-white to-[#F8F9FC]"
          >
            {/* Elementos decorativos (sin cambios) */}
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              <div className="absolute top-0 right-0 w-64 h-64 rounded-full bg-zaria/5 -translate-y-1/2 translate-x-1/2" />
              <div className="absolute bottom-0 left-0 w-80 h-80 rounded-full bg-zaria/5 translate-y-1/2 -translate-x-1/2" />
              <div className="absolute top-1/3 left-0 w-1 h-16 bg-gradient-to-b from-transparent via-zaria/30 to-transparent" />
              <div className="absolute top-2/3 right-0 w-1 h-16 bg-gradient-to-b from-transparent via-zaria/30 to-transparent" />
            </div>

            {/* Cabecera del menú móvil (sin cambios) */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="flex items-center justify-between p-5 border-b border-gray-100 relative bg-white/90 backdrop-blur-lg"
            >
              {/* Botón de cierre (sin cambios) */}
              <button
                onClick={toggleMobileMenu}
                aria-label="Cerrar menú"
                className="relative group p-2"
              >
                <span className="absolute inset-0 rounded-full bg-gray-100/0 group-hover:bg-gray-100/80 transition-all duration-300" />
                <X className="h-5 w-5 text-gray-700 group-hover:text-zaria transition-colors duration-300" />
              </button>

              {/* Logo centrado (sin cambios) */}
              <div className="absolute left-1/2 transform -translate-x-1/2">
                <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                  <div className="relative">
                    <h1 className="font-serif text-2xl tracking-wider text-gray-800">
                      ZARIA
                    </h1>
                    <span className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-8 h-px bg-gradient-to-r from-transparent via-zaria to-transparent" />
                  </div>
                </Link>
              </div>

              {/* Espacio para equilibrar el diseño (sin cambios) */}
              <div className="w-5" />
            </motion.div>

            {/* Contenido del menú con MOBILE_NAVIGATION */}
            <div className="flex-1 overflow-auto py-8 px-7">
              <nav className="space-y-1 max-w-sm mx-auto">
                {MOBILE_NAVIGATION.map((item, index) => {
                  // Determinamos el icono según la etiqueta o href
                  let icon;
                  if (item.href === "/products")
                    icon = <FaGem className="text-xl text-zaria" />;
                  else if (item.href === "#new")
                    icon = <FaStar className="text-xl text-zaria" />;
                  else if (item.href === "#gifts")
                    icon = <FaGift className="text-xl text-zaria" />;
                  else if (item.href === "/account")
                    icon = <FaUser className="text-lg" />;
                  else if (item.href === "/cart")
                    icon = <FaShoppingCart className="text-lg" />;
                  else if (item.href === "#wishlist")
                    icon = <FaHeart className="text-lg" />;
                  else icon = <FaGem className="text-xl" />; 

                 
                  const isMainNav = index < 3;

                  return (
                    <motion.div
                      key={item.label}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.15 + index * 0.1 }}
                    >
                      <Link
                        href={item.href}
                        className={`flex items-center py-${
                          isMainNav ? "4" : "3"
                        } px-3 text-${
                          isMainNav
                            ? "xl font-serif text-gray-800"
                            : "base text-gray-600"
                        } hover:text-zaria group relative`}
                        onClick={() => setMobileMenuOpen(false)}
                      >
                        <span className="absolute inset-0 rounded-lg bg-gray-50/0 group-hover:bg-gray-50/80 transition-all duration-300" />
                        <span
                          className={`w-8 flex justify-center relative z-10 mr-4 text-${
                            isMainNav ? "zaria/70" : "gray-400"
                          } group-hover:text-zaria`}
                        >
                          {icon}
                        </span>
                        <span className="relative z-10">{item.label}</span>
                        {isMainNav && (
                          <span className="ml-auto relative z-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <svg
                              width="16"
                              height="16"
                              viewBox="0 0 16 16"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M6 12L10 8L6 4"
                                stroke="currentColor"
                                strokeWidth="1.5"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              />
                            </svg>
                          </span>
                        )}
                      </Link>
                    </motion.div>
                  );
                })}

                {/* Separador (opcional - lo mantengo para respetar el diseño) */}
                <motion.div
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 1, scaleX: 1 }}
                  transition={{ delay: 0.4 }}
                  className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent my-3"
                />
              </nav>
            </div>

            {/* Firma de marca (sin cambios) */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7 }}
              className="p-6 flex justify-center items-center"
            >
              <div className="relative">
                <span className="inline-block w-3 h-3 rounded-full border border-zaria/30 absolute -left-6 top-1/2 -translate-y-1/2" />
                <span className="text-xs uppercase tracking-widest text-gray-400">
                  ZARIA
                </span>
                <span className="inline-block w-3 h-3 rounded-full border border-zaria/30 absolute -right-6 top-1/2 -translate-y-1/2" />
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {/* Panel de Búsqueda */}
      <SearchOverlay isOpen={searchOpen} onClose={() => setSearchOpen(false)} />
    </>
  );
}
