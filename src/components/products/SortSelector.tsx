// src/components/products/SortSelector.tsx
"use client";

import React, { useState } from "react";
import { ChevronDown } from "lucide-react"; // Importa el ícono Plus
import { motion, AnimatePresence } from "framer-motion";
import { SORT_OPTIONS } from "@/constants/products";

interface SortSelectorProps {
  value: string;
  onChange: (value: string) => void;
  className?: string;
  showLabel?: boolean;
  compact?: boolean;
}

export default function SortSelector({
  value,
  onChange,
  className = "",
  showLabel = true,
  compact = false,
}: SortSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);

  // Encuentra la etiqueta actual para mostrarla en el botón
  const currentOption = SORT_OPTIONS.find((option) => option.value === value);
  const currentLabel = currentOption?.label || "Ordenar";

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className} flex justify-center items-center`}>
      {/* Botón similar al de filtros */}
      {!compact ? (
        <div className="flex items-center gap-2">
          {showLabel && (
            <span className="text-sm text-black font-montserrat">
              Ordenar por:
            </span>
          )}
          <button
            onClick={toggleDropdown}
            className="text-sm border py-1 px-4 bg-zariabg flex items-center gap-2"
          >
            <span>{currentLabel}</span>
            <ChevronDown
              className={`h-3.5 w-3.5 transition-transform ${
                isOpen ? "rotate-180" : ""
              }`}
            />
          </button>
        </div>
      ) : (
        <button
          onClick={toggleDropdown}
          className="flex items-center justify-center  py-1 gap-1 bg-productcard transition-all cursor-pointer"
          aria-label="Opciones de ordenamiento"
        >
          <span className="text-sm font-univers-next font-normal text-black transition-colors hover:text-zaria-hover-aquamarina">
            Ordenar
          </span>
          <ChevronDown
            className={`h-3 w-3 transition-transform ${
              isOpen ? "rotate-180" : ""
            }`}
          />
        </button>
      )}

      <AnimatePresence>
        {isOpen && (
          <>
            <div
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)}
            />
            <motion.div
              initial={{ opacity: 0, y: compact ? -10 : 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: compact ? -10 : 10 }}
              transition={{ duration: 0.2 }}
              className={`absolute ${
                compact
                  ? "right-0 top-[calc(100%+6px)] mt-2"
                  : "left-1/2 -translate-x-1/2 bottom-[calc(100%+16px)]"
              } w-48 bg-zariabg border border-gray-200 z-50`}
            >
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`w-full text-left px-4 py-2 border-b border-black/20 text-sm flex items-center justify-between cursor-pointer ${
                    value === option.value ? "bg-zaria-salmon/40" : ""
                  }`}
                >
                  {option.label}
                  {value === option.value && (
                    <span className="h-2 w-2 rounded-full" />
                  )}
                </button>
              ))}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
