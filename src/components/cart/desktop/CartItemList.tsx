import Link from "next/link";
import { MoveRight } from "lucide-react";
import CartItem from "./CartItem";
import { CartItem as CartItemType, GiftWrapping } from "@/types/cart";

interface CartItemListProps {
  items: CartItemType[];
  giftWrappingOptions: GiftWrapping[];
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  applyGiftWrapping: (id: number, wrapping: GiftWrapping | null) => void;
  formatPrice: (price: number) => string;
  expandedItemId: number | null;
  toggleItemExpansion: (id: number) => void;
}

export default function CartItemList({
  items,
  giftWrappingOptions,
  updateQuantity,
  removeItem,
  applyGiftWrapping,
  formatPrice,
  expandedItemId,
  toggleItemExpansion
}: CartItemListProps) {
  return (
    <div className="w-full">
      {/* Encabezado de la tabla */}
      <div className="hidden md:flex border-b border-black pb-4 mb-6">
        <div className="w-1/2 font-vollkorn text-sm uppercase tracking-wider text-zariablack">
          Producto
        </div>
        <div className="w-1/6 font-vollkorn text-sm uppercase tracking-wider text-zariablack text-center">
          Cantidad
        </div>
        <div className="w-1/6 font-vollkorn text-sm uppercase tracking-wider text-zariablack text-right">
          Precio
        </div>
        <div className="w-1/6 font-vollkorn text-sm uppercase tracking-wider text-zariablack text-right">
          Subtotal
        </div>
      </div>

      {/* Lista de productos */}
      <div className="space-y-4 ">
        {items.map((item) => (
          <CartItem
            key={item.id}
            item={item}
            giftWrappingOptions={giftWrappingOptions}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
            applyGiftWrapping={applyGiftWrapping}
            formatPrice={formatPrice}
            isGiftWrappingExpanded={expandedItemId === item.id}
            toggleGiftWrapping={() => toggleItemExpansion(item.id)}
          />
        ))}
      </div>

      {/* Links para seguir comprando */}
      <div className="mt-8">
        <Link
          href="/products"
          className="inline-flex items-center font-univers-next text-sm text-zariablack hover:text-zaria-hover-aquamarina group"
        >
          <span className="relative">
            SEGUIR COMPRANDO
            <MoveRight className="inline-block h-3 w-3 ml-2 transition-transform group-hover:translate-x-1" />
            <span className="absolute -bottom-[3px] left-0 w-full h-[1px] bg-zariablack group-hover:bg-zaria-hover-aquamarina transition-colors"></span>
          </span>
        </Link>
      </div>
    </div>
  );
}