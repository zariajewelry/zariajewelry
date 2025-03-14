import { useState, useEffect } from 'react';
import { calculateCartSummary } from '@/utils/cartCalculations';
import { CartItem, CartSummary } from '@/types/cart';


export function useCart() {
  const [items, setItems] = useState<CartItem[]>([]);
  
  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        setItems(parsedCart);
      } catch (e) {
        console.error('Error parsing cart from localStorage:', e);
      }
    }
  }, []);

  useEffect(() => {
    if (items.length > 0) {
      localStorage.setItem('cart', JSON.stringify(items));
    }
  }, [items]);

  const addItem = (item: CartItem) => {
    setItems(prevItems => {
      const existingItemIndex = prevItems.findIndex(i => i.id === item.id);
      
      if (existingItemIndex >= 0) {
        const updatedItems = [...prevItems];
        updatedItems[existingItemIndex].quantity += item.quantity;
        return updatedItems;
      } else {
        return [...prevItems, item];
      }
    });
  };

  const updateQuantity = (id: number, quantity: number) => {
    if (quantity < 1) return;
    
    setItems(prevItems =>
      prevItems.map(item =>
        item.id === id ? { ...item, quantity } : item
      )
    );
  };

  const removeItem = (id: number) => {
    setItems(prevItems => prevItems.filter(item => item.id !== id));
    
    if (items.length === 1) {
      localStorage.removeItem('cart');
    }
  };

  const moveToWishlist = (id: number) => {
    // Aquí implementaríamos la lógica de mover a la wishlist
    // Por ahora, solo simulamos eliminando del carrito
    removeItem(id);
  };

  const clearCart = () => {
    setItems([]);
    localStorage.removeItem('cart');
  };


  const calculateSummary = (discount: number = 0, giftBagCost: number = 0): CartSummary => {
    return calculateCartSummary(items, discount, giftBagCost);
  };

  return {
    items,
    addItem,
    updateQuantity,
    removeItem,
    moveToWishlist,
    clearCart,
    calculateSummary,
    isEmpty: items.length === 0
  };
}