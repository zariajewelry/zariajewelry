
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
    <div className={`flex flex-wrap items-center gap-2 ${className}`}>
      {/* Búsqueda */}
      {searchQuery && (
        <div className="inline-flex items-center bg-zaria/40 px-3 py-1 rounded-full text-sm">
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
          className="inline-flex items-center bg-zaria/40 px-3 py-1 rounded-full text-sm"
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
          className="inline-flex items-center bg-zaria/40 px-3 py-1 rounded-full text-sm"
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
        <div className="inline-flex items-center bg-zaria/40 px-3 py-1 rounded-full text-sm">
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
        <div className="inline-flex items-center bg-gray-100 px-3 py-1 rounded-full text-sm">
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