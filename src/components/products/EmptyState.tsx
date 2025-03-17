"use client";

import { SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

interface EmptyStateProps {
  title?: string;
  message?: string;
  onClearFilters?: () => void;
}

export default function EmptyState({
  title = "No se encontraron productos",
  message = "Prueba con otros términos de búsqueda o modifica los filtros.",
  onClearFilters
}: EmptyStateProps) {
  return (
    <div className="py-16 px-4 flex flex-col items-center justify-center text-center">
      <div className="rounded-full p-5 mb-6 bg-zaria/20">
        <SearchX className="h-10 w-10 text-zaria" />
      </div>
      <h3 className="text-lg font-medium text-gray-800 mb-2">{title}</h3>
      <p className="text-sm text-gray-500 mb-6 max-w-md">{message}</p>
      {onClearFilters && (
        <button
          onClick={onClearFilters}
          className="h-9 px-4 bg-white border border-zaria text-zaria cursor-pointer hover:bg-zaria/20 hover:text-black"
        >
          Limpiar todos los filtros
        </button>
      )}
    </div>
  );
}