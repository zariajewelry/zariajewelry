"use client"

import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import ProductFilters from "../products/products-filters"


interface MobileFiltersProps {
  isOpen: boolean
  onClose: () => void
  activeFilters: {
    categories: string[]
    materials: string[]
    priceRange: [number, number]
    availability: string[]
    rating: number | null
    discount: boolean
    sortBy: string
  }
  onChange: (filterType: string, value: any) => void
  onClear: () => void
}

export default function MobileFilters({ isOpen, onClose, activeFilters, onChange, onClear }: MobileFiltersProps) {
  const hasActiveFilters = () => {
    return (
      activeFilters.categories.length > 0 ||
      activeFilters.materials.length > 0 ||
      activeFilters.availability.length > 0 ||
      activeFilters.rating !== null ||
      activeFilters.discount ||
      activeFilters.priceRange[0] > 0 ||
      activeFilters.priceRange[1] < 5000
    )
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/30 z-50 lg:hidden">
      <div className="fixed inset-y-0 right-0 w-full sm:w-96 bg-white flex flex-col shadow-xl">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="font-serif text-lg">Filtros</h2>
          <Button variant="ghost" size="sm" onClick={onClose} className="p-1 rounded-full">
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="overflow-y-auto flex-1 p-4">
          <ProductFilters activeFilters={activeFilters} onChange={onChange} />
        </div>

        <div className="border-t p-4 flex gap-3">
          {hasActiveFilters() && (
            <Button variant="outline" onClick={onClear} className="flex-1 border-gray-200">
              Limpiar filtros
            </Button>
          )}
          <Button onClick={onClose} className="flex-1 bg-[#81D8D0] hover:bg-[#61c8c0] text-white">
            Ver resultados
          </Button>
        </div>
      </div>
    </div>
  )
}

