"use client";

import React from "react";
import { X } from "lucide-react";
import { FilterState } from "@/types/products";

interface AppliedFiltersTagsProps {
  searchQuery: string;
  onSearchClear: () => void;
  filters: FilterState;
  onFilterChange: (key: keyof FilterState, value: any) => void;
  className?: string;
}

export default function AppliedFiltersTags({
  searchQuery,
  onSearchClear,
  filters,
  onFilterChange,
  className = ""
}: AppliedFiltersTagsProps) {
  return (
    <div className={`flex flex-wrap items-center gap-4 ${className}`}>
      {/* Búsqueda */}
      {searchQuery && (
        <div className="inline-flex items-center border-b border-black px-1 py-0.5 text-xs font-univers-next">
          <span>Búsqueda: {searchQuery}</span>
          <button
            onClick={onSearchClear}
            className="ml-2 text-gray-500 hover:text-black cursor-pointer"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      {/* Categorías */}
      {filters.categories.map((category) => (
        <div
          key={category}
          className="inline-flex items-center border-b border-black px-1 py-0.5 text-xs font-univers-next"
        >
          <span>{category}</span>
          <button
            onClick={() =>
              onFilterChange(
                "categories",
                filters.categories.filter((c) => c !== category)
              )
            }
            className="ml-2 text-gray-500 hover:text-black cursor-pointer"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ))}

      {/* Materiales */}
      {filters.materials.map((material) => (
        <div
          key={material}
          className="inline-flex items-center border-b border-black px-1 py-0.5 text-xs font-univers-next"
        >
          <span>{material}</span>
          <button
            onClick={() =>
              onFilterChange(
                "materials",
                filters.materials.filter((m) => m !== material)
              )
            }
            className="ml-2 text-gray-500 hover:text-black cursor-pointer"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      ))}

      {/* Rango de precio */}
      {(filters.priceRange[0] > 0 || filters.priceRange[1] < 5000) && (
        <div className="inline-flex items-center border-b border-black px-1 py-0.5 text-xs font-univers-next">
          <span>
            {filters.priceRange[0]}$ - {filters.priceRange[1]}$
          </span>
          <button
            onClick={() => onFilterChange("priceRange", [0, 5000])}
            className="ml-2 text-gray-500 hover:text-black cursor-pointer"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}

      {/* Descuento */}
      {filters.discount && (
        <div className="inline-flex items-center border-b border-black px-1 py-0.5 text-xs font-univers-next">
          <span>En oferta</span>
          <button
            onClick={() => onFilterChange("discount", false)}
            className="ml-2 text-gray-500 hover:text-black cursor-pointer"
          >
            <X className="h-3 w-3" />
          </button>
        </div>
      )}
    </div>
  );
}