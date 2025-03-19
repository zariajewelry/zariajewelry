
"use client";

import React from "react";
import { MoveLeft, MoveRight } from "lucide-react";

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  className?: string;
  withLabels?: boolean; 
  maxVisiblePages?: number;
}

export default function Pagination({
  currentPage,
  totalPages,
  onPageChange,
  className = "",
  maxVisiblePages = 5
}: PaginationProps) {
  const getVisiblePages = () => {
    if (totalPages <= maxVisiblePages) {
      return Array.from({ length: totalPages }, (_, i) => i + 1);
    }
    
    if (currentPage <= Math.ceil(maxVisiblePages / 2)) {
      return [
        ...Array.from({ length: maxVisiblePages - 1 }, (_, i) => i + 1),
        '...',
        totalPages
      ];
    }
    
    if (currentPage >= totalPages - Math.floor(maxVisiblePages / 2)) {
      return [
        1,
        '...',
        ...Array.from(
          { length: maxVisiblePages - 1 }, 
          (_, i) => totalPages - (maxVisiblePages - 2) + i
        )
      ];
    }
    
    return [
      1,
      '...',
      ...Array.from(
        { length: maxVisiblePages - 4 }, 
        (_, i) => currentPage - Math.floor((maxVisiblePages - 4) / 2) + i
      ),
      '...',
      totalPages
    ];
  };

  const visiblePages = getVisiblePages();

  return (
    <div className={`flex justify-center my-6 ${className}`}>
      <div className="flex items-center gap-4 font-archivo">
        {currentPage > 1 && (
          <button
            onClick={() => onPageChange(currentPage - 1)}
            className="flex items-center text-gray-700 hover:text-gray-500 transition-colors cursor-pointer"
            aria-label="Página anterior"
          >
            <MoveLeft className="h-5 w-5" />
          </button>
        )}

        {visiblePages.map((page, i) => (
          typeof page === 'number' ? (
            <button
              key={i}
              onClick={() => onPageChange(page)}
              className={`text-lg ${
                currentPage === page
                  ? "text-black font-archivo border-b-2 border-black"
                  : "text-gray-500 font-archivo cursor-pointer"
              }`}
              aria-label={`Ir a página ${page}`}
              aria-current={currentPage === page ? "page" : undefined}
            >
              {page}
            </button>
          ) : (
            <span key={i} className="text-gray-400">
              {page}
            </span>
          )
        ))}

        {currentPage < totalPages && (
          <button
            onClick={() => onPageChange(currentPage + 1)}
            className="flex items-center text-gray-700 hover:text-gray-500 transition-colors cursor-pointer"
            aria-label="Página siguiente"
          >
            <MoveRight className="h-5 w-5" />
          </button>
        )}
      </div>
    </div>
  );
}