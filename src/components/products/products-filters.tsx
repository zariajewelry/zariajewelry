"use client"

import React, { useCallback, memo, useState, useEffect } from "react";
import { Info, ChevronDown, ChevronUp } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { Slider } from "@/components/ui/slider"
import { Separator } from "@/components/ui/separator"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { FilterState } from "@/types/products";



interface ProductFiltersProps {
  activeFilters: FilterState;
  onChange: (filterType: keyof FilterState, value: any) => void;
}

// Datos estáticos
const FILTER_OPTIONS = {
  categories: ["Collares", "Pendientes", "Pulseras", "Anillos", "Conjuntos", "Edición Limitada"],
  materials: ["Oro Blanco", "Oro Amarillo", "Oro Rosa", "Platino", "Plata 925"],
  availability: ["En Stock", "Próximos Lanzamientos"]
};

function ProductFilters({ activeFilters, onChange }: ProductFiltersProps) {
  // Estado para secciones expandidas
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    materials: true,
    availability: true,
    discount: true
  });
  
  // Estado local para el rango de precio durante el arrastre
  const [localPriceRange, setLocalPriceRange] = useState<number[]>([
    activeFilters.priceRange[0], 
    activeFilters.priceRange[1]
  ]);
  
  // Estado para determinar si el slider está siendo arrastrado actualmente
  const [isDragging, setIsDragging] = useState(false);

  // Función para alternar la expansión de secciones
  const toggleSection = useCallback((section: string) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev]
    }));
  }, []);

  // Actualiza el estado local cuando cambian los filtros externos
  useEffect(() => {
    if (!isDragging) {
      setLocalPriceRange([activeFilters.priceRange[0], activeFilters.priceRange[1]]);
    }
  }, [activeFilters.priceRange, isDragging]);

  const handleCategoryChange = useCallback((category: string) => {
    const updatedCategories = activeFilters.categories.includes(category)
      ? activeFilters.categories.filter((c) => c !== category)
      : [...activeFilters.categories, category];

    onChange("categories", updatedCategories);
  }, [activeFilters.categories, onChange]);

  const handleMaterialChange = useCallback((material: string) => {
    const updatedMaterials = activeFilters.materials.includes(material)
      ? activeFilters.materials.filter((m) => m !== material)
      : [...activeFilters.materials, material];

    onChange("materials", updatedMaterials);
  }, [activeFilters.materials, onChange]);

  const handleAvailabilityChange = useCallback((item: string) => {
    const updatedAvailability = activeFilters.availability.includes(item)
      ? activeFilters.availability.filter((a) => a !== item)
      : [...activeFilters.availability, item];

    onChange("availability", updatedAvailability);
  }, [activeFilters.availability, onChange]);


  const handlePriceRangeChange = useCallback((value: number[]) => {
    setLocalPriceRange(value);
  }, []);


  const handlePriceRangeCommit = useCallback(() => {
    onChange("priceRange", localPriceRange);
    setIsDragging(false);
  }, [localPriceRange, onChange]);

  const handleDiscountChange = useCallback(() => {
    onChange("discount", !activeFilters.discount);
  }, [activeFilters.discount, onChange]);

  // Componente para encabezados de sección
  const SectionHeader = ({ title, section, tooltip }: { title: string, section: string, tooltip?: string }) => (
    <div className="flex items-center justify-between mb-3 cursor-pointer" onClick={() => toggleSection(section)}>
      <h3 className="font-cormorant font-light">{title}</h3>
      <div className="flex items-center">
        {tooltip && (
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <Button 
                  variant="ghost" 
                  size="sm" 
                  className="h-auto p-1 text-gray-400 hover:text-gray-600 mr-1"
                  aria-label={`Información sobre ${title.toLowerCase()}`}
                  onClick={(e) => e.stopPropagation()}
                >
                  <Info className="h-3.5 w-3.5" />
                </Button>
              </TooltipTrigger>
              <TooltipContent>
                <p className="text-xs max-w-xs">{tooltip}</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        )}
        {expandedSections[section as keyof typeof expandedSections] 
          ? <ChevronUp className="h-4 w-4 text-gray-500" />
          : <ChevronDown className="h-4 w-4 text-gray-500" />
        }
      </div>
    </div>
  );

  return (
    <div className="space-y-6" aria-label="Filtros de productos">
      {/* Categories */}
      <div>
        <SectionHeader 
          title="CATEGORÍAS" 
          section="categories" 
          tooltip="Seleccione una o más categorías para filtrar los productos"
        />
        
        {expandedSections.categories && (
          <div className="space-y-2 mt-2">
            {FILTER_OPTIONS.categories.map((category) => (
              <div key={category} className="flex items-center space-x-2">
                <Checkbox
                  id={`category-${category}`}
                  checked={activeFilters.categories.includes(category)}
                  onCheckedChange={() => handleCategoryChange(category)}
                  className="text-zaria border-gray-300 focus:ring-zaria"
                  aria-label={`Filtrar por categoría ${category}`}
                />
                <label htmlFor={`category-${category}`} className="text-sm font-light cursor-pointer">
                  {category}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <Separator />

      {/* Price Range */}
      <div>
        <SectionHeader 
          title="PRECIO" 
          section="price"
        />
        
        {expandedSections.price && (
          <div className="px-2 mt-2">
            <Slider
              value={localPriceRange}
              min={0}
              max={5000}
              step={100}
              onValueChange={handlePriceRangeChange}
              onValueCommit={handlePriceRangeCommit}
              onMouseDown={() => setIsDragging(true)}
              onTouchStart={() => setIsDragging(true)}
              className="mb-6"
              aria-label="Rango de precio"
            />
            <div className="flex items-center justify-between">
              <div className="px-3 py-1 bg-zaria/60 rounded text-sm">{localPriceRange[0]}€</div>
              <div className="px-3 py-1 bg-zaria/60 rounded text-sm">{localPriceRange[1]}€</div>
            </div>
            
            {isDragging && (
              <div className="mt-4 text-center">
                <Button 
                  size="sm"
                  variant='secondary'
                  onClick={handlePriceRangeCommit}
                  className="bg-zaria hover:bg-zaria/90 text-white text-xs px-3"
                >
                  Aplicar rango de precio
                </Button>
              </div>
            )}
          </div>
        )}
      </div>

      <Separator />

      {/* Materials */}
      <div>
        <SectionHeader 
          title="MATERIAL" 
          section="materials"
        />
        
        {expandedSections.materials && (
          <div className="space-y-2 mt-2">
            {FILTER_OPTIONS.materials.map((material) => (
              <div key={material} className="flex items-center space-x-2">
                <Checkbox
                  id={`material-${material}`}
                  checked={activeFilters.materials.includes(material)}
                  onCheckedChange={() => handleMaterialChange(material)}
                  className="text-zaria border-gray-300 focus:ring-zaria"
                  aria-label={`Filtrar por material ${material}`}
                />
                <label htmlFor={`material-${material}`} className="text-sm font-light cursor-pointer">
                  {material}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <Separator />

      {/* Availability */}
      <div>
        <SectionHeader 
          title="DISPONIBILIDAD" 
          section="availability"
        />
        
        {expandedSections.availability && (
          <div className="space-y-2 mt-2">
            {FILTER_OPTIONS.availability.map((item) => (
              <div key={item} className="flex items-center space-x-2">
                <Checkbox
                  id={`availability-${item}`}
                  checked={activeFilters.availability.includes(item)}
                  onCheckedChange={() => handleAvailabilityChange(item)}
                  className="text-zaria border-gray-300 focus:ring-zaria"
                  aria-label={`Filtrar por disponibilidad ${item}`}
                />
                <label htmlFor={`availability-${item}`} className="text-sm font-light cursor-pointer">
                  {item}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      <Separator />

      {/* Discounts */}
      <div>
        <SectionHeader 
          title="PROMOCIONES" 
          section="discount"
        />
        
        {expandedSections.discount && (
          <div className="flex items-center space-x-2 mt-2">
            <Checkbox
              id="discount"
              checked={activeFilters.discount}
              onCheckedChange={handleDiscountChange}
              className="text-zaria border-gray-300 focus:ring-zaria"
              aria-label="Mostrar solo productos en oferta"
            />
            <label htmlFor="discount" className="font-medium cursor-pointer">
              En oferta
            </label>
          </div>
        )}
      </div>
    </div>
  );
}

export default memo(ProductFilters);