"use client";

import React, { useState, useEffect } from "react";
import { Search, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import SearchBar from "@/components/search/searchBar";
import CustomBreadcrumbs, { BreadcrumbItemData } from "./Breadcrumbs";

interface SearchNavPanelProps {
  breadcrumbItems: BreadcrumbItemData[];
  searchQuery: string;
  onSearch: (query: string) => void;
  searchPlaceholder?: string;
  className?: string;
  id?: string;
  debounceDelay?: number;
  isMobile?: boolean;
}

export default function SearchNavPanel({
  breadcrumbItems,
  searchQuery,
  onSearch,
  searchPlaceholder,
  className = "",
  id = "products-container",
  debounceDelay = 400,
  isMobile,
}: SearchNavPanelProps) {
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [isCursorVisible, setIsCursorVisible] = useState(true);

  // Efecto para el parpadeo del cursor
  useEffect(() => {
    if (!isSearchOpen) return;

    const interval = setInterval(() => {
      setIsCursorVisible((prev) => !prev);
    }, 530);

    return () => clearInterval(interval);
  }, [isSearchOpen]);

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  return (
    <div id={id} className={`relative bg-zariabg z-30 ${isMobile ? 'border-b border-black' : ''} ${className}`}>
      {/* Barra de búsqueda móvil que aparece arriba en posición absoluta */}
      {isMobile && isSearchOpen && (
        <motion.div
          initial={{ x: "-100%" }}
          animate={{ x: 0 }}
          exit={{ x: "-100%" }}
          transition={{ duration: 0.3, ease: "easeOut" }}
          className="absolute top-1.5 left-0 w-full z-40 bg-zariabg"
        >
          <div className="px-4 ">
            <div className="flex items-center w-full p-2 bg-amber-400 border border-black">
              <Search className="h-6 w-6 mr-3 flex-shrink-0" strokeWidth={1} />

              <div className="relative flex-grow border-b border-black">
                <SearchBar
                  value={searchQuery}
                  onChange={onSearch}
                  placeholder={searchPlaceholder}
                  className="w-full h-[50px] border-none outline-none shadow-none text-[18px] focus:ring-0 focus:outline-none px-2 py-1"
                  debounceDelay={debounceDelay}
                  autoFocus
                  minimalStyle={true}
                  showSuggestions={false}
                  showSearchIcon={false}
                  showClearButton={false}
                />

                {searchQuery.length === 0 && (
                  <span
                    className={`absolute left-0 top-2 h-8 w-0.5 bg-black transition-opacity duration-100 ${
                      isCursorVisible ? "opacity-100" : "opacity-0"
                    }`}
                  />
                )}
              </div>

              <button
                onClick={toggleSearch}
                className="ml-2 flex-shrink-0"
                aria-label="Cerrar búsqueda"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        </motion.div>
      )}

      <div className="w-full mx-auto">
        {/* Contenedor principal con una única fila flexible (sin modificar) */}
        <div className="px-4 md:px-6 min-h-[80px] flex items-center">
          <div className="w-full flex items-center justify-between relative">
            {/* Breadcrumbs (sin modificar) */}
            <CustomBreadcrumbs
              items={breadcrumbItems}
              className={`flex-1 transition-all w-auto`}
            />

            <AnimatePresence mode="wait">
              {!isSearchOpen ? (
                /* Botón de búsqueda (sin modificar) */
                <motion.button
                  key="search-button"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.15 }}
                  onClick={toggleSearch}
                  className="flex items-center justify-center border border-black h-10 w-10 flex-shrink-0 cursor-pointer"
                  aria-label="Abrir búsqueda"
                >
                  <Search className="h-4 w-4" />
                </motion.button>
              ) : (
                /* Barra de búsqueda centrada (solo visible en desktop) */
                !isMobile && (
                  <motion.div
                    key="search-input-container"
                    initial={{ opacity: 0, width: 0 }}
                    animate={{ opacity: 1, width: "auto" }}
                    exit={{ opacity: 0, width: 0 }}
                    transition={{ duration: 0.2 }}
                    className="flex items-center flex-1 justify-center px-4"
                  >
                    <div className="flex items-center md:w-[420px] lg:w-[460px] 2xl:w-full max-w-xl border border-black p-2 bg-amber-400">
                      <Search
                        className="h-8 w-8 mr-3 flex-shrink-0"
                        strokeWidth={1}
                      />

                      {/* Contenedor del input con borde inferior */}
                      <div className="relative flex-grow border-b border-black">
                        <SearchBar
                          value={searchQuery}
                          onChange={onSearch}
                          placeholder={searchPlaceholder}
                          className="w-full h-[60px] border-none outline-none shadow-none text-[26px] focus:ring-0 focus:outline-none px-2 py-1"
                          debounceDelay={debounceDelay}
                          autoFocus
                          minimalStyle={true}
                          showSuggestions={false}
                          showSearchIcon={false}
                          showClearButton={false}
                        />

                        {/* Cursor personalizado - sin cambios */}
                        {searchQuery.length === 0 && (
                          <span
                            className={`absolute left-0 top-2 h-10 w-0.5 bg-black transition-opacity duration-100 ${
                              isCursorVisible ? "opacity-100" : "opacity-0"
                            }`}
                          />
                        )}
                      </div>

                      <button
                        onClick={toggleSearch}
                        className="ml-2 flex-shrink-0 cursor-pointer"
                        aria-label="Cerrar búsqueda"
                      >
                        <X className="h-4 w-4" />
                      </button>
                    </div>
                  </motion.div>
                )
              )}
            </AnimatePresence>

            {/* Mantenido tal cual estaba */}
            {isSearchOpen && <div className="flex-1"></div>}
          </div>
        </div>
      </div>
    </div>
  );
}
