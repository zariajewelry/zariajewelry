"use client";

import React, { useCallback, memo, useState, useEffect } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { Checkbox } from "@/components/ui/checkbox";
import { Slider } from "@/components/ui/slider";
import { FilterState } from "@/types/products";

interface ProductFiltersProps {
  activeFilters: FilterState;
  onChange: (filterType: keyof FilterState, value: any) => void;
  onApplyAllFilters?: (filters: FilterState) => void;
  onApply?: () => void;
  onClearFilters?: () => void;
  hasActiveFilters?: () => boolean;
}

// Datos estáticos
const FILTER_OPTIONS = {
  categories: [
    "Collares",
    "Pendientes",
    "Pulseras",
    "Anillos",
    "Conjuntos",
    "Edición Limitada",
  ],
  materials: ["Oro Blanco", "Oro Amarillo", "Oro Rosa", "Platino", "Plata 925"],
  availability: ["En Stock", "Próximos Lanzamientos"],
};

function ProductFilters({
  activeFilters,
  onChange,
  onApplyAllFilters,
  onApply,
  onClearFilters,
  hasActiveFilters = () => false,
}: ProductFiltersProps) {
  // Estado para secciones expandidas
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    materials: true,
    availability: true,
    discount: true,
  });

  // Estados locales para almacenar los filtros seleccionados temporalmente
  const [localCategories, setLocalCategories] = useState<string[]>([
    ...activeFilters.categories,
  ]);
  const [localMaterials, setLocalMaterials] = useState<string[]>([
    ...activeFilters.materials,
  ]);
  const [localAvailability, setLocalAvailability] = useState<string[]>([
    ...activeFilters.availability,
  ]);
  const [localPriceRange, setLocalPriceRange] = useState<[number, number]>([
    activeFilters.priceRange[0],
    activeFilters.priceRange[1],
  ]);
  const [localDiscount, setLocalDiscount] = useState<boolean>(
    activeFilters.discount
  );

  // Estado para verificar si hay cambios sin aplicar
  const [hasChanges, setHasChanges] = useState(false);

  // Función para alternar la expansión de secciones
  const toggleSection = useCallback((section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section as keyof typeof prev],
    }));
  }, []);

  useEffect(() => {
    setLocalCategories([...activeFilters.categories]);
    setLocalMaterials([...activeFilters.materials]);
    setLocalAvailability([...activeFilters.availability]);
    setLocalPriceRange([
      activeFilters.priceRange[0],
      activeFilters.priceRange[1],
    ]);
    setLocalDiscount(activeFilters.discount);
  }, [activeFilters]);

  useEffect(() => {
    const categoriesChanged =
      localCategories.length !== activeFilters.categories.length ||
      localCategories.some((c) => !activeFilters.categories.includes(c)) ||
      activeFilters.categories.some((c) => !localCategories.includes(c));

    const materialsChanged =
      localMaterials.length !== activeFilters.materials.length ||
      localMaterials.some((m) => !activeFilters.materials.includes(m)) ||
      activeFilters.materials.some((m) => !localMaterials.includes(m));

    const availabilityChanged =
      localAvailability.length !== activeFilters.availability.length ||
      localAvailability.some((a) => !activeFilters.availability.includes(a)) ||
      activeFilters.availability.some((a) => !localAvailability.includes(a));

    const priceRangeChanged =
      localPriceRange[0] !== activeFilters.priceRange[0] ||
      localPriceRange[1] !== activeFilters.priceRange[1];

    const discountChanged = localDiscount !== activeFilters.discount;

    setHasChanges(
      categoriesChanged ||
        materialsChanged ||
        availabilityChanged ||
        priceRangeChanged ||
        discountChanged
    );
  }, [
    localCategories,
    localMaterials,
    localAvailability,
    localPriceRange,
    localDiscount,
    activeFilters,
  ]);

  const handleCategoryChange = useCallback((category: string) => {
    setLocalCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
  }, []);

  const handleMaterialChange = useCallback((material: string) => {
    setLocalMaterials((prev) =>
      prev.includes(material)
        ? prev.filter((m) => m !== material)
        : [...prev, material]
    );
  }, []);

  const handleAvailabilityChange = useCallback((item: string) => {
    setLocalAvailability((prev) =>
      prev.includes(item) ? prev.filter((a) => a !== item) : [...prev, item]
    );
  }, []);

  const handlePriceRangeChange = useCallback((value: number[]) => {
    setLocalPriceRange([value[0], value[1]] as [number, number]);
  }, []);

  const handleDiscountChange = useCallback(() => {
    setLocalDiscount((prev) => !prev);
  }, []);

  const handleApplyFilters = useCallback(() => {
    if (!hasChanges) {
      if (onApply) onApply();
      return;
    }

    if (onApplyAllFilters) {
      const updatedFilters: FilterState = {
        ...activeFilters,
        categories: [...localCategories],
        materials: [...localMaterials],
        availability: [...localAvailability],
        priceRange: [localPriceRange[0], localPriceRange[1]],
        discount: localDiscount,
      };

      onApplyAllFilters(updatedFilters);
    } else {
      if (
        JSON.stringify(localCategories) !==
        JSON.stringify(activeFilters.categories)
      ) {
        onChange("categories", localCategories);
      }

      if (
        JSON.stringify(localMaterials) !==
        JSON.stringify(activeFilters.materials)
      ) {
        onChange("materials", localMaterials);
      }

      if (
        JSON.stringify(localAvailability) !==
        JSON.stringify(activeFilters.availability)
      ) {
        onChange("availability", localAvailability);
      }

      if (
        localPriceRange[0] !== activeFilters.priceRange[0] ||
        localPriceRange[1] !== activeFilters.priceRange[1]
      ) {
        onChange("priceRange", localPriceRange);
      }

      if (localDiscount !== activeFilters.discount) {
        onChange("discount", localDiscount);
      }
    }

    if (onApply) {
      onApply();
    }
  }, [
    hasChanges,
    localCategories,
    localMaterials,
    localAvailability,
    localPriceRange,
    localDiscount,
    activeFilters,
    onChange,
    onApplyAllFilters,
    onApply,
  ]);

  const SectionHeader = ({
    title,
    section,
  }: {
    title: string;
    section: string;
  }) => (
    <button
      className="flex items-center justify-between w-full py-2 border-b border-gray-200"
      onClick={() => toggleSection(section)}
      type="button"
    >
      <h3 className="font-vollkorn text-xs font-medium tracking-wide">
        {title}
      </h3>
      <div className="flex items-center">
        {expandedSections[section as keyof typeof expandedSections] ? (
          <ChevronUp className="h-4 w-4 text-black" />
        ) : (
          <ChevronDown className="h-4 w-4 text-black" />
        )}
      </div>
    </button>
  );

  return (
    <div className="space-y-4 bg-zariabg px-6 2xl:py-6" aria-label="Filtros de productos">
      {/* El resto del JSX permanece igual */}
      {/* Categories */}
      <div>
        <SectionHeader title="CATEGORÍAS" section="categories" />

        {expandedSections.categories && (
          <div className="space-y-2 mt-3 pl-1">
            {FILTER_OPTIONS.categories.map((category) => (
              <div key={category} className="flex items-center space-x-3">
                <Checkbox
                  id={`category-${category}`}
                  checked={localCategories.includes(category)}
                  onCheckedChange={() => handleCategoryChange(category)}
                  className="w-3 h-3 rounded-sm border-black data-[state=checked]:bg-zaria-salmon data-[state=checked]:border-zaria-salmon"
                  aria-label={`Filtrar por categoría ${category}`}
                  isIconChecked={false}
                />
                <label
                  htmlFor={`category-${category}`}
                  className="text-xs font-univers-next cursor-pointer"
                >
                  {category}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div>
        <SectionHeader title="PRECIO" section="price" />

        {expandedSections.price && (
          <div className="px-2 mt-4">
            <Slider
              value={localPriceRange}
              min={0}
              max={5000}
              step={100}
              onValueChange={handlePriceRangeChange}
              className="mb-6"
              aria-label="Rango de precio"
            />
            <div className="flex items-center justify-between">
              <div className="px-3 py-1.5 min-w-17 text-center border border-black text-sm font-univers-next">
                {localPriceRange[0]}$
              </div>
              <div className="px-3 py-1.5 min-w-17 text-center border border-black text-sm font-univers-next">
                {localPriceRange[1]}$
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Materials */}
      <div>
        <SectionHeader title="MATERIAL" section="materials" />

        {expandedSections.materials && (
          <div className="space-y-2 mt-3 pl-1">
            {FILTER_OPTIONS.materials.map((material) => (
              <div key={material} className="flex items-center space-x-3">
                <Checkbox
                  id={`material-${material}`}
                  checked={localMaterials.includes(material)}
                  onCheckedChange={() => handleMaterialChange(material)}
                  className="w-3 h-3 rounded-sm border-black data-[state=checked]:bg-zaria-salmon data-[state=checked]:border-zaria-salmon"
                  aria-label={`Filtrar por material ${material}`}
                  isIconChecked={false}
                />
                <label
                  htmlFor={`material-${material}`}
                  className="text-xs font-univers-next cursor-pointer"
                >
                  {material}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Availability */}
      <div>
        <SectionHeader title="DISPONIBILIDAD" section="availability" />

        {expandedSections.availability && (
          <div className="space-y-2 mt-3 pl-1">
            {FILTER_OPTIONS.availability.map((item) => (
              <div key={item} className="flex items-center space-x-3">
                <Checkbox
                  id={`availability-${item}`}
                  checked={localAvailability.includes(item)}
                  onCheckedChange={() => handleAvailabilityChange(item)}
                  className="w-3 h-3 rounded-sm border-black data-[state=checked]:bg-zaria-salmon data-[state=checked]:border-zaria-salmon"
                  aria-label={`Filtrar por disponibilidad ${item}`}
                  isIconChecked={false}
                />
                <label
                  htmlFor={`availability-${item}`}
                  className="text-xs font-univers-next cursor-pointer"
                >
                  {item}
                </label>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Discounts */}
      <div>
        <SectionHeader title="PROMOCIONES" section="discount" />

        {expandedSections.discount && (
          <div className="flex items-center space-x-3 mt-3 pl-1">
            <Checkbox
              id="discount"
              checked={localDiscount}
              onCheckedChange={handleDiscountChange}
              className="w-3 h-3 rounded-sm border-black data-[state=checked]:bg-zaria-salmon data-[state=checked]:border-zaria-salmon"
              aria-label="Mostrar solo productos en oferta"
              isIconChecked={false}
            />
            <label
              htmlFor="discount"
              className="text-xs font-univers-next cursor-pointer"
            >
              En oferta
            </label>
          </div>
        )}
      </div>

      {/* Apply Filters Button */}
      <div className="pt-4 border-t border-gray-200 mt-6 space-y-2">
        <button
          onClick={handleApplyFilters}
          className={`w-full h-10 cursor-pointer ${
            hasChanges ? "" : "bg-gray-200"
          } border border-black hover:text-zaria-hover-aquamarina text-black font-univers-next text-sm font-normal`}
          disabled={!hasChanges}
        >
          APLICAR FILTROS
        </button>

        {/* Clear Filters Button */}
        {hasActiveFilters() && (
          <button
            onClick={onClearFilters}
            className="w-full h-10 border border-black hover:text-zaria-hover-aquamarina text-black font-univers-next text-sm font-normal cursor-pointer"
            type="button"
          >
            QUITAR FILTROS
          </button>
        )}
      </div>
    </div>
  );
}

export default memo(ProductFilters);
