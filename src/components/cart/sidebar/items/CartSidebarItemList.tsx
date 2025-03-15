"use client";

import { CartItem as CartItemType } from "@/types/cart";
import CartSidebarItem from "./CartSidebarItem";


interface CartItemListProps {
  items: CartItemType[];
  updateQuantity: (id: number, quantity: number) => void;
  removeItem: (id: number) => void;
  moveToWishlist: (id: number) => void;
}

export default function CartSidebarItemList({
  items,
  updateQuantity,
  removeItem,
  moveToWishlist,
}: CartItemListProps) {
  return (
    <div className="px-6 sm:px-8 py-3 md:py-4 lg:py-2 2xl:py-6">
      <ul className="space-y-4 md:space-y-5 lg:space-y-4 2xl:space-y-6">
        {items.map((item) => (
          <CartSidebarItem
            key={item.id}
            item={item}
            updateQuantity={updateQuantity}
            removeItem={removeItem}
            moveToWishlist={moveToWishlist}
          />
        ))}
      </ul>
    </div>
  );
}