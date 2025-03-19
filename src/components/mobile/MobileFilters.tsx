"use client";

import { useCallback, memo } from "react";
import { X } from "lucide-react";
import ProductFilters from "../products/products-filters";
import { FilterState } from "@/types/products";
import { useScrollLock } from "@/hooks/useScrollLock";

interface MobileFiltersProps {
  isOpen: boolean;
  onClose: () => void;
  activeFilters: FilterState;
  onChange: (filterType: keyof FilterState, value: any) => void;
  onApplyAllFilters?: (filters: FilterState) => void;
  onClear: () => void;
}

function MobileFilters({
  isOpen,
  onClose,
  activeFilters,
  onChange,
  onClear,
  onApplyAllFilters,
}: MobileFiltersProps) {
  const hasActiveFilters = useCallback(() => {
    return (
      activeFilters.categories.length > 0 ||
      activeFilters.materials.length > 0 ||
      activeFilters.availability.length > 0 ||
      activeFilters.discount ||
      activeFilters.priceRange[0] > 0 ||
      activeFilters.priceRange[1] < 5000
    );
  }, [activeFilters]);

  useScrollLock(isOpen);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-black/30 z-50 lg:hidden animate-fadeIn"
      role="dialog"
      aria-modal="true"
      aria-label="Filtros móviles"
    >
      <div className="absolute inset-0" onClick={onClose}></div>

      <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-zariabg flex flex-col shadow-xl animate-slideInRight">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="pl-2 text-xs font-montserrat font-light tracking-widest text-black">
            FILTROS
          </h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center transition-all hover:shadow-md hover:border-gray-200 group"
            aria-label="Cerrar panel de filtros"
          >
            <span className="relative block w-5 h-5">
              <span className="absolute inset-0 flex items-center justify-center transition-opacity group-hover:opacity-0">
                <X className="h-4 w-4 stroke-gray-500" />
              </span>
              <span className="absolute inset-0 flex items-center justify-center opacity-0 transition-opacity group-hover:opacity-100">
                <svg
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M3 8H13"
                    stroke="#1ca2d6"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                  <path
                    d="M8 3L13 8L8 13"
                    stroke="#1ca2d6"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </span>
            </span>
          </button>
        </div>

        <div className="overflow-y-auto flex-1">
          <ProductFilters
            activeFilters={activeFilters}
            onChange={onChange}
            onApplyAllFilters={onApplyAllFilters}
            onApply={onClose}
            onClearFilters={onClear}
            hasActiveFilters={hasActiveFilters}
          />
        </div>
      </div>
    </div>
  );
}

export default memo(MobileFilters);
