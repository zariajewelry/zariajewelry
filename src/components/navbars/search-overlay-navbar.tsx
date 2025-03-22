"use client";

import { useState, useEffect, useRef } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { Search, X, MoveRight, Clock, CircleIcon, StarIcon } from "lucide-react";
import { useScreenSize } from "@/hooks/use-mobile";
import { useDebounce } from "@/hooks/common/useDebounce";
import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

// Interfaces para tipado
interface Product {
  id: number;
  name: string;
  slug: string;
  price: number;
  image: string;
  isNew?: boolean;
}

interface Category {
  id: number;
  name: string;
  slug: string;
  icon: React.ReactNode;
}

interface SearchOverlayProps {
  isOpen: boolean;
  onClose: () => void;
}

// Formateo de precios
const formatPrice = (price: number) => {
  return new Intl.NumberFormat('es-AR', {
    style: 'currency',
    currency: 'ARS',
  }).format(price);
};

// Productos simulados (en producción vendrían de una API)
const exampleProducts: Product[] = [
  {
    id: 1,
    name: "Collar Eternity de Oro Blanco",
    slug: "collar-eternity-oro-blanco",
    price: 24500,
    image: "https://www.wolfandmoon.com/cdn/shop/files/mini-grapefruit-slice-hoops-lifestyle-4.jpg?v=1684851500",
    isNew: true
  },
  {
    id: 2,
    name: "Anillo de Compromiso Diamante",
    slug: "anillo-compromiso-diamante",
    price: 35000,
    image: "https://www.wolfandmoon.com/cdn/shop/files/mini-grapefruit-slice-hoops-lifestyle-4.jpg?v=1684851500"
  },
  {
    id: 3,
    name: "Pulsera Tennis Plata 925",
    slug: "pulsera-tennis-plata",
    price: 12800, 
    image: "https://www.wolfandmoon.com/cdn/shop/files/mini-grapefruit-slice-hoops-lifestyle-4.jpg?v=1684851500"
  },
  {
    id: 4,
    name: "Pendientes de Oro Rosa",
    slug: "pendientes-oro-rosa",
    price: 18900,
    image: "https://www.wolfandmoon.com/cdn/shop/files/mini-grapefruit-slice-hoops-lifestyle-4.jpg?v=1684851500"
  }
];

// Categorías simuladas
const exampleCategories: Category[] = [
  {
    id: 1,
    name: "Anillos",
    slug: "anillos",
    icon: <CircleIcon className="h-6 w-6" />
  },
  {
    id: 2,
    name: "Collares",
    slug: "collares",
    icon: <CircleIcon className="h-6 w-6" />
  },
  {
    id: 3,
    name: "Pulseras",
    slug: "pulseras",
    icon: <CircleIcon className="h-6 w-6" />
  },
  {
    id: 4,
    name: "Pendientes",
    slug: "pendientes",
    icon: <StarIcon className="h-6 w-6" />
  }
];

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
  
  // Historial de búsquedas recientes
  const [recentSearches, setRecentSearches] = useState<string[]>(() => {
    // Intentar cargar del localStorage al iniciar
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('recentSearches');
      return saved ? JSON.parse(saved) : [];
    }
    return [];
  });
  
  // Debounce para no ejecutar la búsqueda en cada cambio
  const debouncedSearch = useDebounce(searchQuery, 300);
  
  // Filtrar productos basados en la búsqueda
  const filteredProducts = debouncedSearch.length > 0
    ? exampleProducts.filter(product => 
        product.name.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    : [];
  
  // Determinar categorías relevantes basadas en la búsqueda
  const relevantCategories = debouncedSearch.length > 0
    ? exampleCategories.filter(category => 
        category.name.toLowerCase().includes(debouncedSearch.toLowerCase()) ||
        filteredProducts.some(p => p.name.toLowerCase().includes(category.name.toLowerCase()))
      )
    : exampleCategories;
  
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

  // Búsqueda completa (con guardado de historial)
  const handleSearch = (term: string) => {
    // Guardar en historial si no está ya y no está vacío
    if (term.trim() && !recentSearches.includes(term)) {
      const newRecent = [term, ...recentSearches.slice(0, 4)];
      setRecentSearches(newRecent);
      localStorage.setItem('recentSearches', JSON.stringify(newRecent));
    }
    
    // Aquí podrías redirigir o manejar la búsqueda
    onClose();
  };

  // Submit del formulario de búsqueda
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      handleSearch(searchQuery);
    }
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
    handleSearch(suggestion);
  };

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
              <form onSubmit={handleSubmit} className="flex items-center w-full max-w-4xl mx-auto border border-black p-3 bg-zaria-purple">
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
                      type="button"
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
                    type="button"
                    onClick={onClose}
                    className="ml-2 flex-shrink-0 cursor-pointer hover:text-zaria-hover-aquamarina transition-colors"
                    aria-label="Cerrar búsqueda"
                  >
                    <X className="h-6 w-6" />
                  </button>
                </div>
              </form>
            </div>
          </motion.div>

          {/* Historial de búsquedas recientes (solo visible cuando no hay consulta) */}
          <AnimatePresence>
            {searchQuery.length === 0 && recentSearches.length > 0 && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed top-[150px] inset-x-0 bg-white z-[101] border-t border-black/10 shadow-lg"
              >
                <div className="container mx-auto px-4 py-6">
                  <div className="w-full max-w-4xl mx-auto">
                    <h3 className="font-vollkorn text-sm uppercase tracking-widest text-zariablack/70 mb-4">
                      Búsquedas recientes
                    </h3>
                    
                    <ul className="divide-y divide-black/5">
                      {recentSearches.map((term) => (
                        <li key={term} className="py-3">
                          <button 
                            type="button"
                            className="flex items-center justify-between w-full hover:text-zaria-hover-aquamarina transition-colors group"
                            onClick={() => setSearchQuery(term)}
                          >
                            <div className="flex items-center">
                              <Clock className="h-4 w-4 mr-3 text-zariablack/60" />
                              <span className="font-univers-next text-base">
                                {term}
                              </span>
                            </div>
                            <div className="flex items-center">
                              <button 
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setRecentSearches(recentSearches.filter(s => s !== term));
                                  localStorage.setItem('recentSearches', JSON.stringify(
                                    recentSearches.filter(s => s !== term)
                                  ));
                                }}
                                className="p-1 hover:text-red-500 transition-colors"
                                aria-label="Eliminar búsqueda"
                              >
                                <X className="h-3 w-3" />
                              </button>
                              <MoveRight className="h-4 w-4 ml-2 opacity-0 group-hover:opacity-100 transition-opacity" />
                            </div>
                          </button>
                        </li>
                      ))}
                    </ul>
                    
                    <button 
                      type="button"
                      onClick={() => {
                        setRecentSearches([]);
                        localStorage.removeItem('recentSearches');
                      }}
                      className="mt-4 text-xs text-zariablack/60 hover:text-zaria-hover-aquamarina transition-colors"
                    >
                      Borrar historial de búsquedas
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Panel desplegable de resultados mejorado */}
          <AnimatePresence>
            {searchQuery.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.2 }}
                className="fixed top-[150px] inset-x-0 bg-white border-t border-black/10 z-[101] shadow-lg max-h-[70vh] overflow-y-auto"
              >
                <div className="container mx-auto px-4 py-8">
                  <div className="w-full max-w-4xl mx-auto">
                    {filteredProducts.length > 0 ? (
                      <div className="grid grid-cols-1 gap-8">
                        {/* Productos destacados */}
                        <section>
                          <h3 className="font-vollkorn text-sm uppercase tracking-widest text-zariablack mb-6 border-b border-black/10 pb-2">
                            Productos Destacados
                          </h3>
                          
                          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                            {filteredProducts.slice(0, 3).map((product) => (
                              <Link 
                                key={product.id}
                                href={`/product/${product.slug}`}
                                className="group"
                                onClick={onClose}
                              >
                                <div className="aspect-square bg-gray-50 relative overflow-hidden">
                                  <Image 
                                    src={product.image}
                                    alt={product.name}
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                                  />
                                  {product.isNew && (
                                    <span className="absolute top-2 right-2 bg-zaria-purple text-white px-2 py-1 text-[10px] font-univers-next uppercase">
                                      Nuevo
                                    </span>
                                  )}
                                </div>
                                <div className="mt-3">
                                  <h4 className="font-univers-next text-sm text-zariablack group-hover:text-zaria-hover-aquamarina transition-colors">
                                    {product.name}
                                  </h4>
                                  <p className="font-univers-next text-sm text-zariablack/70 mt-1">
                                    {formatPrice(product.price)}
                                  </p>
                                </div>
                              </Link>
                            ))}
                          </div>
                        </section>
                        
                        {/* Categorías relacionadas */}
                        {relevantCategories.length > 0 && (
                          <section>
                            <h3 className="font-vollkorn text-sm uppercase tracking-widest text-zariablack mb-4 border-b border-black/10 pb-2">
                              Categorías
                            </h3>
                            
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                              {relevantCategories.map((category) => (
                                <Link 
                                  key={category.id}
                                  href={`/category/${category.slug}`}
                                  className="group p-3 border border-black/10 rounded hover:border-zaria-hover-aquamarina transition-colors"
                                  onClick={onClose}
                                >
                                  <div className="flex flex-col items-center text-center">
                                    <span className="text-zariablack/60 mb-2">
                                      {category.icon}
                                    </span>
                                    <span className="font-univers-next text-sm group-hover:text-zaria-hover-aquamarina transition-colors">
                                      {category.name}
                                    </span>
                                  </div>
                                </Link>
                              ))}
                            </div>
                          </section>
                        )}
                        
                        {/* Términos de búsqueda sugeridos */}
                        <section>
                          <h3 className="font-vollkorn text-sm uppercase tracking-widest text-zariablack mb-4 border-b border-black/10 pb-2">
                            Búsquedas populares
                          </h3>
                          
                          <div className="flex flex-wrap gap-2">
                            {popularSearches.map((term) => (
                              <button
                                type="button"
                                key={term}
                                onClick={() => {
                                  setSearchQuery(term);
                                }}
                                className="px-3 py-1 bg-gray-50 rounded-full text-xs font-univers-next text-zariablack/80 hover:bg-zaria-purple hover:text-white transition-colors"
                              >
                                {term}
                              </button>
                            ))}
                          </div>
                        </section>
                      </div>
                    ) : (
                      <div className="py-8 text-center">
                        <div className="w-16 h-16 mx-auto mb-4 text-zariablack/30">
                          <Search className="w-full h-full" strokeWidth={1} />
                        </div>
                        <h3 className="font-vollkorn text-lg text-zariablack mb-2">
                          No encontramos resultados para "{searchQuery}"
                        </h3>
                        <p className="font-univers-next text-sm text-zariablack/60 max-w-md mx-auto">
                          Intenta con términos más generales o verifica la ortografía.
                        </p>
                        
                        <div className="mt-8">
                          <h4 className="font-vollkorn text-sm uppercase tracking-wide text-zariablack mb-4">
                            Quizás te interese
                          </h4>
                          <div className="flex flex-wrap justify-center gap-2">
                            {popularSearches.map((term) => (
                              <button
                                type="button"
                                key={term}
                                onClick={() => {
                                  setSearchQuery(term);
                                }}
                                className="px-3 py-1 bg-gray-50 rounded-full text-xs font-univers-next text-zariablack/80 hover:bg-zaria-purple hover:text-white transition-colors"
                              >
                                {term}
                              </button>
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                    
                    <div className="mt-8 text-right border-t border-black/10 pt-4">
                      <Link 
                        href={`/search?q=${encodeURIComponent(searchQuery)}`}
                        className="inline-flex items-center font-univers-next text-sm text-zariablack hover:text-zaria-hover-aquamarina group"
                        onClick={() => {
                          handleSearch(searchQuery);
                          onClose();
                        }}
                      >
                        <span>Ver todos los resultados para "{searchQuery}"</span>
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