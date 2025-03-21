"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, MoveRight } from "lucide-react";
import { useScreenSize } from "@/hooks/use-mobile";
import { useDebounce } from "@/hooks/common/useDebounce";
import Link from "next/link";
import { cn } from "@/lib/utils";

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

// Búsquedas populares para sugerencias
const popularSearches = [
  "Anillos de compromiso",
  "Pendientes dorados",
  "Pulseras de plata",
  "Collares minimalistas",
  "Joyas de diamantes"
];

export default function SearchOverlay({ isOpen, onClose }: SearchOverlayProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const { isMobile } = useScreenSize();
  
  // Estados para la búsqueda
  const [searchQuery, setSearchQuery] = useState("");
  const [isCursorVisible, setIsCursorVisible] = useState(true);
  
  // Debounce para no ejecutar la búsqueda en cada cambio
  const debouncedSearch = useDebounce(searchQuery, 300);
  
  // Efecto para el cursor parpadeante
  useEffect(() => {
    if (isOpen && searchQuery.length === 0) {
      const cursorInterval = setInterval(() => {
        setIsCursorVisible(prev => !prev);
      }, 600);
      return () => clearInterval(cursorInterval);
    }
  }, [isOpen, searchQuery]);

  // Efecto para el autofocus
  useEffect(() => {
    if (isOpen && inputRef.current) {
      const timer = setTimeout(() => {
        inputRef.current?.focus();
      }, 100);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  // Efecto para manejar ESC
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape" && isOpen) {
        onClose();
      }
    };

    window.addEventListener("keydown", handleEscape);
    return () => window.removeEventListener("keydown", handleEscape);
  }, [isOpen, onClose]);

  // Manejar cambios en la búsqueda
  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  // Limpiar la búsqueda
  const clearSearch = () => {
    setSearchQuery("");
    if (inputRef.current) {
      inputRef.current.focus();
    }
  };

  // Seleccionar una sugerencia
  const handleSuggestionClick = (suggestion: string) => {
    setSearchQuery(suggestion);
    // Aquí podrías redirigir a la página de resultados
  };

  // Filtrar sugerencias basadas en la búsqueda
  const filteredSuggestions = searchQuery.length > 0
    ? popularSearches.filter(term => 
        term.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Overlay de fondo */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            className="fixed inset-0 bg-zariablack/60 z-[100]"
            onClick={onClose}
            aria-hidden="true"
          />

          {/* Panel de búsqueda principal */}
          <motion.div
            initial={{ y: "-100%" }}
            animate={{ y: 0 }}
            exit={{ y: "-100%" }}
            transition={{
              type: "spring",
              damping: 30,
              stiffness: 300,
            }}
            className="fixed top-0 inset-x-0 bg-zariabg border-b border-black z-[101] h-[150px]"
          >
            <div className="container mx-auto px-4 h-full flex items-center justify-center">
              {/* Barra de búsqueda estilizada */}
              <div className="flex items-center w-full max-w-4xl mx-auto border border-black p-3 bg-zaria-purple">
                {/* Ícono de búsqueda */}
                <Search
                  className="h-8 w-8 mr-3 flex-shrink-0 text-zariablack"
                  strokeWidth={1.5}
                />
                
                {/* Campo de entrada */}
                <div className="relative flex-grow border-b border-black">
                  <input
                    ref={inputRef}
                    type="text"
                    value={searchQuery}
                    onChange={handleSearchChange}
                    placeholder="¿QUÉ ESTÁS BUSCANDO?"
                    className={cn(
                      "w-full h-[60px] bg-transparent border-none outline-none shadow-none",
                      "focus:ring-0 focus:outline-none font-univers-next",
                      "text-sm text-zariablack placeholder:text-zariablack/70",
                      "tracking-wide px-2",
                      !searchQuery ? "caret-transparent" : ""
                    )}
                    onClick={(e) => e.stopPropagation()}
                  />
                  
                  {/* Cursor personalizado cuando está vacío */}
                  {searchQuery.length === 0 && (
                    <span
                      className={`absolute left-2 top-[30px] -translate-y-1/2 h-10 w-0.5 bg-black transition-opacity duration-100 ${
                        isCursorVisible ? "opacity-100" : "opacity-0"
                      }`}
                    />
                  )}
                </div>
                
                {/* Botones a la derecha */}
                <div className="flex items-center">
                  {/* Botón para limpiar - solo visible cuando hay texto */}
                  {searchQuery.length > 0 && (
                    <button
                      onClick={clearSearch}
                      className="mr-3 flex-shrink-0 cursor-pointer hover:text-zaria-hover-aquamarina transition-colors"
                      aria-label="Limpiar búsqueda"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  )}
                  
                  {/* Línea divisoria vertical */}
                  <div className="h-8 w-px bg-black/30 mx-2"></div>
                  
                  {/* Botón para cerrar - siempre visible */}
                  <button
                    onClick={onClose}
                    className="ml-2 flex-shrink-0 cursor-pointer hover:text-zaria-hover-aquamarina transition-colors"
                    aria-label="Cerrar búsqueda"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Panel desplegable de resultados */}
          <AnimatePresence>
            {searchQuery.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="fixed top-[150px] inset-x-0 bg-white border-t border-black/10 z-[101] shadow-lg"
              >
                <div className="container mx-auto px-4 py-6">
                  <div className="w-full max-w-4xl mx-auto">
                    {filteredSuggestions.length > 0 ? (
                      <>
                        <h3 className="font-vollkorn text-sm uppercase tracking-widest text-zariablack mb-4">
                          Resultados
                        </h3>
                        
                        <ul className="divide-y divide-black/5">
                          {filteredSuggestions.map((suggestion) => (
                            <li key={suggestion} className="py-3">
                              <Link 
                                href={`/search?q=${encodeURIComponent(suggestion)}`}
                                className="flex items-center justify-between w-full hover:text-zaria-hover-aquamarina transition-colors group"
                                onClick={() => {
                                  handleSuggestionClick(suggestion);
                                  onClose();
                                }}
                              >
                                <div className="flex items-center">
                                  <Search className="h-4 w-4 mr-3 text-zariablack/60" />
                                  <span className="font-univers-next text-base">
                                    {suggestion}
                                  </span>
                                </div>
                                <MoveRight className="h-4 w-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </>
                    ) : (
                      <div className="py-4 text-center">
                        <p className="font-univers-next text-sm text-zariablack/60">
                          No se encontraron resultados para "{searchQuery}"
                        </p>
                      </div>
                    )}
                    
                    <div className="mt-6 text-right">
                      <Link 
                        href={`/search?q=${encodeURIComponent(searchQuery)}`}
                        className="inline-flex items-center font-univers-next text-sm text-zariablack hover:text-zaria-hover-aquamarina group"
                        onClick={onClose}
                      >
                        <span>Ver todos los resultados</span>
                        <MoveRight className="h-4 w-4 ml-2 transition-transform group-hover:translate-x-1" />
                      </Link>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Texto de ayuda */}
          {!isMobile && (
            <div className="fixed bottom-10 left-0 right-0 text-center z-[101]">
              <p className="font-univers-next text-xs text-white/80">
                Presiona Enter para buscar o ESC para cerrar
              </p>
            </div>
          )}
        </>
      )}
    </AnimatePresence>
  );
}