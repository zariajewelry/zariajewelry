"use client";

import { ShoppingBag, X } from "lucide-react";

interface CartHeaderProps {
  onClose: () => void;
}

export default function CartHeader({ onClose }: CartHeaderProps) {
  return (
    <div className="relative overflow-hidden bg-white border-b border-gray-100 flex-shrink-0">
      <div className="absolute top-0 right-0 w-28 h-28 bg-gradient-to-bl from-zaria/5 to-transparent rounded-full -translate-y-1/2 translate-x-1/3"></div>

      <div className="px-8 py-3 md:py-4 lg:py-2 2xl:py-5 relative bg-gray-50">
        <div className="flex items-center justify-between">
          {/* Logo y título */}
          <div className="flex items-center">
            <div className="relative mr-4">
              <ShoppingBag
                className="h-4 w-4 md:h-4 md:w-4 lg:h-4 lg:w-4 2xl:h-5 2xl:w-5 text-black"
                strokeWidth={1.25}
              />
            </div>
            <div>
              <p className="text-xs font-semibold tracking-wider uppercase mt-0.5">
                MI COMPRA
              </p>
            </div>
          </div>

          {/* Botón de cierre */}
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center cursor-pointer"
            aria-label="Cerrar carrito"
          >
            <X className="h-5 w-5 text-gray-400 hover:text-zaria/50 transition-colors duration-300" />
          </button>
        </div>

        {/* Línea decorativa inferior */}
        <div className="absolute bottom-0 left-8 right-8 h-[1px]">
          <div className="relative h-full">
            <div className="absolute inset-0 bg-gradient-to-r from-gray-200 via-gray-200 to-gray-200"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-zaria/50 to-transparent w-[80px]"></div>
          </div>
        </div>
      </div>
    </div>
  );
}