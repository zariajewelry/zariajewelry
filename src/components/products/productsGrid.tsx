"use client";

import { useState, useEffect, useMemo, memo } from "react";


import AnimatedSection from "../customs/animated/Animated-section";
import { RootState } from "@/store/store";
import { FilterState, ImageType } from "@/types/products";
import { useAppSelector } from "@/store/hook";
import ProductCard from "./ProductCard";
import Pagination from "../ui/pagination";
import EmptyState from "./EmptyState";
import LoadingState from "./LoadingState";



const allProducts = generateProducts(80);

interface ProductGridProps {
  searchQuery: string;
  filters: FilterState;
  currentPage: number;
  onPageChange: (page: number) => void;
  clearFilters: () => void;
}

function ProductGrid({ searchQuery, filters, currentPage, onPageChange, clearFilters }: ProductGridProps) {

  const productsPerPage = 12;
  const [totalPages, setTotalPages] = useState(1);

  // Usar selector Redux para estado de carga (opcional)
  const isLoading = useAppSelector((state: RootState) => state.productFilters.isLoading);

  // Aplicamos filtros con useMemo para evitar recalcular en cada render
  const filteredProducts = useMemo(() => {
    let result = [...allProducts];

    // Filtro por texto de búsqueda
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.material.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    // Filtro por categorías
    if (filters.categories.length > 0) {
      result = result.filter((product) =>
        filters.categories.includes(product.category)
      );
    }

    // Filtro por materiales
    if (filters.materials.length > 0) {
      result = result.filter((product) =>
        filters.materials.includes(product.material)
      );
    }

    // Filtro por rango de precio
    result = result.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );

    // Filtro por disponibilidad
    if (filters.availability.length > 0) {
      if (
        filters.availability.includes("En Stock") &&
        !filters.availability.includes("Próximos Lanzamientos")
      ) {
        result = result.filter((product) => product.isInStock);
      } else if (
        !filters.availability.includes("En Stock") &&
        filters.availability.includes("Próximos Lanzamientos")
      ) {
        result = result.filter((product) => !product.isInStock);
      }
    }

    // Filtro por descuento
    if (filters.discount) {
      result = result.filter((product) => product.discountPercentage !== null);
    }

    // Ordenar productos
    switch (filters.sortBy) {
      case "price_asc":
        result.sort((a, b) => a.price - b.price);
        break;
      case "price_desc":
        result.sort((a, b) => b.price - a.price);
        break;
      case "newest":
        result.sort((a, b) => (a.isNew === b.isNew ? 0 : a.isNew ? -1 : 1));
        break;
      case "popular":
      default:
        result.sort((a, b) =>
          a.isBestseller === b.isBestseller ? 0 : a.isBestseller ? -1 : 1
        );
        break;
    }

    return result;
  }, [searchQuery, filters]);

  const paginatedProducts = useMemo(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    return filteredProducts.slice(startIndex, endIndex);
  }, [filteredProducts, currentPage]);

  // Actualizar número total de páginas cuando cambian los productos filtrados
  useEffect(() => {
    setTotalPages(Math.ceil(filteredProducts.length / productsPerPage));
  }, [filteredProducts]);


  if (isLoading) {
    return <LoadingState />;
  }

  if (filteredProducts.length === 0) {
    return (
      <EmptyState
        onClearFilters={clearFilters}
        message={searchQuery
          ? `No se encontraron resultados para "${searchQuery}". Prueba con otros términos o elimina los filtros.`
          : "No se encontraron productos con los filtros seleccionados."}
      />
    );
  }

  return (
    <div className="bg-zariabg">
    <p className="font-realtime text-sm text-gray-500 mb-3 sm:mb-6">
      Mostrando {paginatedProducts.length} de {filteredProducts.length}{" "}
      productos
    </p>
  
    {/* Grid con líneas negras continuas */}
    <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 2xl:grid-cols-4 gap-0 border-t border-l border-black mb-12">
      {paginatedProducts.map((product, index) => (
        <AnimatedSection
          key={`product-${product.id}`}
          className="group border-r border-b border-black"
          animation="fadeIn"
          delay={index < 8 ? index * 0.03 : 0} 
          duration={0.4}
        >
          <ProductCard product={product} index={index} />
        </AnimatedSection>
      ))}
    </div>
  
    {/* Paginación */}
    {totalPages > 1 && (
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        onPageChange={onPageChange}
        withLabels={true}
        maxVisiblePages={5}
      />
    )}
  </div>
  );
}

// Creamos archivo separado para los datos mock
// filepath: c:\Users\Francisco\OneDrive\Escritorio\MAN\TERESA-ZARIA\zariajewelry\src\lib\mock-data.ts
export function generateProducts(count: number) {
  const types = ["Collar", "Pendientes", "Pulsera", "Anillo", "Conjunto"];
  const adjectives = [
    "Eternity", "Celestial", "Serenity", "Infinity", "Radiance",
    "Harmony", "Elegance", "Grace", "Splendor", "Opulence",
  ];
  const materials = [
    "Oro Blanco", "Oro Amarillo", "Oro Rosa", "Platino", "Plata 925",
  ];
  const priceRanges = [
    [900, 1500], [1500, 2500], [2500, 4000], [4000, 5000],
  ];
  const mainImageUrls = [
    "https://www.wolfandmoon.com/cdn/shop/files/grapefruit-slice-necklace-lifestyle-5.jpg?v=1684847284",
    "https://www.wolfandmoon.com/cdn/shop/files/matchbox-necklace-lifestyle-1.jpg?v=1731000284",
    "https://www.wolfandmoon.com/cdn/shop/products/dove-necklace-lifestyle-1.jpg?v=1646330610",
    "https://www.wolfandmoon.com/cdn/shop/files/mini-grapefruit-slice-hoops-lifestyle-4.jpg?v=1684851500",
    "https://www.wolfandmoon.com/cdn/shop/files/mini-nina-hoops-offwhite-lifestyle-1.jpg?v=1698870399"

  ];
  
  return Array.from({ length: count }).map((_, i) => {
    const type = types[Math.floor(Math.random() * types.length)];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const material = materials[Math.floor(Math.random() * materials.length)];
    const priceRange = priceRanges[Math.floor(Math.random() * priceRanges.length)];
    const price = Math.floor(Math.random() * (priceRange[1] - priceRange[0])) + priceRange[0];
    const hasDiscount = Math.random() > 0.8;
    const discountPercentage = hasDiscount ? Math.floor(Math.random() * 30) + 10 : 0;
    const originalPrice = hasDiscount ? Math.floor(price / (1 - discountPercentage / 100)) : price;
    const isNew = Math.random() > 0.8;
    const mainImageUrl = mainImageUrls[Math.floor(Math.random() * mainImageUrls.length)];

    return {
      id: `product-${i}`,
      name: `${type} ${adjective}`,
      price: price,
      originalPrice: hasDiscount ? originalPrice : null,
      discountPercentage: hasDiscount ? discountPercentage : null,
      images: [
        {
          id: `img-${i}-main`,
          url: mainImageUrl,
          altText: `${type} ${adjective}`,
          type: ImageType.MAIN,
          order: 0,
          isActive: true
        },
        // Segunda imagen condicional
        {
          id: `img-${i}-hover`,
          url: "https://www.wolfandmoon.com/cdn/shop/products/moon-and-star-hoops-lifestyle-1-1500.jpg?v=1620153947",
          altText: `${type} ${adjective} - Vista alternativa`,
          type: ImageType.HOVER,
          order: 1,
          isActive: true
        }
      ],
      category: type === "Collar" || type === "Pendientes" ? type + "es" : type + "s",
      material: material,
      reviews: Math.floor(Math.random() * 100) + 5,
      isInStock: Math.random() > 0.15,
      isNew: isNew,
      isBestseller: Math.random() > 0.85,
    };
  });
}

// Exportamos componente memoizado para evitar renders innecesarios
export default memo(ProductGrid);