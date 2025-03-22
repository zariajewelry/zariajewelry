"use client";

import Image from "next/image";
import { Heart, Minus, Plus } from "lucide-react";
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
    return `$${price.toFixed(2)}`;
  };

  return (
    <div className="px-6 lg:px-3 border-b border-black">
      <li
        id={`cart-item-${item.id}`}
        className="group relative flex gap-4 py-4 transition-all duration-300 hover:bg-zariabg/60"
      >
        {/* Imagen del producto - Formato rectangular */}
        <div className="relative w-[70px] h-[90px] overflow-hidden">
          {/* Fondo limpio */}
          <div className="absolute inset-0 bg-zariabg"></div>

          {/* Imagen del producto con efecto hover sutil */}
          <div className="absolute inset-0 z-10 transition-all duration-500 group-hover:scale-[1.05] overflow-hidden">
            <Image
              src={
                "https://acdn-us.mitiendanube.com/stores/001/810/105/products/vv-pulsera-ga-plata-nacarado-1b-78a3c49d2327e35aef17374911288953-1024-1024.webp"
              }
              alt={item.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 80px, 80px"
            />
          </div>

          {/* Indicador de descuento */}
          {item.originalPrice && (
            <div className="absolute top-0 left-0 z-20">
              <div className="w-[40px] h-[28px] flex items-center justify-center bg-zaria-aquamarina">
                <span className="relative z-10 text-[10px] text-white font-univers-next">
                  SALE
                </span>
              </div>
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0 flex flex-col justify-between">
          <div className="flex justify-between">
            {/* Columna izquierda: Nombre del producto y detalles */}
            <div className="flex-1 min-w-0 pr-2">
              <h3 className="font-univers-next font-normal text-xs sm:text-sm text-zariablack leading-tight mb-1">
                {item.name}
              </h3>

              {/* Detalles del producto */}
              <div className="mt-0.5">
                <p className="font-univers-next font-normal text-[10px] sm:text-[11px] text-zariablack/70 leading-tight">
                  {item.material}
                  {item.length ? `, ${item.length}` : ""}
                  <span className="mx-1 text-zariablack/30">•</span>
                  <span className="tracking-wider">
                    Ref. {item.id.toString().padStart(4, "0")}
                  </span>
                </p>
              </div>
            </div>

            {/* Columna derecha: Precio */}
            <div className="text-right flex-shrink-0">
              {item.originalPrice ? (
                <div className="flex flex-col">
                  <span className="text-[10px] sm:text-[11px] text-gray-400 line-through font-univers-next">
                    {formatPrice(item.originalPrice)}
                  </span>
                  <span className="text-[11px] sm:text-xs font-univers-next text-red-500">
                    {formatPrice(item.price)}
                  </span>
                </div>
              ) : (
                <span className="text-[11px] sm:text-xs font-univers-next text-zariablack">
                  {formatPrice(item.price)}
                </span>
              )}
            </div>
          </div>

          {/* Espacio para separar la información del producto de los controles */}
          <div className="h-2 lg:h-3"></div>

          {/* Área de interacciones */}
          <div className="flex justify-between items-center">
            {/* Selector de cantidad - Rediseñado sin bordes cuadrados */}
            <div className="flex items-center space-x-3 border-b border-black/30 pb-1">
              <button
                onClick={() =>
                  updateQuantity(item.id, Math.max(1, item.quantity - 1))
                }
                className="flex items-center justify-center cursor-pointer hover:text-zaria-hover-aquamarina transition-colors"
                aria-label="Disminuir cantidad"
                disabled={item.quantity <= 1}
              >
                <Minus className="h-3 w-3" />
              </button>

              <div className="font-univers-next text-xs">{item.quantity}</div>

              <button
                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                className="flex items-center justify-center cursor-pointer hover:text-zaria-hover-aquamarina transition-colors"
                aria-label="Aumentar cantidad"
              >
                <Plus className="h-3 w-3" />
              </button>
            </div>

            {/* Botones de acción - Texto en lugar de ícono */}
            <div className="flex items-center space-x-4">
              <button
                onClick={() => moveToWishlist(item.id)}
                className="flex items-center hover:text-zaria-hover-aquamarina transition-colors duration-300"
                aria-label="Guardar para después"
              >
                <Heart className="h-4 w-4" />
              </button>

              <button
                onClick={() => removeItem(item.id)}
                className="font-univers-next text-xs hover:text-red-500 transition-colors duration-300"
                aria-label="Eliminar"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      </li>
    </div>
  );
}
