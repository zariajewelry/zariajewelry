"use client";

import React from "react";
import { Button } from "@/components/ui/button";

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
  withLabels = true,
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
    <div className={`flex justify-center my-10 ${className}`}>
      <div className="flex items-center gap-2">
        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="border-gray-200 hover:bg-zaria hover:text-white hover:border-zaria cursor-pointer"
        >
          {withLabels ? "Anterior" : "←"}
        </Button>

        {visiblePages.map((page, i) => (
          typeof page === 'number' ? (
            <Button
              key={i}
              variant={currentPage === page ? "default" : "outline"}
              size="sm"
              onClick={() => onPageChange(page)}
              className={
                currentPage === page
                  ? "bg-zaria hover:bg-zaria"
                  : "border-gray-200 hover:bg-zaria hover:text-white hover:border-zaria cursor-pointer"
              }
            >
              {page}
            </Button>
          ) : (
            <span key={i} className="px-2 text-gray-400">
              {page}
            </span>
          )
        ))}

        <Button
          variant="outline"
          size="sm"
          onClick={() => onPageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="border-gray-200 hover:bg-zaria hover:text-white hover:border-zaria cursor-pointer"
        >
          {withLabels ? "Siguiente" : "→"}
        </Button>
      </div>
    </div>
  );
}