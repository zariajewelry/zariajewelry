import { useState, useEffect, useCallback } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { FilterState } from '@/types/products';
import { useAppDispatch } from '@/store/hook';
import { setFilters, setPage, setSearchQuery as setReduxSearchQuery } from '@/store/slices/productFiltersSlice';
import { DEFAULT_FILTERS } from '@/constants/products';

export function useProductFilters() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const dispatch = useAppDispatch();
  
  const [activeFilters, setActiveFilters] = useState<FilterState>(DEFAULT_FILTERS);
  const [searchQuery, setSearchQuery] = useState("");
  const [currentPage, setCurrentPage] = useState(1);

  // Sincroniza los filtros desde la URL cuando cambia
  useEffect(() => {
    const categories = searchParams.getAll('category');
    const materials = searchParams.getAll('material');
    const minPrice = searchParams.get('minPrice');
    const maxPrice = searchParams.get('maxPrice');
    const availability = searchParams.getAll('availability');
    const discount = searchParams.get('discount') === 'true';
    const sortBy = searchParams.get('sort') || 'popular';
    const search = searchParams.get('q') || '';
    const page = searchParams.get('page');
    const pageNumber = page ? parseInt(page) : 1;

    const filtersFromUrl: FilterState = {
      categories,
      materials,
      priceRange: [
        minPrice ? parseInt(minPrice) : 0,
        maxPrice ? parseInt(maxPrice) : 5000
      ],
      availability,
      discount,
      sortBy,
    };

    setCurrentPage(pageNumber);
    setActiveFilters(filtersFromUrl);
    setSearchQuery(search);
    
    dispatch(setFilters(filtersFromUrl));
    dispatch(setPage(pageNumber));
    dispatch(setReduxSearchQuery(search)); 
  }, [searchParams, dispatch]);

  // Función para actualizar la URL con los filtros
  const updateUrl = useCallback((newFilters: FilterState, query: string, pageNumber: number = 1) => {
    const params = new URLSearchParams();
    
    // Añade categorías (permite múltiples valores)
    newFilters.categories.forEach(cat => params.append('category', cat));
    
    // Añade materiales (permite múltiples valores)
    newFilters.materials.forEach(mat => params.append('material', mat));
    
    // Añade rango de precio si es diferente al predeterminado
    if (newFilters.priceRange[0] > 0) {
      params.set('minPrice', newFilters.priceRange[0].toString());
    }
    
    if (newFilters.priceRange[1] < 5000) {
      params.set('maxPrice', newFilters.priceRange[1].toString());
    }
    
    // Añade disponibilidad (permite múltiples valores)
    newFilters.availability.forEach(avail => params.append('availability', avail));
    
    // Añade descuento si está activo
    if (newFilters.discount) {
      params.set('discount', 'true');
    }
    
    // Añade ordenamiento si es diferente al predeterminado
    if (newFilters.sortBy !== 'popular') {
      params.set('sort', newFilters.sortBy);
    }
    
    // Añade término de búsqueda si existe
    if (query) {
      params.set('q', query);
    }

    // Añade número de página si es mayor que 1
    if (pageNumber > 1) {
        params.set('page', pageNumber.toString());
    }
    
    // Actualiza la URL sin recargar la página
    router.push(`/products?${params.toString()}`, { scroll: false });
  }, [router]);

  // Función para cambiar un único filtro
  const handleFilterChange = useCallback((filterType: keyof FilterState, value: any) => {
    const newFilters = {
      ...activeFilters,
      [filterType]: value,
    };
    
    setActiveFilters(newFilters);
    dispatch(setFilters(newFilters));
    setCurrentPage(1);
    dispatch(setPage(1));
    updateUrl(newFilters, searchQuery, 1);
  }, [activeFilters, searchQuery, dispatch, updateUrl]);

  // NUEVA FUNCIÓN: Maneja múltiples cambios de filtro a la vez
  const handleApplyAllFilters = useCallback((newFilters: FilterState) => {
    setActiveFilters(newFilters);
    dispatch(setFilters(newFilters));
    setCurrentPage(1);
    dispatch(setPage(1));
    updateUrl(newFilters, searchQuery, 1);
  }, [searchQuery, dispatch, updateUrl]);

  // Función para cambiar el término de búsqueda
  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    setCurrentPage(1);
    dispatch(setPage(1));
    dispatch(setReduxSearchQuery(query));
    updateUrl(activeFilters, query, 1);
  }, [activeFilters, updateUrl, dispatch]);

  // Función para cambiar el número de página
  const handlePageChange = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber);
    dispatch(setPage(pageNumber));
    updateUrl(activeFilters, searchQuery, pageNumber);
    
    // Desplaza la vista al contenedor de productos
    setTimeout(() => {
      const productsContainer = document.getElementById('products-container');
      if (productsContainer) {
        productsContainer.scrollIntoView({ 
          behavior: 'smooth',
          block: 'start' 
        });
      }
    }, 100);
  }, [activeFilters, searchQuery, dispatch, updateUrl]);

  // Función para limpiar todos los filtros
  const clearFilters = useCallback(() => {
    setActiveFilters(DEFAULT_FILTERS);
    setSearchQuery("");
    setCurrentPage(1);
    dispatch(setFilters(DEFAULT_FILTERS));
    dispatch(setReduxSearchQuery(""));
    dispatch(setPage(1));
    router.push('/products', { scroll: false });
  }, [dispatch, router]);

  // Función para comprobar si hay filtros activos
  const hasActiveFilters = useCallback(() => {
    return (
      activeFilters.categories.length > 0 ||
      activeFilters.materials.length > 0 ||
      activeFilters.availability.length > 0 ||
      activeFilters.discount ||
      searchQuery !== "" ||
      activeFilters.priceRange[0] > 0 ||
      activeFilters.priceRange[1] < 5000
    );
  }, [activeFilters, searchQuery]);

  return {
    filters: activeFilters,
    searchQuery,
    currentPage,
    handleFilterChange,
    handleApplyAllFilters, // Exportamos la nueva función
    handleSearch,
    handlePageChange,
    clearFilters,
    hasActiveFilters,
  };
}