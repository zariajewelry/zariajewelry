"use client";

import Image from "next/image";
import { Heart, Minus, Plus, Trash2 } from "lucide-react";
import { CartItem as CartItemType } from "@/types/cart";

interface CartItemProps {
  item: CartItemType;
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  moveToWishlist: (id: number) => void;
}

export default function CartSidebarItem({
  item,
  updateQuantity,
  removeItem,
  moveToWishlist,
}: CartItemProps) {
  // Función para formatear precios
  const formatPrice = (price: number) => {
    return `${price.toFixed(2)}€`;
  };

  return (
    <li
      id={`cart-item-${item.id}`}
      className="group relative flex gap-3 sm:gap-5 pb-3 md:pb-4 lg:pb-3 2xl:pb-4 border-b border-gray-100 transition-all duration-500"
    >
      {/* Product Image - RESPONSIVE SIZE */}
      <div className="relative w-[70px] sm:w-[80px] lg:w-[70px] 2xl:w-[85px] aspect-square overflow-hidden rounded">
        {/* Elegant product backdrop with layered effects */}
        <div className="absolute inset-0 bg-gradient-to-br from-gray-50 via-white to-gray-50"></div>

        {/* Subtle ornamental corner detail */}
        <svg
          className="absolute top-0 left-0 w-5 h-5 md:w-6 md:h-6 text-zaria/5 opacity-0 group-hover:opacity-100 transition-opacity duration-700"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path d="M12 2L2 12" stroke="currentColor" strokeWidth="0.5" />
          <path d="M8 2H2V8" stroke="currentColor" strokeWidth="0.5" />
        </svg>

        {/* Product image with premium hover effect */}
        <div className="absolute inset-0 z-10 transition-all duration-700 group-hover:scale-[1.03] overflow-hidden">
          <Image
            src={
              "https://acdn-us.mitiendanube.com/stores/001/810/105/products/vv-pulsera-ga-plata-nacarado-1b-78a3c49d2327e35aef17374911288953-1024-1024.webp"
            }
            alt={item.name}
            fill
            className="object-cover"
            sizes="(max-width: 640px) 70px, 85px"
          />

          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 to-white/10 opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        </div>

        {/* Discount indicator */}
        {item.originalPrice && (
          <div className="absolute top-1 sm:top-2 right-1 sm:right-2 z-20">
            <div className="w-7 h-7 sm:w-8 sm:h-8 lg:w-7 lg:h-7 2xl:w-8 2xl:h-8 flex items-center justify-center">
              <div className="absolute inset-0 rounded-full bg-black/80 backdrop-blur-md"></div>
              <span className="relative z-10 text-[9px] sm:text-[10px] lg:text-[9px] 2xl:text-[10px] text-white font-light">
                -{Math.round((1 - item.price / item.originalPrice) * 100)}%
              </span>
            </div>
          </div>
        )}
      </div>

      <div className="flex-1 min-w-0 flex flex-col justify-between">
        <div className="flex justify-between">
          {/* Columna izquierda: Nombre del producto y detalles */}
          <div className="flex-1 min-w-0 pr-2">
            <h3 className="font-semibold text-[12px] sm:text-[13px] lg:text-[12px] 2xl:text-[13px] tracking-wide leading-tight group-hover:text-zaria/90 transition-colors duration-500">
              {item.name}
            </h3>

            {/* Detalles del material siempre debajo del título */}
            <div className="mt-0.5 lg:mt-0 2xl:mt-0.5">
              <p className="text-[10px] sm:text-[11px] lg:text-[10px] 2xl:text-[11px] text-gray-700 tracking-wide leading-tight">
                {item.material}
                {item.length ? `, ${item.length}` : ""}
                <span className="mx-1 text-gray-300">•</span>
                <span className="tracking-wider font-light">
                  Ref. {item.id.toString().padStart(4, "0")}
                </span>
              </p>
            </div>
          </div>

          {/* Columna derecha: Precio */}
          <div className="text-right flex-shrink-0">
            {item.originalPrice ? (
              <div className="flex flex-col">
                <span className="text-[9px] sm:text-[10px] lg:text-[9px] 2xl:text-[10px] text-gray-400 line-through">
                  {formatPrice(item.originalPrice)}
                </span>
                <span className="text-[10px] sm:text-xs lg:text-[11px] 2xl:text-xs font-medium">
                  {formatPrice(item.price)}
                </span>
              </div>
            ) : (
              <span className="text-[10px] sm:text-xs lg:text-[11px] 2xl:text-xs font-medium">
                {formatPrice(item.price)}
              </span>
            )}
          </div>
        </div>

        {/* Espacio para separar la información del producto de los controles */}
        <div className="h-1 lg:h-0.5 2xl:h-1"></div>

        {/* Interactions Area  */}
        <div className="flex justify-between items-end">
          {/* Quantity Selector */}
          <div className="relative flex h-6 sm:h-7 lg:h-6 2xl:h-7 border border-gray-200 group-hover:border-zaria/30 transition-all duration-500 overflow-hidden rounded-md">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              className="w-7 sm:w-8 lg:w-7 2xl:w-8 h-full flex items-center justify-center cursor-pointer relative hover:bg-zaria/10 transition-colors rounded-l-md"
              aria-label="Disminuir cantidad"
            >
              <Minus className="h-2.5 w-2.5 lg:h-2.5 lg:w-2.5 2xl:h-2.5 2xl:w-2.5" />
            </button>

            <div className="w-7 sm:w-8 lg:w-7 2xl:w-8 h-full flex items-center justify-center border-l border-r border-gray-200 font-light text-xs lg:text-[10px] 2xl:text-xs relative">
              {item.quantity}
            </div>

            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="w-7 sm:w-8 lg:w-7 2xl:w-8 h-full flex items-center justify-center cursor-pointer relative hover:bg-zaria/10 transition-colors rounded-r-md"
              aria-label="Aumentar cantidad"
            >
              <Plus className="h-2.5 w-2.5 lg:h-2 lg:w-2.5 2xl:h-2.5 2xl:w-2.5" />
            </button>
          </div>

          {/* Action Buttons  */}
          <div className="flex items-center">
            <button
              onClick={() => moveToWishlist(item.id)}
              className="group/btn relative w-7 sm:w-9 lg:w-7 2xl:w-9 h-7 sm:h-9 lg:h-7 2xl:h-9 flex items-center justify-center cursor-pointer overflow-hidden"
              aria-label="Guardar para después"
            >
              <Heart className="h-[13px] sm:h-[15px] lg:h-[13px] 2xl:h-[15px] w-[13px] sm:w-[15px] lg:w-[12px] 2xl:w-[15px] text-gray-400 relative z-10 group-hover/btn:text-zaria transition-colors duration-300" />
            </button>

            <button
              onClick={() => removeItem(item.id)}
              className="group/btn relative w-7 sm:w-9 lg:w-7 2xl:w-9 h-7 sm:h-9 lg:h-7 2xl:h-9 flex items-center justify-center cursor-pointer overflow-hidden"
              aria-label="Eliminar"
            >
              <Trash2 className="h-[13px] sm:h-[15px] lg:h-[13px] 2xl:h-[15px] w-[13px] sm:w-[15px] lg:w-[12px] 2xl:w-[15px] text-gray-400 relative z-10 group-hover/btn:text-red-500 transition-colors duration-300" />
            </button>
          </div>
        </div>
      </div>

      {/* Luxury Selection Indicator */}
      <div className="absolute left-0 top-0 bottom-0 w-0.5 bg-zaria/0 group-hover:bg-gradient-to-b group-hover:from-zaria/10 group-hover:via-zaria/50 group-hover:to-zaria/10 transition-all duration-700 opacity-0 group-hover:opacity-100"></div>
    </li>
  );
}
