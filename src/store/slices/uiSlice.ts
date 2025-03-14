import { createSlice } from '@reduxjs/toolkit';

interface UIState {
  cartSidebarOpen: boolean;
  searchOpen: boolean;
  mobileMenuOpen: boolean;
  userDropdownOpen: boolean;
}

const initialState: UIState = {
  cartSidebarOpen: false,
  searchOpen: false,
  mobileMenuOpen: false,
  userDropdownOpen: false
};

export const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    // Cart actions
    openCart: (state) => {
      state.cartSidebarOpen = true;
    },
    closeCart: (state) => {
      state.cartSidebarOpen = false;
    },
    toggleCart: (state) => {
      state.cartSidebarOpen = !state.cartSidebarOpen;
    },
    
    // Search actions
    openSearch: (state) => {
      state.searchOpen = true;
    },
    closeSearch: (state) => {
      state.searchOpen = false;
    },
    
    // Mobile menu actions
    openMobileMenu: (state) => {
      state.mobileMenuOpen = true;
    },
    closeMobileMenu: (state) => {
      state.mobileMenuOpen = false;
    },
    toggleMobileMenu: (state) => {
      state.mobileMenuOpen = !state.mobileMenuOpen;
    },
    
    // User dropdown actions
    openUserDropdown: (state) => {
      state.userDropdownOpen = true;
    },
    closeUserDropdown: (state) => {
      state.userDropdownOpen = false;
    },
    toggleUserDropdown: (state) => {
      state.userDropdownOpen = !state.userDropdownOpen;
    },
    
    // Reset all UI states
    resetUI: (state) => {
      state.cartSidebarOpen = false;
      state.searchOpen = false;
      state.mobileMenuOpen = false;
      state.userDropdownOpen = false;
    }
  },
});

export const {
  openCart, closeCart, toggleCart,
  openSearch, closeSearch,
  openMobileMenu, closeMobileMenu, toggleMobileMenu,
  openUserDropdown, closeUserDropdown, toggleUserDropdown,
  resetUI
} = uiSlice.actions;

export default uiSlice.reducer;