"use client";

import { useState } from "react";
import { Plus, X } from "lucide-react";
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
    handleApplyAllFilters,
    handleSearch,
    handlePageChange,
    clearFilters,
    hasActiveFilters,
  } = useProductFilters();

  const isMobile = useIsMobile();

  const toggleMobileFilters = () => {
    setShowMobileFilters(!showMobileFilters);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-zariabg">
      <div className="relative">
        <HeroBanner
          title="TIENDA"
          tagline="Colección 2025"
          description="Diseños exclusivos elaborados con los materiales más finos para momentos inolvidables"
        />

        <SearchNavPanel
          id="products-container"
          breadcrumbItems={[
            { label: "Inicio", href: "/" },
            { label: "Productos", active: true },
          ]}
          searchQuery={searchQuery}
          onSearch={handleSearch}
          debounceDelay={400}
          isMobile={isMobile}
        />
      </div>

      <div className="w-full mx-auto px-4 py-4 lg:py-0">
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
              (activeFilters.priceRange[0] > 0 ||
              activeFilters.priceRange[1] < 5000
                ? 1
                : 0)
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
            onApplyAllFilters={handleApplyAllFilters}
            onClear={clearFilters}
          />
        )}

        {/* Desktop Unified Toolbar */}
        {/* Desktop Unified Toolbar with Border Lines */}
        {!isMobile && (
          <div className="mb-6 -mx-4">
            {/* Línea negra superior */}
            <div className="w-screen border-t border-black"></div>

            {/* Contenido de la barra de filtros */}
            <div className="flex items-center justify-between py-2">
              <div className="flex-shrink-0 px-4">
                <button
                  onClick={toggleDesktopFilters}
                  className="flex items-center justify-center px-3 py-1 transition-colors cursor-pointer border border-black"
                  aria-label="Mostrar filtros"
                >
                  <span className="text-sm font-realtime text-black font-light">
                    FILTROS
                  </span>
                  <Plus className="h-3 w-3 ml-1 relative top-[0.1px]" />
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

              {/* Sort Selector - Right Side */}
              <div className="flex-shrink-0 px-4">
                <SortSelector
                  value={activeFilters.sortBy}
                  onChange={(value) => handleFilterChange("sortBy", value)}
                  compact={true}
                />
              </div>
            </div>

            {/* Línea negra inferior */}
            <div className="w-screen border-b border-black"></div>
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
                  className="w-[380px] 2xl:w-[360px] fixed left-0 top-0 h-screen bg-white z-50 overflow-y-auto"
                >
                  <div className="p-5 border-b sticky top-0 bg-zariabg z-10 flex items-center justify-between">
                    <h2 className="font-realtime text-[14px]">FILTROS</h2>
                    <button
                      onClick={() => setShowDesktopFilters(false)}
                      className="p-1 cursor-pointer"
                      aria-label="Cerrar panel de filtros"
                    >
                      <X className="h-5 w-5" />
                    </button>
                  </div>

                  <div className="p-5">
                    <ProductFilters
                      activeFilters={activeFilters}
                      onChange={handleFilterChange}
                      onApplyAllFilters={handleApplyAllFilters}
                      onClearFilters={clearFilters}
                      hasActiveFilters={hasActiveFilters}
                      onApply={() => setShowDesktopFilters(false)}
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
