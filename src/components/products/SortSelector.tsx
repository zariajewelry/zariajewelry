// src/components/products/SortSelector.tsx
"use client";

import React, { useState } from "react";
import { ChevronDown, Plus } from "lucide-react"; // Importa el ícono Plus
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
  compact = false
}: SortSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  
  // Encuentra la etiqueta actual para mostrarla en el botón
  const currentOption = SORT_OPTIONS.find(option => option.value === value);
  const currentLabel = currentOption?.label || "Ordenar";

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const handleSelect = (optionValue: string) => {
    onChange(optionValue);
    setIsOpen(false);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Botón similar al de filtros */}
      {!compact ? (
        <div className="flex items-center gap-2">
          {showLabel && <span className="text-sm text-gray-500">Ordenar por:</span>}
          <button
            onClick={toggleDropdown}
            className="text-sm border border-gray-200 rounded-md py-1 px-4 bg-white flex items-center gap-2"
          >
            <span>{currentLabel}</span>
            <ChevronDown className={`h-3.5 w-3.5 transition-transform ${isOpen ? 'rotate-180' : ''}`} />
          </button>
        </div>
      ) : (
        <button
          onClick={toggleDropdown}
          className="group w-32 h-10 flex items-center justify-center border p-2 bg-productcard transition-all"
          aria-label="Opciones de ordenamiento"
        >
          <div className="w-full h-full flex items-center bg-white p-4 gap-2">
            <span className="text-xs font-montserrat font-light text-gray-800 group-hover:text-zaria transition-colors">ORDENAR</span>
            <Plus className="h-3 w-3 text-gray-600" /> {/* Cambiado a Plus en lugar de ChevronDown */}
          </div>
        </button>
      )}

      {/* Resto del código del menú desplegable... */}
      <AnimatePresence>
        {isOpen && (
          <>
            {/* Overlay para cerrar al hacer clic fuera */}
            <div 
              className="fixed inset-0 z-40"
              onClick={() => setIsOpen(false)} 
            />
            
            {/* Menú de opciones */}
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className={`absolute ${compact ? 'right-0' : 'left-0'} mt-2 w-48 bg-white border border-gray-200 shadow-lg z-50 py-1 rounded-md`}
            >
              {SORT_OPTIONS.map((option) => (
                <button
                  key={option.value}
                  onClick={() => handleSelect(option.value)}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-gray-50 flex items-center justify-between ${
                    value === option.value ? 'bg-gray-50 text-zaria' : ''
                  }`}
                >
                  {option.label}
                  {value === option.value && (
                    <span className="h-2 w-2 rounded-full bg-zaria" />
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