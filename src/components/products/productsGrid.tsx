"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { ChevronRight, Heart, ShoppingBag, Star } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import AnimatedSection from "../customs/animated/Animated-section";

// Mock product data
const generateProducts = (count: number) => {
  const types = ["Collar", "Pendientes", "Pulsera", "Anillo", "Conjunto"];
  const adjectives = [
    "Eternity",
    "Celestial",
    "Serenity",
    "Infinity",
    "Radiance",
    "Harmony",
    "Elegance",
    "Grace",
    "Splendor",
    "Opulence",
  ];
  const materials = [
    "Oro Blanco",
    "Oro Amarillo",
    "Oro Rosa",
    "Platino",
    "Plata 925",
  ];
  const priceRanges = [
    [900, 1500],
    [1500, 2500],
    [2500, 4000],
    [4000, 5000],
  ];

  return Array.from({ length: count }).map((_, i) => {
    const type = types[Math.floor(Math.random() * types.length)];
    const adjective = adjectives[Math.floor(Math.random() * adjectives.length)];
    const material = materials[Math.floor(Math.random() * materials.length)];
    const priceRange =
      priceRanges[Math.floor(Math.random() * priceRanges.length)];
    const price =
      Math.floor(Math.random() * (priceRange[1] - priceRange[0])) +
      priceRange[0];
    const hasDiscount = Math.random() > 0.8;
    const discountPercentage = hasDiscount
      ? Math.floor(Math.random() * 30) + 10
      : 0;
    const originalPrice = hasDiscount
      ? Math.floor(price / (1 - discountPercentage / 100))
      : price;
    const rating = (Math.floor(Math.random() * 15) + 35) / 10; // Ratings between 3.5-5.0
    const isNew = Math.random() > 0.8;

    return {
      id: i + 1,
      name: `${type} ${adjective}`,
      price: price,
      originalPrice: hasDiscount ? originalPrice : null,
      discountPercentage: hasDiscount ? discountPercentage : null,
      image: `https://acdn-us.mitiendanube.com/stores/001/810/105/products/vv-pulsera-ga-plata-nacarado-1b-78a3c49d2327e35aef17374911288953-1024-1024.webp`,
      category:
        type === "Collar" || type === "Pendientes" ? type + "es" : type + "s",
      material: material,
      rating: rating,
      reviews: Math.floor(Math.random() * 100) + 5,
      isInStock: Math.random() > 0.15,
      isNew: isNew,
      isBestseller: Math.random() > 0.85,
    };
  });
};

const allProducts = generateProducts(40);

interface ProductGridProps {
  searchQuery: string;
  filters: {
    categories: string[];
    materials: string[];
    priceRange: [number, number];
    availability: string[];
    rating: number | null;
    discount: boolean;
    sortBy: string;
  };
  setSearchQuery: (query: string) => void;
  handleFilterChange: (filterType: string, value: any) => void;
}

export default function ProductGrid({
  searchQuery,
  filters,
  setSearchQuery,
  handleFilterChange,
}: ProductGridProps) {
  const [currentPage, setCurrentPage] = useState(1);
  const productsPerPage = 12;
  const [filteredProducts, setFilteredProducts] = useState(allProducts);
  const [paginatedProducts, setPaginatedProducts] = useState<
    typeof allProducts
  >([]);
  const [totalPages, setTotalPages] = useState(1);

  // Filter products based on search query and filters
  useEffect(() => {
    let result = [...allProducts];

    // Filter by search query
    if (searchQuery) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (product) =>
          product.name.toLowerCase().includes(query) ||
          product.material.toLowerCase().includes(query) ||
          product.category.toLowerCase().includes(query)
      );
    }

    // Filter by categories
    if (filters.categories.length > 0) {
      result = result.filter((product) =>
        filters.categories.includes(product.category)
      );
    }

    // Filter by materials
    if (filters.materials.length > 0) {
      result = result.filter((product) =>
        filters.materials.includes(product.material)
      );
    }

    // Filter by price range
    result = result.filter(
      (product) =>
        product.price >= filters.priceRange[0] &&
        product.price <= filters.priceRange[1]
    );

    // Filter by availability
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

    // Filter by rating
    if (filters.rating !== null) {
      result = result.filter((product) => product.rating >= filters.rating);
    }

    // Filter by discount
    if (filters.discount) {
      result = result.filter((product) => product.discountPercentage !== null);
    }

    // Sort products
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
      case "rating":
        result.sort((a, b) => b.rating - a.rating);
        break;
      case "popular":
      default:
        result.sort((a, b) =>
          a.isBestseller === b.isBestseller ? 0 : a.isBestseller ? -1 : 1
        );
        break;
    }

    setFilteredProducts(result);
    setCurrentPage(1);
    setTotalPages(Math.ceil(result.length / productsPerPage));
  }, [searchQuery, filters]);

  // Paginate products
  useEffect(() => {
    const startIndex = (currentPage - 1) * productsPerPage;
    const endIndex = startIndex + productsPerPage;
    setPaginatedProducts(filteredProducts.slice(startIndex, endIndex));
  }, [filteredProducts, currentPage]);

  const handlePageChange = (pageNumber: number) => {
    setCurrentPage(pageNumber);
    // Scroll to top when changing pages
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  if (filteredProducts.length === 0) {
    return (
      <div className="text-center py-16">
        <h3 className="font-serif text-xl mb-4">No se encontraron productos</h3>
        <p className="text-gray-600 mb-6">
          No hemos encontrado productos que coincidan con tus criterios de
          búsqueda.
        </p>
        <Button
          onClick={() => {
            handleFilterChange("categories", []);
            handleFilterChange("materials", []);
            handleFilterChange("priceRange", [0, 5000]);
            handleFilterChange("availability", []);
            handleFilterChange("rating", null);
            handleFilterChange("discount", false);
            setSearchQuery("");
          }}
          className="bg-zaria hover:bg-[#61c8c0] text-white"
        >
          Limpiar filtros
        </Button>
      </div>
    );
  }

  return (
    <div>
      <p className="text-sm text-gray-500 mb-6">
        Mostrando {paginatedProducts.length} de {filteredProducts.length}{" "}
        productos
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-x-6 gap-y-8 mb-12">
        {paginatedProducts.map((product, index) => (
          <AnimatedSection
            key={product.id}
            className="group"
            animation="fadeSlideUp"
            delay={index * 0.05}
          >
            {/* Contenedor principal con sombra refinada */}
            <div
              className="bg-white  overflow-hidden shadow-[0_2px_10px_rgba(0,0,0,0.04)] hover:shadow-[0_4px_20px_rgba(0,0,0,0.08)] transition-all duration-500 cursor-pointer relative isolate"
              onClick={() => (window.location.href = `/products/${product.id}`)}
            >
              <div className="relative aspect-square overflow-hidden">
                {/* Link principal que contiene las imágenes */}
                <Link
                  href={`/products/${product.id}`}
                  className="block w-full h-full"
                >
                  <div className="relative w-full h-full overflow-hidden bg-[#f5f5f7]">
                    {/* Primera imagen (siempre visible) */}
                    <Image
                      src={product.image || "/placeholder.svg"}
                      alt={product.name}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="object-cover transition-all duration-700 group-hover:scale-[1.03] z-10"
                      priority={index < 4}
                    />

                    {/* Segunda imagen (aparece en hover) */}
                    <Image
                      src="https://acdn-us.mitiendanube.com/stores/001/810/105/products/vv-pulsera-ga-plata-madreperla-1b-cbbb4f38a53cee3f2517374911293645-1024-1024.webp"
                      alt={`${product.name} - Vista alternativa`}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, (max-width: 1280px) 33vw, 25vw"
                      className="object-cover absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-20"
                    />
                  </div>
                </Link>

                {/* Badges - Ahora con z-index más alto */}
                <div className="absolute top-3 left-3 flex flex-col gap-1.5 z-40">
                  {product.isNew && (
                    <Badge className="bg-black hover:bg-black text-white font-medium px-2.5 py-0.5 text-[10px] rounded">
                      Nuevo
                    </Badge>
                  )}
                  {product.discountPercentage && (
                    <Badge className="bg-[#FF3B30] hover:bg-[#FF3B30] text-white font-medium px-2.5 py-0.5 text-[10px] rounded">
                      -{product.discountPercentage}%
                    </Badge>
                  )}
                </div>

                {/* Panel de acciones rápidas - Estilo arquitectónico */}
                <div
                  className="absolute bottom-0 left-0 right-0 bg-white/80 backdrop-blur-md py-3 px-4 
    flex justify-between items-center opacity-0 translate-y-2 
    group-hover:opacity-100 group-hover:translate-y-0 
    transition-all duration-300 ease-out z-40"
                >
                  <Button
                    size="sm"
                    className="bg-black text-white text-xs rounded px-4 
      hover:bg-black/90 hover:scale-[1.02] active:scale-[0.98] 
      transition-all duration-200 cursor-pointer"
                  >
                    <ShoppingBag className="h-3 w-3 mr-1.5" strokeWidth={2.5} />
                    Añadir
                  </Button>
                  <div className="flex gap-1.5">
                    <Button
                      size="sm"
                      variant="ghost"
                      className="text-gray-700 hover:text-zaria hover:bg-transparent p-1.5 h-8 w-8 
        rounded transition-colors duration-200 cursor-pointer"
                      onClick={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        // Aquí va la lógica para añadir a favoritos
                        console.log("Añadir a favoritos:", product.id);
                      }}
                    >
                      <Heart
                        className="h-5 w-5 stroke-red-500"
                        strokeWidth={2}
                      />
                    </Button>
                    <div className="flex items-center justify-center">
                      <button
                        className="text-gray-700 hover:text-[#81D8D0] transition-colors duration-200 cursor-pointer"
                        onClick={(e) => {
                          e.preventDefault();
                          e.stopPropagation();
                          window.location.href = `/products/${product.id}`;
                        }}
                      >
                        <ChevronRight className="h-5 w-5" strokeWidth={2} />
                      </button>
                    </div>
                  </div>
                </div>

                {/* Stock status - Con z-index más alto */}
                {!product.isInStock && (
                  <div className="absolute inset-0 bg-black/30 backdrop-blur-[2px] flex items-center justify-center z-10">
                    <span className="bg-white/95 text-black px-5 py-2 text-xs tracking-wide font-medium rounded">
                      Próximamente
                    </span>
                  </div>
                )}
              </div>

              {/* Información del producto - Estilo arquitectónico */}
              <div className="p-5">
                <div className="flex justify-between items-start">
                  <div className="flex-1 pr-2">
                    <Link
                      href={`/products/${product.id}`}
                      className="block group-hover:text-black/80 transition-colors duration-300"
                    >
                      <h3 className="font-serif text-lg tracking-tight mb-1 leading-tight">
                        {product.name}
                      </h3>
                    </Link>

                    <p className="text-xs text-gray-500 font-normal">
                      {product.material}
                    </p>
                  </div>

                  <div>
                    {product.originalPrice ? (
                      <div className="text-right">
                        <span className="text-red-500 font-medium">
                          {product.price.toLocaleString()}€
                        </span>
                        <span className="text-gray-400 line-through text-xs block mt-0.5">
                          {product.originalPrice.toLocaleString()}€
                        </span>
                      </div>
                    ) : (
                      <span className="font-medium">
                        {product.price.toLocaleString()}€
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </AnimatedSection>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center my-10">
          <div className="flex items-center gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage - 1)}
              disabled={currentPage === 1}
              className="border-gray-200 hover:bg-zaria hover:text-white hover:border-zaria"
            >
              Anterior
            </Button>

            {[...Array(totalPages)].map((_, i) => (
              <Button
                key={i}
                variant={currentPage === i + 1 ? "default" : "outline"}
                size="sm"
                onClick={() => handlePageChange(i + 1)}
                className={
                  currentPage === i + 1
                    ? "bg-zaria hover:bg-zaria"
                    : "border-gray-200 hover:bg-zaria hover:text-white hover:border-zaria"
                }
              >
                {i + 1}
              </Button>
            ))}

            <Button
              variant="outline"
              size="sm"
              onClick={() => handlePageChange(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="border-gray-200 hover:bg-zaria hover:text-white hover:border-zaria"
            >
              Siguiente
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
