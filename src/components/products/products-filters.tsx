"use client"
import { Info } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

interface ProductFiltersProps {
  activeFilters: {
    categories: string[]
    materials: string[]
    priceRange: [number, number]
    availability: string[]
    // Se eliminó la propiedad rating
    discount: boolean
    sortBy: string
  }
  onChange: (filterType: string, value: any) => void
}

export default function ProductFilters({ activeFilters, onChange }: ProductFiltersProps) {
  const categories = ["Collares", "Pendientes", "Pulseras", "Anillos", "Conjuntos", "Edición Limitada"]

  const materials = ["Oro Blanco", "Oro Amarillo", "Oro Rosa", "Platino", "Plata 925"]

  const availability = ["En Stock", "Próximos Lanzamientos"]

  const handleCategoryChange = (category: string) => {
    const updatedCategories = activeFilters.categories.includes(category)
      ? activeFilters.categories.filter((c) => c !== category)
      : [...activeFilters.categories, category]

    onChange("categories", updatedCategories)
  }

  const handleMaterialChange = (material: string) => {
    const updatedMaterials = activeFilters.materials.includes(material)
      ? activeFilters.materials.filter((m) => m !== material)
      : [...activeFilters.materials, material]

    onChange("materials", updatedMaterials)
  }

  const handleAvailabilityChange = (item: string) => {
    const updatedAvailability = activeFilters.availability.includes(item)
      ? activeFilters.availability.filter((a) => a !== item)
      : [...activeFilters.availability, item]

    onChange("availability", updatedAvailability)
  }

  // Se eliminó la función handleRatingChange

  const handlePriceChange = (value: number[]) => {
    onChange("priceRange", [value[0], value[1]])
  }

  const handleDiscountChange = () => {
    onChange("discount", !activeFilters.discount)
  }

  return (
    <div className="space-y-6">
      {/* Categories */}
      <div>
        <div className="flex items-center justify-between mb-2">
          <h3 className="font-medium">Categorías</h3>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button variant="ghost" size="sm" className="h-auto p-1 text-gray-400 hover:text-gray-600">
                  <Info className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-xs">Seleccione una o más categorías para filtrar los productos</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
        <div className="space-y-2">
          {categories.map((category) => (
            <div key={category} className="flex items-center space-x-2">
              <Checkbox
                id={`category-${category}`}
                checked={activeFilters.categories.includes(category)}
                onCheckedChange={() => handleCategoryChange(category)}
                className="text-[#81D8D0] border-gray-300 focus:ring-[#81D8D0]"
              />
              <label htmlFor={`category-${category}`} className="text-sm font-light cursor-pointer">
                {category}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <h3 className="font-medium mb-4">Rango de precio</h3>
        <div className="px-2">
          <Slider
            defaultValue={[activeFilters.priceRange[0], activeFilters.priceRange[1]]}
            min={0}
            max={5000}
            step={100}
            onValueChange={handlePriceChange}
            className="mb-6"
          />
          <div className="flex items-center justify-between">
            <div className="px-3 py-1 bg-gray-100 rounded text-sm">{activeFilters.priceRange[0]}€</div>
            <div className="px-3 py-1 bg-gray-100 rounded text-sm">{activeFilters.priceRange[1]}€</div>
          </div>
        </div>
      </div>

      <Separator />

      {/* Materials */}
      <div>
        <h3 className="font-medium mb-2">Material</h3>
        <div className="space-y-2">
          {materials.map((material) => (
            <div key={material} className="flex items-center space-x-2">
              <Checkbox
                id={`material-${material}`}
                checked={activeFilters.materials.includes(material)}
                onCheckedChange={() => handleMaterialChange(material)}
                className="text-[#81D8D0] border-gray-300 focus:ring-[#81D8D0]"
              />
              <label htmlFor={`material-${material}`} className="text-sm font-light cursor-pointer">
                {material}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Availability */}
      <div>
        <h3 className="font-medium mb-2">Disponibilidad</h3>
        <div className="space-y-2">
          {availability.map((item) => (
            <div key={item} className="flex items-center space-x-2">
              <Checkbox
                id={`availability-${item}`}
                checked={activeFilters.availability.includes(item)}
                onCheckedChange={() => handleAvailabilityChange(item)}
                className="text-[#81D8D0] border-gray-300 focus:ring-[#81D8D0]"
              />
              <label htmlFor={`availability-${item}`} className="text-sm font-light cursor-pointer">
                {item}
              </label>
            </div>
          ))}
        </div>
      </div>

      <Separator />

      {/* Sección de Rating eliminada */}

      {/* Discounts */}
      <div>
        <div className="flex items-center space-x-2">
          <Checkbox
            id="discount"
            checked={activeFilters.discount}
            onCheckedChange={handleDiscountChange}
            className="text-[#81D8D0] border-gray-300 focus:ring-[#81D8D0]"
          />
          <label htmlFor="discount" className="font-medium cursor-pointer">
            En oferta
          </label>
        </div>
      </div>
    </div>
  )
}