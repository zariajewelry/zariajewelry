"use client";

import { useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X } from "lucide-react";
import { useScreenSize } from "@/hooks/use-mobile";


interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { isMobile } = useScreenSize();

  useEffect(() => {
    if (isOpen && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-deathzone z-40"
            onClick={onClose}
            aria-hidden="true"
          />

          <motion.div
            initial={{ y: "-100%", opacity: 0.8 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: "-100%", opacity: 0.8 }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
              opacity: { duration: 0.2 },
            }}
            className="h-[260px] lg:h-[210px] 2xl:h-[200px] fixed top-0 inset-x-0 bg-white shadow-lg z-50"
          >
            {/* Elemento decorativo */}
            <div className="absolute left-0 top-0 w-full h-1 bg-gradient-to-r from-transparent via-zaria to-transparent opacity-70"></div>

            {/* Botón de cierre en la esquina superior derecha (fuera del contenedor principal) */}
            <div className="absolute top-4 right-4 cursor-pointer">
              <button
                onClick={onClose}
                className="p-1 hover:text-zaria transition-colors relative group"
                aria-label="Cerrar búsqueda"
              >
                <span className="absolute inset-0 scale-0 group-hover:scale-100 transition-transform duration-300 bg-gray-100 rounded-full"></span>
                <X className="h-4 w-4 relative z-10" />
              </button>
            </div>

            {/* Contenedor principal centrado verticalmente */}
            <div
              className="container mx-auto px-4 py-5 mt-10 lg:mt-0 flex flex-col items-center justify-center"
              style={{ height: "200px" }}
            >
              {/* Título centrado */}
              <h3 className="text-lg font-serif text-gray-800 mb-4">
                What are you looking for?
              </h3>

              {/* Input de búsqueda con icono a la derecha */}
              <div className="w-full max-w-md flex items-center border-b border-gray-300 pb-2 relative mb-5">
                {/* Icono a la izquierda solo en móvil */}
                {isMobile && (
                  <Search className="h-5 w-5 text-gray-400 mr-3 cursor-pointer" />
                )}

                <input
                  ref={inputRef}
                  type="text"
                  placeholder="Search for products, brands and more" // Cambiado para coincidir con el título
                  className={`flex-1 bg-transparent border-none outline-none text-base ${
                    isMobile
                      ? "text-left pl-[43px]"
                      : "text-center" 
                  } text-gray-600 placeholder:text-gray-500 placeholder:text-xs`}
                  onClick={(e) => e.stopPropagation()}
                />

                {/* Icono a la derecha solo en tablets y superior */}
                {!isMobile && (
                  <Search className="h-5 w-5 text-gray-400 absolute right-0 top-1 cursor-pointer" />
                )}
              </div>

              {/* Búsquedas populares */}
              <div className="text-center">
                <p className="text-xs uppercase tracking-wider text-gray-500 mb-3 after:content-[''] after:block after:w-12 after:h-px after:bg-gray-200 after:mx-auto after:mt-2">
                  Popular searches
                </p>
                <div className="flex flex-wrap gap-2 justify-center">
                  {[
                    "Anillos",
                    "Collares",
                    "Pendientes",
                    "Pulseras",
                    "Relojes",
                  ].map((term) => (
                    <button
                      key={term}
                      className="px-3 py-1 bg-gray-50 hover:bg-zaria/10 text-sm rounded-none transition-all cursor-pointer border-b border-transparent hover:border-zaria/30"
                    >
                      {term}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
