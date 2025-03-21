"use client";

import { useState, useEffect, useCallback, useRef, RefObject } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { Facebook, Heart, Menu, MoveRight, Search, ShoppingBag, Twitter, UserRound, X } from "lucide-react";
import { cn } from "@/lib/utils";
import CartButton from "../buttons/cart-button";
import { useOnClickOutside } from "@/hooks/use-click-outside";
import { UserDropdown } from "./user-navbar-dropdown";
import SearchOverlay from "./search-overlay-navbar";
import { FaGem, FaStar, FaGift } from "react-icons/fa";
import { useScreenSize } from "@/hooks/use-mobile";
import { BsInstagram } from "react-icons/bs";

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

  const { isMobile, isTablet } = useScreenSize();

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
          { isMobile || isTablet ? (
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
                  <h1 className="font-univers-next font-light text-2xl text-black tracking-wider transition-colors cursor-pointer">
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
                <CartButton className="flex items-center justify-center text-black" />
              </div>
            </div>
          )}
        </div>
      </motion.header>

      {/* Mobile Menu */}
       {/* Mobile Menu - Rediseñado para seguir el estilo Zaria */}
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
      {/* Fondo sólido en lugar de gradiente */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="absolute inset-0 bg-zariabg"
        onClick={toggleMobileMenu}
      />

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.3 }}
        className="relative h-full w-full flex flex-col overflow-y-auto"
      >
        {/* Header con botón de cierre */}
        <div className="flex justify-between items-center p-4 border-b border-black">
          <Link href="/" onClick={() => setMobileMenuOpen(false)}>
            <h1 className="font-vollkorn font-semibold text-xl tracking-widest text-zariablack">
              ZARIA
            </h1>
          </Link>
          <button
            onClick={toggleMobileMenu}
            aria-label="Cerrar menú"
            className="p-2"
          >
            <X className="h-5 w-5 text-zariablack" />
          </button>
        </div>

        {/* Contenido principal */}
        <div className="flex-1 py-4">
          {/* Navegación principal */}
          <nav className="mb-6">
            <ul className="space-y-0">
              {MOBILE_NAVIGATION.slice(0, 5).map((item, index) => (
                <li 
                  key={item.label}
                  className={`border-b border-black/10 ${index === 0 ? 'border-t' : ''}`}
                >
                  <Link
                    href={item.href}
                    className="flex items-center justify-between py-4 px-6"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="font-univers-next text-sm tracking-wide text-zariablack">
                      {item.label.toUpperCase()}
                    </span>
                    {item.hasSubmenu ? (
                      <svg
                        width="12"
                        height="12"
                        viewBox="0 0 24 24"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        className="stroke-zariablack"
                      >
                        <path
                          d="M9 6l6 6-6 6"
                          strokeWidth="1.5"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </svg>
                    ) : (
                      <MoveRight className="h-4 w-4 text-zariablack" />
                    )}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Separador */}
          <div className="w-full h-[10px] bg-zariabg mb-6 border-y border-black/10"></div>

          {/* Cuenta y opciones de usuario */}
          <div className="px-6 mb-8">
            <h3 className="font-vollkorn font-semibold text-xs tracking-widest text-zariablack mb-4">
              MI CUENTA
            </h3>
            <ul className="space-y-4">
              {[
                { icon: <UserRound className="h-4 w-4" />, label: "Mi Perfil", href: "/account" },
                { icon: <ShoppingBag className="h-4 w-4" />, label: "Mis Pedidos", href: "/orders" },
                { icon: <Heart className="h-4 w-4" />, label: "Lista de Deseos", href: "/wishlist" }
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="flex items-center group"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="text-zariablack mr-3">{item.icon}</span>
                    <span className="font-univers-next text-xs text-zariablack relative group-hover:text-zaria-hover-aquamarina transition-colors">
                      {item.label}
                      <span className="absolute -bottom-[3px] left-0 w-0 h-[1px] bg-zaria-hover-aquamarina group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Enlaces adicionales */}
          <div className="px-6 mb-8">
            <h3 className="font-vollkorn font-semibold text-xs tracking-widest text-zariablack mb-4">
              INFORMACIÓN
            </h3>
            <ul className="space-y-4">
              {[
                { label: "Contacto", href: "/contact" },
                { label: "Envíos y Devoluciones", href: "/shipping" },
                { label: "Términos y Condiciones", href: "/terms" }
              ].map((item) => (
                <li key={item.label}>
                  <Link
                    href={item.href}
                    className="font-univers-next text-xs text-zariablack group relative inline-block"
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span className="group-hover:text-zaria-hover-aquamarina transition-colors">
                      {item.label}
                    </span>
                    <span className="absolute -bottom-[3px] left-0 w-0 h-[1px] bg-zaria-hover-aquamarina group-hover:w-full transition-all duration-300"></span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Redes sociales */}
          <div className="px-6 mb-6">
            <h3 className="font-vollkorn font-semibold text-xs tracking-widest text-zariablack mb-4">
              SÍGUENOS
            </h3>
            <div className="flex space-x-5">
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                aria-label="Instagram"
              >
                <BsInstagram className="w-4 h-4 text-zariablack hover:text-zaria-hover-aquamarina transition-colors" />
              </motion.a>
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 text-zariablack hover:text-zaria-hover-aquamarina transition-colors" />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4 text-zariablack hover:text-zaria-hover-aquamarina transition-colors" />
              </motion.a>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="mt-auto border-t border-black py-4 px-6">
          <p className="font-univers-next text-[10px] text-zariablack/70 text-center">
            © {new Date().getFullYear()} Zaria Jewelry. Todos los derechos reservados.
          </p>
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
