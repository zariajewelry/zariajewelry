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
    <div className="py-20 px-6 flex flex-col items-center justify-center text-center bg-zariabg">
      <div className="rounded-full p-6 mb-8 bg-zaria-aquamarina border border-black">
        <SearchX className="h-12 w-12 text-black" strokeWidth={1} />
      </div>
      
      <h3 className="text-xl font-realtime font-medium text-black mb-4">
        {title}
      </h3>
      
      <p className="text-sm font-realtime text-gray-700 mb-8 max-w-md leading-relaxed">
        {message}
      </p>
      
      {onClearFilters && (
        <Button
          onClick={onClearFilters}
          className="px-8 py-2.5 bg-amber-400 hover:bg-amber-500 border border-black text-black font-realtime transition-colors"
          type="button"
        >
          QUITAR TODOS LOS FILTROS
        </Button>
      )}
    </div>
  );
}