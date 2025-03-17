// src/components/navigation/SearchNavPanel.tsx
"use client";

import React from "react";
import { Search } from "lucide-react";
import SearchBar from "@/components/search/searchBar";
import CustomBreadcrumbs, { BreadcrumbItemData } from "./Breadcrumbs";

interface SearchNavPanelProps {
  breadcrumbItems: BreadcrumbItemData[];
  searchQuery: string;
  onSearch: (query: string) => void;
  searchPlaceholder?: string;
  className?: string;
  id?: string;
  debounceDelay?: number;
}

export default function SearchNavPanel({
  breadcrumbItems,
  searchQuery,
  onSearch,
  searchPlaceholder = "Buscar productos...",
  className = "",
  id = "products-container",
  debounceDelay = 400
}: SearchNavPanelProps) {
  return (
    <div 
      id={id} 
      className={`relative bg-zaria z-30 border-b border-gray-100 ${className}`}
    >
      <div className="container mx-auto">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between py-4 md:py-5 px-4 md:px-6 gap-4">
      
          <CustomBreadcrumbs items={breadcrumbItems} className="flex-shrink-0" />

          <div className="w-full md:w-auto md:max-w-xs lg:max-w-sm mt-2 lg:mt-0">
            <div className="relative group">
              <SearchBar
                value={searchQuery}
                onChange={onSearch}
                placeholder={searchPlaceholder}
                className="bg-gray-50 border-gray-100 rounded-lg pl-9 h-10 text-sm shadow-none transition-all duration-300 
                group-hover:border-gray-200 focus-within:border-zaria focus-within:ring-1 focus-within:ring-zaria"
                debounceDelay={debounceDelay}
              />
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400 group-hover:text-gray-600 transition-colors duration-300" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}