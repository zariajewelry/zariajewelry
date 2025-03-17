import { FilterState } from "@/types/products";





export const DEFAULT_FILTERS: FilterState = {
  categories: [],
  materials: [],
  priceRange: [0, 5000],
  availability: [],
  discount: false,
  sortBy: "popular",
};

export interface SortOption {
  value: string;
  label: string;
}

export const SORT_OPTIONS: SortOption[] = [
  { value: "popular", label: "Más vendidos" },
  { value: "price_asc", label: "Precio: menor" },
  { value: "price_desc", label: "Precio: mayor" },
  { value: "newest", label: "Novedades" }
];

export const DEFAULT_SORT = "popular";