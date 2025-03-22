import Image from "next/image";
import { Minus, Plus, ChevronDown, ChevronUp } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import GiftBoxIcon from "@/components/home/GiftIcon";
import GiftWrappingSelector from "@/components/cart/desktop/GiftWrappingSelector";
import { CartItem as CartItemType, GiftWrapping } from "@/types/cart";

interface CartItemProps {
  item: CartItemType;
  giftWrappingOptions: GiftWrapping[];
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  applyGiftWrapping: (id: number, wrapping: GiftWrapping | null) => void;
  formatPrice: (price: number) => string;
  isGiftWrappingExpanded: boolean;
  toggleGiftWrapping: () => void;
}

export default function CartItem({
  item,
  giftWrappingOptions,
  updateQuantity,
  removeItem,
  applyGiftWrapping,
  formatPrice,
  isGiftWrappingExpanded,
  toggleGiftWrapping,
}: CartItemProps) {
  return (
    <div className="bg-white rounded-md shadow-sm hover:shadow-md transition-shadow duration-300 p-4 mb-4">
      <div className="flex flex-col md:flex-row items-start">
        {/* Imagen y detalles del producto */}
        <div className="w-full md:w-1/2 flex items-start">
          <div className="relative w-20 h-26 sm:mt-0 lg:w-20 lg:h-26 bg-white border border-black/10 mr-4 flex-shrink-0">
            <Image
              src={item.image}
              alt={item.name}
              fill
              className="object-cover"
            />
          </div>
          <div className="flex-grow">
            <h3 className="font-univers-next font-normal text-xs sm:text-sm text-zariablack leading-tight">
              {item.name}
            </h3>
            <p className="font-univers-next font-normal text-[10px] sm:text-[11px] text-zariablack/70 leading-tight mt-1">
              {item.material}
            </p>
            {item.length && (
              <p className="font-univers-next font-normal text-[10px] sm:text-[11px] leading-tight text-zariablack/70">
                Longitud: {item.length}
              </p>
            )}

            {/* Etiqueta de precio visible solo en móvil */}
            <div className="flex items-center justify-between mt-2 md:hidden">
              <span className="font-univers-next text-xs text-zariablack/70">
                Precio unitario:
              </span>
              <span className="font-univers-next text-sm text-zariablack">
                {formatPrice(item.price)}
              </span>
            </div>

            {/* Etiqueta de subtotal visible solo en móvil */}
            <div className="flex items-center justify-between mt-1 md:hidden">
              <span className="font-univers-next text-xs text-zariablack/70">
                Subtotal:
              </span>
              <span className="font-univers-next text-sm font-medium text-zariablack">
                {formatPrice(item.price * item.quantity)}
              </span>
            </div>

            {/* Envoltorio seleccionado (si aplica) */}
            {item.selectedWrapping && (
              <div className="mt-2 flex items-center">
                <div className="w-3 h-3 mr-1">
                  <GiftBoxIcon className="text-orange-600" />
                </div>
                <span className="font-univers-next text-xs text-zaria-purple">
                  {item.selectedWrapping.name} (+
                  {formatPrice(item.selectedWrapping.price)})
                </span>
              </div>
            )}

            {/* Botón para eliminar en móvil */}
            <button
              onClick={() => removeItem(item.id)}
              className="md:hidden mt-3 font-univers-next text-[10px] text-zariablack/70 hover:text-zaria-hover-aquamarina transition-colors"
            >
              eliminar
            </button>
          </div>

          {/* Botón para eliminar en desktop */}
          <button
            onClick={() => removeItem(item.id)}
            className="hidden md:block text-[10px] text-zariablack/50 hover:text-zaria-hover-aquamarina transition-colors ml-2"
            aria-label="Eliminar producto"
          >
            eliminar
          </button>
        </div>

        {/* Cantidad - Visible en móvil y escritorio con layouts diferentes */}
        <div className="flex w-full md:w-1/6 justify-between items-center mt-4 md:mt-0 md:justify-center md:self-center">
          <span className="font-univers-next text-xs text-zariablack/70 md:hidden">
            Cantidad:
          </span>
          <div className="flex items-center">
            <button
              onClick={() => updateQuantity(item.id, item.quantity - 1)}
              disabled={item.quantity <= 1}
              className="p-1 hover:text-zaria-hover-aquamarina transition-colors disabled:opacity-50 disabled:pointer-events-none"
            >
              <Minus className="h-3 w-3" />
            </button>

            <div className="w-8 text-center font-univers-next text-sm">
              {item.quantity}
            </div>

            <button
              onClick={() => updateQuantity(item.id, item.quantity + 1)}
              className="p-1 hover:text-zaria-hover-aquamarina transition-colors"
            >
              <Plus className="h-3 w-3" />
            </button>
          </div>
        </div>

        {/* Precio unitario - Visible solo en escritorio */}
        <div className="hidden md:flex md:w-1/6 md:items-center md:self-center md:justify-end">
          <div className="md:text-right">
            <span className="font-univers-next text-sm text-zariablack">
              {formatPrice(item.price)}
            </span>
            {item.originalPrice && (
              <span className="block font-univers-next text-xs text-zariablack/50 line-through">
                {formatPrice(item.originalPrice)}
              </span>
            )}
          </div>
        </div>

        {/* Subtotal - Visible solo en escritorio */}
        <div className="hidden md:flex md:w-1/6 md:items-center md:self-center md:justify-end">
          <span className="font-univers-next text-sm font-medium text-zariablack">
            {formatPrice(item.price * item.quantity)}
          </span>
        </div>
      </div>

      {/* Sección para añadir envoltorio premium */}
      <div className="mt-4 border-t border-black/10 pt-4">
        <motion.button
          onClick={toggleGiftWrapping}
          className="font-univers-next text-xs w-full flex items-center text-zariablack hover:text-zaria-hover-aquamarina transition-colors group"
          whileHover={{ x: 2 }}
        >
          <div className="gift-box-wrapper relative mr-2">
            <motion.div
              animate={{ y: [0, -2, 0] }}
              transition={{
                duration: 1.5,
                repeat: Infinity,
                repeatType: "reverse",
              }}
              className="w-4 h-4"
            >
              <GiftBoxIcon className="text-orange-600" />
              {item.selectedWrapping && (
                <motion.div
                  className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-red-600 rounded-full"
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1, repeat: Infinity }}
                />
              )}
            </motion.div>
          </div>
          <div className="flex flex-col">
            <span className="text-xs font-medium">
              {item.selectedWrapping
                ? "Cambiar envoltorio premium"
                : "Añadir envoltorio especial"}
            </span>
            <span className="text-[10px] text-zariablack/60 pl-2">
              Dale un toque especial a tu regalo
            </span>
          </div>

          <div className="ml-auto">
            {isGiftWrappingExpanded ? (
              <ChevronUp className="h-3 w-3 transition-transform duration-300" />
            ) : (
              <ChevronDown className="h-3 w-3 transition-transform duration-300" />
            )}
          </div>
        </motion.button>

        <AnimatePresence>
          {isGiftWrappingExpanded && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="overflow-hidden"
            >
              <GiftWrappingSelector
                options={giftWrappingOptions}
                selectedOption={item.selectedWrapping || null}
                onSelect={(option) => applyGiftWrapping(item.id, option)}
                formatPrice={formatPrice}
              />
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
}
