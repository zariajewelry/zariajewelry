"use client";

import { useState } from "react";
import { Plus, X  } from "lucide-react";
import { useIsMobile } from "@/hooks/use-mobile";
import MobileFilters from "@/components/mobile/MobileFilters";
import ProductFilters from "@/components/products/products-filters";
import ProductGrid from "@/components/products/productsGrid";
import { useProductFilters } from "@/hooks/products/useProductFilters";
import HeroBanner from "@/components/hero/HeroBanner";
import SearchNavPanel from "@/components/navigation/SearchNavPanel";
import MobileFilterBar from "@/components/products/MobileFilterBar";
import AppliedFiltersTags from "@/components/products/AppliedFiltersTags";
import SortSelector from "@/components/products/SortSelector";
import { AnimatePresence, motion } from "framer-motion";


export default function ProductsPage() {
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [showDesktopFilters, setShowDesktopFilters] = useState(false);

  const toggleDesktopFilters = () => {
    setShowDesktopFilters(!showDesktopFilters);
  };
  
  const {
    filters: activeFilters,
    searchQuery,
    currentPage,
    handleFilterChange,
    handleSearch,
    handlePageChange,
    clearFilters,
    hasActiveFilters
  } = useProductFilters();

  const isMobile = useIsMobile();

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  return (
    <div className="min-h-screen bg-zaria">
      <div className="relative">
        <HeroBanner
          title="TIENDA"
          tagline="Colección 2025"
          description="Diseños exclusivos elaborados con los materiales más finos para momentos inolvidables"
          imageUrl="https://i.ibb.co/xSXwq272/zaria-banner-products-2.png"
          imageAlt="Colección ZARIA Joyas"
        />

        <SearchNavPanel
          id="products-container"
          breadcrumbItems={[
            { label: "Inicio", href: "/" },
            { label: "Productos", active: true }
          ]}
          searchQuery={searchQuery}
          onSearch={handleSearch}
          searchPlaceholder="Buscar productos..."
          debounceDelay={400}
        />
      </div>

      <div className="container mx-auto px-4 py-4">
        {/* Mobile Filters Toggle & Sort */}
        {isMobile && (
          <MobileFilterBar
            onToggleFilters={toggleMobileFilters}
            sortBy={activeFilters.sortBy}
            onSortChange={(value) => handleFilterChange("sortBy", value)}
            activeFiltersCount={
              activeFilters.categories.length +
              activeFilters.materials.length +
              (activeFilters.discount ? 1 : 0) +
              (activeFilters.priceRange[0] > 0 || activeFilters.priceRange[1] < 5000 ? 1 : 0)
            }
          />
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

        {/* Desktop Unified Toolbar */}
        {/* Desktop Unified Toolbar */}
{!isMobile && (
  <div className="mb-6">
    <div className="flex items-center justify-between">
      {/* Filters Button - Left Side */}
      <div className="flex-shrink-0">
        <button
          onClick={toggleDesktopFilters}
          className="group w-32 h-10 flex items-center justify-center border p-2 bg-productcard transition-all"
          aria-label="Mostrar filtros"
        >
          <div className="w-full h-full flex items-center bg-white p-4 gap-2">
            <span className="text-xs font-montserrat font-light text-gray-800 group-hover:text-zaria transition-colors">FILTROS</span>
            <Plus className="h-3 w-3 text-gray-600" />
          </div>
        </button>
      </div>
      
      {/* Applied Filters - Center */}
      <div className="flex-grow px-4 overflow-x-auto hide-scrollbar">
        <AppliedFiltersTags
          searchQuery={searchQuery}
          onSearchClear={() => handleSearch("")}
          filters={activeFilters}
          onFilterChange={handleFilterChange}
        
        />
      </div>
      
      {/* Sort Selector - Right Side (ahora con menú desplegable) */}
      <div className="flex-shrink-0">
  <SortSelector
    value={activeFilters.sortBy}
    onChange={(value) => handleFilterChange("sortBy", value)}
    compact={true}  // Esto hace que se muestre el botón "ORDENAR +"
  />
</div>
    </div>
  </div>
)}
        {/* Añade el panel deslizante para filtros */}
        {!isMobile && (
          <AnimatePresence>
            {showDesktopFilters && (
              <>
                {/* Overlay para cerrar al hacer clic fuera */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.2 }}
                  className="fixed inset-0 bg-black/20 z-40"
                  onClick={() => setShowDesktopFilters(false)}
                />

                {/* Panel deslizante */}
                <motion.div
                  initial={{ x: "-100%", boxShadow: "0 0 0 rgba(0, 0, 0, 0)" }}
                  animate={{ x: 0, boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)" }}
                  exit={{ x: "-100%", boxShadow: "0 0 0 rgba(0, 0, 0, 0)" }}
                  transition={{ type: "spring", damping: 30, stiffness: 300 }}
                  className="fixed left-0 top-0 h-screen w-80 bg-white z-50 overflow-y-auto"
                >
                  <div className="p-5 border-b sticky top-0 bg-white z-10 flex items-center justify-between">
                    <h2 className="font-lato text-xl">FILTROS</h2>
                    <button
                      onClick={() => setShowDesktopFilters(false)}
                      className="p-1 rounded-full hover:bg-gray-100"
                      aria-label="Cerrar panel de filtros"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="p-5">
                    {hasActiveFilters() && (
                      <div className="flex justify-end mb-4">
                        <button
                          onClick={clearFilters}
                          className="w-[120px] h-[26px] border border-zaria text-zaria text-sm cursor-pointer hover:bg-zaria/20 hover:text-black transition-colors duration-300">
                          Limpiar filtros
                        </button>
                      </div>
                    )}

                    <ProductFilters
                      activeFilters={activeFilters}
                      onChange={handleFilterChange}
                    />
                  </div>
                </motion.div>
              </>
            )}
          </AnimatePresence>
        )}

        {/* Product Grid */}
        <ProductGrid
          searchQuery={searchQuery}
          filters={activeFilters}
          currentPage={currentPage}
          onPageChange={handlePageChange}
          clearFilters={clearFilters}
        />
      </div>
    </div>
  );
}