"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Search, SlidersHorizontal, X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { useIsMobile } from "@/hooks/use-mobile";
import AnimatedSection from "@/components/customs/animated/Animated-section";
import SearchBar from "@/components/search/searchBar";
import MobileFilters from "@/components/mobile/MobileFilters";
import ProductFilters from "@/components/products/products-filters";
import ProductGrid from "@/components/products/productsGrid";
import Image from "next/image";

export default function ProductsPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [activeFilters, setActiveFilters] = useState<{
    categories: string[];
    materials: string[];
    priceRange: [number, number];
    availability: string[];
    rating: number | null;
    discount: boolean;
    sortBy: string;
  }>({
    categories: [],
    materials: [],
    priceRange: [0, 5000],
    availability: [],
    rating: null,
    discount: false,
    sortBy: "popular",
  });

  const isMobile = useIsMobile();

  // Reset scroll position when filters change
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [activeFilters]);

  const handleFilterChange = (filterType: string, value: any) => {
    setActiveFilters((prev) => ({
      ...prev,
      [filterType]: value,
    }));
  };

  const clearFilters = () => {
    setActiveFilters({
      categories: [],
      materials: [],
      priceRange: [0, 5000],
      availability: [],
      rating: null,
      discount: false,
      sortBy: "popular",
    });
    setSearchQuery("");
  };

  const hasActiveFilters = () => {
    return (
      activeFilters.categories.length > 0 ||
      activeFilters.materials.length > 0 ||
      activeFilters.availability.length > 0 ||
      activeFilters.rating !== null ||
      activeFilters.discount ||
      searchQuery !== "" ||
      activeFilters.priceRange[0] > 0 ||
      activeFilters.priceRange[1] < 5000
    );
  };

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Banner + Search Section - Diseño premium */}
      <div className="relative">
        {/* Background Image Section */}
        <div className="relative h-[40vh] md:h-[50vh] lg:h-[60vh] overflow-hidden">
          {/* Overlay con gradiente sofisticado */}
          <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/30 to-black/60 z-10"></div>

          <Image
            src="https://i.ibb.co/xSXwq272/zaria-banner-products-2.png" // Reemplazar con una imagen profesional de joyería
            alt="Colección ZARIA Joyas"
            fill
            priority
            className="object-cover object-center scale-105 transition-transform duration-[25s] hover:scale-100"
          />

          {/* Contenido principal centrado en el banner */}
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
            <AnimatedSection animation="fadeSlideUp" delay={0.1}>
              <span className="inline-block text-zaria text-sm tracking-widest uppercase mb-2">
                Colección 2025
              </span>
              <h1 className="font-serif text-4xl md:text-5xl lg:text-6xl text-white mb-4 max-w-3xl">
                Nuestra Colección
              </h1>
              <p className="text-white/80 max-w-xl mx-auto text-sm md:text-base">
                Diseños exclusivos elaborados con los materiales más finos para
                momentos inolvidables
              </p>
            </AnimatedSection>
          </div>
        </div>

        {/* Panel de navegación y búsqueda - Diseño premium 2023 */}
        <div className="relative bg-white z-30 border-b border-gray-100">
          <div className="container mx-auto">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 md:py-5 px-4 md:px-6 gap-4">
              {/* Breadcrumbs con diseño refinado */}
              <nav aria-label="Breadcrumb" className="flex-shrink-0">
                <ol className="flex items-center">
                  <li className="text-xs md:text-sm tracking-wide text-gray-500 hover:text-gray-700 transition-colors">
                    <Link href="/" className="flex items-center">
                      <span>Inicio</span>
                    </Link>
                  </li>
                  <li className="mx-2 text-gray-300">
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
                        strokeWidth="1.25"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </li>
                  <li className="text-xs md:text-sm tracking-wide text-gray-800 font-medium">
                    <span>Productos</span>
                  </li>
                </ol>
              </nav>

              {/* Barra de búsqueda con estilo premium */}
              <div className="w-full md:w-auto md:max-w-xs lg:max-w-sm">
                <div className="relative group">
                  <SearchBar
                    value={searchQuery}
                    onChange={setSearchQuery}
                    placeholder="Buscar productos..."
                    className="bg-gray-50 border-gray-100 rounded-lg pl-9 h-10 text-sm shadow-none transition-all duration-300 
            group-hover:border-gray-200 focus-within:border-zaria focus-within:ring-1 focus-within:ring-zaria"
                  />
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-300" />
                  {searchQuery && (
                    <button
                      onClick={() => setSearchQuery("")}
                      className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 flex items-center justify-center rounded-full 
              bg-gray-200 hover:bg-gray-300 text-gray-500 hover:text-gray-700 transition-all duration-300"
                    >
                      <X className="h-3 w-3" />
                    </button>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-4">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Mobile Filters Toggle & Sort - Layout mejorado */}
          {isMobile && (
            <div className="h-16 flex justify-center items-center gap-3 sticky top-[56px] z-10 w-full bg-gradient-to-b from-white/90 to-white/75 backdrop-blur-lg">
              <Button
                onClick={toggleMobileFilters}
                variant="outline"
                className="h-9 px-3.5 text-sm text-black border-gray-200 hover:bg-zaria hover:text-white hover:border-zaria flex-shrink-0 shadow-sm"
              >
                <SlidersHorizontal className="h-3.5 w-3.5 mr-1.5" />
                Filtros
              </Button>

              <div className="flex-1 relative">
                <div className="absolute inset-y-0 right-0 flex items-center pointer-events-none pr-2 ">
                  <svg
                    width="10"
                    height="6"
                    viewBox="0 0 10 6"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    className="text-gray-400"
                  >
                    <path
                      d="M1 1L5 5L9 1"
                      stroke="currentColor"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </div>

                <select
                  value={activeFilters.sortBy}
                  onChange={(e) => handleFilterChange("sortBy", e.target.value)}
                  className="h-9 w-full bg-gradient-to-b from-white/90 to-white/75 backdrop-blur-lg  appearance-none text-sm border border-gray-200 rounded-md pl-3 pr-8 py-0 focus:border-zaria focus:ring-1 focus:ring-zaria shadow-sm"
                >
                  <option value="" disabled>
                    Ordenar por
                  </option>
                  <option value="popular">Más vendidos</option>
                  <option value="price_asc">Precio: menor</option>
                  <option value="price_desc">Precio: mayor</option>
                  <option value="newest">Novedades</option>
                </select>
              </div>
            </div>
          )}

          {/* Mobile Filters Drawer */}
          {isMobile && (
            <MobileFilters
              isOpen={showMobileFilters}
              onClose={() => setShowMobileFilters(false)}
              activeFilters={activeFilters}
              onChange={handleFilterChange}
              onClear={clearFilters}
            />
          )}

          {/* Desktop Filters Sidebar */}
          {!isMobile && (
            <div className="md:w-64 lg:w-72 flex-shrink-0">
              <div className="sticky top-24">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="font-serif text-lg">Filtros</h2>
                  {hasActiveFilters() && (
                    <Button
                      variant="link"
                      onClick={clearFilters}
                      className="text-sm p-0 h-auto text-gray-500 hover:text-zaria"
                    >
                      Limpiar filtros
                    </Button>
                  )}
                </div>

                <ProductFilters
                  activeFilters={activeFilters}
                  onChange={handleFilterChange}
                />
              </div>
            </div>
          )}

          {/* Main Content */}
          <div className="flex-1">
            {/* Applied Filters & Sort (Desktop) */}
            {!isMobile && (
              <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
                <div className="flex flex-wrap items-center gap-2">
                  {searchQuery && (
                    <div className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
                      <span>Búsqueda: {searchQuery}</span>
                      <button
                        onClick={() => setSearchQuery("")}
                        className="ml-2 text-gray-500 hover:text-black"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                  {activeFilters.categories.map((category) => (
                    <div
                      key={category}
                      className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm"
                    >
                      <span>{category}</span>
                      <button
                        onClick={() =>
                          handleFilterChange(
                            "categories",
                            activeFilters.categories.filter(
                              (c) => c !== category
                            )
                          )
                        }
                        className="ml-2 text-gray-500 hover:text-black"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  {activeFilters.materials.map((material) => (
                    <div
                      key={material}
                      className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm"
                    >
                      <span>{material}</span>
                      <button
                        onClick={() =>
                          handleFilterChange(
                            "materials",
                            activeFilters.materials.filter(
                              (m) => m !== material
                            )
                          )
                        }
                        className="ml-2 text-gray-500 hover:text-black"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                  {(activeFilters.priceRange[0] > 0 ||
                    activeFilters.priceRange[1] < 5000) && (
                    <div className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
                      <span>
                        {activeFilters.priceRange[0]}€ -{" "}
                        {activeFilters.priceRange[1]}€
                      </span>
                      <button
                        onClick={() =>
                          handleFilterChange("priceRange", [0, 5000])
                        }
                        className="ml-2 text-gray-500 hover:text-black"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                  {activeFilters.discount && (
                    <div className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
                      <span>En oferta</span>
                      <button
                        onClick={() => handleFilterChange("discount", false)}
                        className="ml-2 text-gray-500 hover:text-black"
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  )}
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm text-gray-500">Ordenar por:</span>
                  <select
                    value={activeFilters.sortBy}
                    onChange={(e) =>
                      handleFilterChange("sortBy", e.target.value)
                    }
                    className="text-sm border-gray-200 rounded-md focus:border-zaria focus:ring-0 py-1 pl-2 pr-8"
                  >
                    <option value="popular">Más vendidos</option>
                    <option value="price_asc">Precio: menor a mayor</option>
                    <option value="price_desc">Precio: mayor a menor</option>
                    <option value="newest">Novedades</option>
                    <option value="rating">Mejor calificados</option>
                  </select>
                </div>
              </div>
            )}

            {/* Product Grid */}
            <ProductGrid searchQuery={searchQuery} filters={activeFilters} />
          </div>
        </div>
      </div>
    </div>
  );
}
