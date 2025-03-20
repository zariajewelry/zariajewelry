"use client";

import { useState, useEffect, useCallback, useRef, RefObject } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Menu, Search, ShoppingBag, UserRound, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { useIsMobile } from "@/hooks/use-mobile";
import CartButton from "../buttons/cart-button";
import { useOnClickOutside } from "@/hooks/use-click-outside";
import { UserDropdown } from "./user-navbar-dropdown";
import SearchOverlay from "./search-overlay-navbar";
import { FaGem, FaStar, FaGift } from "react-icons/fa";

const MAIN_NAVIGATION = [
  { href: "/", label: "Home" },
  { href: "/products", label: "Shop", hasSubmenu: true },
  { href: "#gifts", label: "Regalos", hasSubmenu: true },
  { href: "#new", label: "Recien llegados" },
  { href: "#contact", label: "Contacto" },
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
      "text-[14px] font-univers-next font-light transition-colors text-black",
      isScrolled ? "text-gray-800 hover:text-zaria" : ""
    );

  return (
    <>
      <motion.header
        initial={{ y: 0 }}
        animate={{
          y: 0,
          backgroundColor: "bg-zariabg",
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
          "sticky top-0 z-50 transition-all duration-300 h-[60px] flex items-center",
          scrolled ? "bg-zariabg shadow-md" : "bg-zariabg border-t border-b"
        )}
      >
        {/* CONTENEDOR PRINCIPAL */}
        <div className="w-full px-4">
          {isMobile ? (
            <div className="flex items-center justify-between w-full relative">
              <div className="flex items-center space-x-4">
                <button
                  onClick={toggleMobileMenu}
                  aria-expanded={mobileMenuOpen}
                  aria-controls="mobile-menu"
                  aria-label="Abrir menú"
                  className={cn(
                    "transition-colors cursor-pointer hover:text-zaria",
                    scrolled ? "text-gray-800" : "text-gray-800"
                  )}
                >
                  <Menu className="h-6 w-6" />
                </button>
                <button
                  onClick={() => setSearchOpen(true)}
                  aria-label="Buscar"
                  className={cn(
                    "relative hover:text-zaria transition-colors cursor-pointer flex items-center justify-center text-black"
                  )}
                >
                  <Search className="h-5 w-5" />
                </button>
              </div>

              {/* Center: ZARIA Logo */}
              <div className="absolute left-1/2 transform -translate-x-1/2">
                <Link href="/">
                  <h1
                    className={cn(
                      "font-realtime text-2xl text-black tracking-wider transition-colors cursor-pointer"
                    )}
                  >
                    ZARIA
                  </h1>
                </Link>
              </div>

              <div className="flex items-center space-x-4">
                <button
                  aria-label="Lista de deseos"
                  className={cn(
                    "relative hover:text-zaria transition-colors cursor-pointer flex items-center justify-center text-black"
                  )}
                >
                  <Heart className="h-5 w-5" />
                </button>
                <CartButton
                  className={cn("flex items-center justify-center text-black")}
                />
              </div>
            </div>
          ) : (
            /* DESKTOP LAYOUT - NUEVO Y MEJORADO */
            <div className="grid grid-cols-3 items-center w-full">

              <div className="flex items-center">
                <Link href="/">
                  <h1 className="font-realtime text-2xl text-black tracking-wider transition-colors cursor-pointer">
                    ZARIA
                  </h1>
                </Link>
              </div>

              <div className="flex justify-center">
                <div className="flex items-center space-x-8 lg:gap-10 2xl:gap-20">
                  {MAIN_NAVIGATION.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      className={cn(
                        getNavLinkStyles(scrolled),
                        "group relative px-4 py-1.5 flex items-center whitespace-nowrap"
                      )}
                    >
                      <span className="relative z-10">{item.label}</span>

                      {item.hasSubmenu && (
                        <svg
                          width="12"
                          height="12"
                          viewBox="0 0 24 24"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          className="ml-1.5 transition-transform group-hover:translate-y-0.5"
                          stroke="currentColor"
                        >
                          <path
                            d="M6 9l6 6 6-6"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      )}                  
                    </Link>
                  ))}
                </div>
              </div>

              {/* 3. DERECHA: Iconos */}
              <div className="flex justify-end items-center space-x-5">
                {isAuthenticated ? (
                  <Link href="/account">
                    <button
                      aria-label="Mi cuenta"
                      className="relative transition-colors cursor-pointer flex items-center justify-center text-black"
                    >
                      <UserRound className="h-5 w-5" style={{ marginTop: "-1px" }} />
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
                  className="relative transition-colors cursor-pointer flex items-center justify-center text-black"
                >
                  <Search className="h-5 w-5" />
                </button>
                <button
                  aria-label="Lista de deseos"
                  className="relative hover:text-zaria transition-colors cursor-pointer flex items-center justify-center text-black"
                >
                  <Heart className="h-5 w-5" />
                </button>
                <CartButton
                  className="flex items-center justify-center text-black"
                />
              </div>
            </div>
          )}
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
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50"
          >
            {/* Código del menú móvil sin cambios */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 bg-gradient-to-b from-white/90 to-white/75 backdrop-blur-lg"
              onClick={toggleMobileMenu}
            />

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 5 }}
              transition={{
                type: "spring",
                damping: 30,
                stiffness: 300,
              }}
              className="relative h-full w-full flex flex-col"
            >
              {/* Elementos decorativos refinados - Más sutiles */}
              <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute inset-0 opacity-5">
                  <div className="pattern-diamonds w-full h-full"></div>
                </div>
                <div className="absolute top-24 right-6 w-0.5 h-28 bg-gradient-to-b from-transparent via-zaria/20 to-transparent"></div>
                <div className="absolute top-[15%] left-6 w-12 h-12 rounded-full opacity-5 border border-zaria"></div>
                <div className="absolute bottom-[15%] right-6 w-14 h-14 rounded-full opacity-5 border border-zaria"></div>
              </div>

              {/* Botón de cierre - Posición ajustada */}
              <button
                onClick={toggleMobileMenu}
                aria-label="Cerrar menú"
                className="absolute right-4 top-4 z-20 group"
              >
                <div className="p-1.5 rounded-full bg-white shadow-sm group-hover:shadow-md transition-all duration-300">
                  <X className="h-4 w-4 text-gray-700 group-hover:text-zaria transition-all duration-300" />
                </div>
              </button>

              {/* Contenido principal - Con menos padding */}
              <div className="flex-1 flex flex-col pt-10 pb-4 px-5 max-w-5xl mx-auto w-full justify-between h-full">
                <div className="space-y-4">
                  {/* Cabecera elegante - Más pequeña */}
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.1 }}
                    className="text-center mb-8"
                  >
                    {/* Logo principal - Tamaño reducido */}
                    <Link href="/" onClick={() => setMobileMenuOpen(false)}>
                      <motion.div
                        initial={{ scale: 0.95 }}
                        animate={{ scale: 1 }}
                        transition={{
                          type: "spring",
                          stiffness: 150,
                          delay: 0.2,
                        }}
                        className="relative inline-block"
                      >
                        <h1 className="font-serif text-3xl tracking-wider text-gray-800">
                          ZARIA
                        </h1>
                        <motion.span
                          initial={{ scaleX: 0 }}
                          animate={{ scaleX: 1 }}
                          transition={{ delay: 0.3, duration: 0.7 }}
                          className="absolute -bottom-1 left-1/2 transform -translate-x-1/2 w-12 h-px bg-gradient-to-r from-transparent via-zaria to-transparent"
                        />
                      </motion.div>
                    </Link>
                  </motion.div>

                  {/* Sección principal - Más compacta */}
                  <div className="mb-5">
                    {/* Título de sección - Más pequeño */}
                    <motion.h2
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.2 }}
                      className="text-[10px] uppercase tracking-wider text-gray-400 mb-2.5 text-center"
                    >
                      Explorar
                    </motion.h2>

                    {/* Menú principal - Tarjetas más compactas */}
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.3 }}
                      className="bg-white/60 backdrop-blur-sm rounded-xl shadow-sm border border-gray-100 overflow-hidden"
                    >
                      {MOBILE_NAVIGATION.slice(0, 5).map((item, index) => {
                        // Iconos principales
                        let icon;
                        if (item.href === "/products")
                          icon = <FaGem className="text-base text-zaria" />;
                        else if (item.href === "#new")
                          icon = <FaStar className="text-base text-zaria" />;
                        else if (item.href === "#gifts")
                          icon = <FaGift className="text-base text-zaria" />;
                        else
                          icon = <FaGem className="text-base text-zaria" />;

                        return (
                          <motion.div
                            key={item.label}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className={cn(
                              "relative",
                              index !== 0 && "border-t border-gray-100"
                            )}
                          >
                            <Link
                              href={item.href}
                              className="group flex items-center py-3 px-5 relative"
                              onClick={() => setMobileMenuOpen(false)}
                            >
                              {/* Efecto de hover */}
                              <span className="absolute inset-0 opacity-0 bg-gradient-to-r from-white/70 via-white/80 to-white/70 group-hover:opacity-100 transition-opacity duration-300" />

                              {/* Ícono */}
                              <motion.span
                                whileHover={{ rotate: 5, scale: 1.05 }}
                                transition={{ duration: 0.2 }}
                                className="w-8 h-8 flex items-center justify-center relative z-10 mr-3"
                              >
                                {icon}
                              </motion.span>

                              {/* Texto */}
                              <div className="relative z-10 flex-1">
                                <p className="font-serif text-[16px] text-gray-800 group-hover:text-zaria transition-colors duration-300">
                                  {item.label}
                                </p>
                              </div>

                              {/* Flecha elegante */}
                              <motion.span
                                initial={{ opacity: 0.4 }}
                                whileHover={{ opacity: 1 }}
                                className="relative z-10 text-zaria ml-1"
                              >
                                <svg
                                  width="14"
                                  height="14"
                                  viewBox="0 0 16 16"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                >
                                  <path
                                    d="M6.5 4L11 8L6.5 12"
                                    stroke="currentColor"
                                    strokeWidth="1.5"
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                  />
                                </svg>
                              </motion.span>
                            </Link>
                          </motion.div>
                        );
                      })}
                    </motion.div>
                  </div>

                  {/* Separador decorativo - Más pequeño */}
                  <motion.div
                    initial={{ opacity: 0, scaleX: 0 }}
                    animate={{ opacity: 1, scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.7 }}
                    className="relative h-px w-full my-4 max-w-xs mx-auto"
                  >
                    <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-200 to-transparent"></div>
                    <div className="absolute left-1/2 top-1/2 transform -translate-x-1/2 -translate-y-1/2">
                      <div className="w-1 h-1 rounded-full border border-zaria/30 bg-white"></div>
                    </div>
                  </motion.div>

                  {/* Links secundarios - Compactados */}
                  <div className="mt-4">
                    {/* Título de sección */}
                    <motion.h2
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 0.4 }}
                      className="text-[10px] uppercase tracking-wider text-gray-400 mb-2.5 text-center"
                    >
                      Mi Cuenta
                    </motion.h2>

                    {/* Grid de 2 columnas - Tarjetas más pequeñas */}
                    <div className="grid grid-cols-2 gap-3">
                      {/* Elemento Mi Cuenta */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.6 }}
                      >
                        <Link
                          href="/account"
                          className="flex flex-col items-center justify-center h-full group py-3 px-3 relative bg-white/60 backdrop-blur-sm rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <span className="w-8 h-8 flex items-center justify-center mb-2 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 text-gray-500 group-hover:text-zaria transition-colors duration-300">
                            <UserRound className="h-5 w-5" />
                          </span>
                          <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                            Mi Cuenta
                          </span>
                        </Link>
                      </motion.div>

                      {/* Elemento Carrito */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.65 }}
                      >
                        <Link
                          href="/cart"
                          className="flex flex-col items-center justify-center h-full group py-3 px-3 relative bg-white/60 backdrop-blur-sm rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <span className="w-8 h-8 flex items-center justify-center mb-2 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 text-gray-500 group-hover:text-zaria transition-colors duration-300">
                            <ShoppingBag className="h-5 w-5" />
                          </span>
                          <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                            Carrito
                          </span>
                        </Link>
                      </motion.div>

                      {/* Elemento Lista de Deseos */}
                      <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: 0.7 }}
                        className="col-span-2"
                      >
                        <Link
                          href="#wishlist"
                          className="flex flex-col items-center justify-center group py-3 px-3 relative bg-white/60 backdrop-blur-sm rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all duration-300"
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          <span className="w-8 h-8 flex items-center justify-center mb-2 rounded-full bg-gradient-to-br from-gray-50 to-gray-100 text-gray-500 group-hover:text-zaria transition-colors duration-300">
                            <Heart className="h-5 w-5" />
                          </span>
                          <span className="text-xs font-medium text-gray-700 group-hover:text-gray-900 transition-colors duration-300">
                            Lista de Deseos
                          </span>
                        </Link>
                      </motion.div>
                    </div>
                  </div>
                </div>

                {/* Footer elegante - Más compacto */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.8 }}
                  className="pt-4"
                >
                  <div className="flex items-center justify-center border-t border-gray-100 pt-3">
                    <div className="text-[10px] text-gray-400 tracking-wide font-light">
                      © ZARIA 2025
                    </div>
                  </div>
                </motion.div>
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