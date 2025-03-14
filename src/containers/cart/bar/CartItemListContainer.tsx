"use client";

import { useAppDispatch, useAppSelector } from "@/store/hook";
import { updateQuantity as updateCartQuantity, removeItem as removeCartItem } from "@/store/slices/cartSlice";
import CartSidebarItemList from "@/components/cart/sidebar/items/CartSidebarItemList";
import EmptyCart from "@/components/cart/sidebar/ui/EmptyCart";

interface CartItemListContainerProps {
  onClose: () => void;
}

export default function CartItemListContainer({ onClose }: CartItemListContainerProps) {
  const dispatch = useAppDispatch();
  const { items, loading } = useAppSelector(state => state.cart);
  
  // Handler para actualizar la cantidad
  const handleUpdateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    
    dispatch(updateCartQuantity({ id, quantity }));
  };
  
  // Handler para eliminar un item
  const handleRemoveItem = (id: number) => {
    dispatch(removeCartItem(id));
  };
  
  // Handler para mover a wishlist (en una aplicación real, esto agregaría a wishlist)
  const handleMoveToWishlist = (id: number) => {
    // Aquí se podría despachar una acción para agregar a la wishlist
    // Por ahora, solo eliminamos del carrito como funcionalidad temporal
    dispatch(removeCartItem(id));
  };
  
  // Manejar estado de carga o carrito vacío
  if (loading) {
    return <div className="flex-1 flex items-center justify-center">Cargando productos...</div>;
  }
  
  const isEmpty = items.length === 0;
  
  return (
    <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
      {!isEmpty ? (
        <CartSidebarItemList
          items={items}
          updateQuantity={handleUpdateQuantity}
          removeItem={handleRemoveItem}
          moveToWishlist={handleMoveToWishlist}
        />
      ) : (
        <EmptyCart onClose={onClose} />
      )}
    </div>
  );
}