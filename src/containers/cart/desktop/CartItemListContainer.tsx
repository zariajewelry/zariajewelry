"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { 
  updateQuantity as updateCartQuantity, 
  removeItem as removeCartItem,
  applyGiftWrapping as updateItemGiftWrapping
} from "@/store/slices/cartSlice";
import CartItemList from "@/components/cart/desktop/CartItemList";
import { GiftWrapping } from "@/types/cart";

interface CartItemListContainerProps {
  formatPrice: (price: number) => string;
}

export default function CartItemListContainer({ formatPrice }: CartItemListContainerProps) {
  const dispatch = useAppDispatch();
  const { items } = useAppSelector(state => state.cart);
  const { options } = useAppSelector(state => state.giftBag);

  // Adaptamos las bolsas al formato de GiftWrapping
  const giftWrappingOptions: GiftWrapping[] = options.map(bag => ({
    id: bag.id,
    name: bag.name,
    price: bag.price,
    image: bag.image,
    description: bag.description
  }));

  // Estado local para controlar qué item tiene el envoltorio expandido
  const [expandedItemId, setExpandedItemId] = useState<number | null>(null);

  // Handler para actualizar la cantidad
  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    dispatch(updateCartQuantity({ id, quantity }));
  };
  
  // Handler para eliminar un item
  const handleRemoveItem = (id: number) => {
    dispatch(removeCartItem(id));
  };
  
  // Handler para aplicar envoltorio de regalo (versión simplificada)
  const handleApplyGiftWrapping = (itemId: number, wrapping: GiftWrapping | null) => {
    // Actualizar el item en el carrito con el envoltorio seleccionado
    dispatch(updateItemGiftWrapping({ itemId, wrapping }));
  };

  // Toggle para expandir/colapsar el selector de envoltorio
  const toggleItemExpansion = (itemId: number) => {
    setExpandedItemId(prevId => prevId === itemId ? null : itemId);
  };

  return (
    <CartItemList
      items={items}
      giftWrappingOptions={giftWrappingOptions}
      updateQuantity={handleUpdateQuantity}
      removeItem={handleRemoveItem}
      applyGiftWrapping={handleApplyGiftWrapping}
      formatPrice={formatPrice}
      expandedItemId={expandedItemId}
      toggleItemExpansion={toggleItemExpansion}
    />
  );
}