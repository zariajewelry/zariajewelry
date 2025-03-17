import { DEFAULT_FILTERS } from '@/constants/products';
import { FilterState } from '@/types/products';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface FilterSliceState {
  filters: FilterState;
  searchQuery: string;
  currentPage: number;
  isLoading: boolean;
  appliedFiltersCount: number;
}

const initialState: FilterSliceState = {
  filters: DEFAULT_FILTERS,
  searchQuery: '',
  currentPage: 1,
  isLoading: false,
  appliedFiltersCount: 0
};

const productFiltersSlice = createSlice({
  name: 'productFilters',
  initialState,
  reducers: {
    setFilters: (state, action: PayloadAction<FilterState>) => {
      state.filters = action.payload;
      state.appliedFiltersCount = calculateAppliedFiltersCount(
        action.payload, 
        state.currentPage,
        state.searchQuery 
      );
    },
    setSearchQuery: (state, action: PayloadAction<string>) => {
      state.searchQuery = action.payload;
      state.appliedFiltersCount = calculateAppliedFiltersCount(
        state.filters, 
        state.currentPage,
        action.payload
      );
    }, 
    setPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload;
      state.appliedFiltersCount = calculateAppliedFiltersCount(
        state.filters, 
        action.payload,
        state.searchQuery 
      );
    },
    clearFilters: (state) => {
      state.filters = DEFAULT_FILTERS;
      state.searchQuery = '';
      state.currentPage = 1; 
      state.appliedFiltersCount = 0;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.isLoading = action.payload;
    }
  }
});

function calculateAppliedFiltersCount(filters: FilterState, page: number, search: string = ''): number {
  let count = 0;
  
  count += filters.categories.length;
  count += filters.materials.length;
  count += filters.availability.length;
  
  if (filters.discount) count += 1;
  if (filters.priceRange[0] > 0) count += 1;
  if (filters.priceRange[1] < 5000) count += 1;
  if (page > 1) count += 1;
  if (search) count += 1; 
  
  return count;
}

export const { setFilters, setSearchQuery, setPage, clearFilters, setLoading } = productFiltersSlice.actions;
export default productFiltersSlice.reducer;