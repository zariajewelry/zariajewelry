"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import EmptyCart from "../cart/sidebar/ui/EmptyCart";
import GiftBagContainer from "@/containers/cart/bar/GiftBagContainer";
import PromoCodeContainer from "@/containers/cart/bar/PromoCodeContainer";
import ShippingContainer from "@/containers/cart/bar/ShippingContainer";
import CartItemListContainer from "@/containers/cart/bar/CartItemListContainer";
import OrderSummaryContainer from "@/containers/cart/bar/OrderSummaryContainer";
import CartActions from "../cart/sidebar/ui/ActionButtons";
import CartHeader from "../cart/sidebar/sections/CartHeader";


interface CartItem {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  material: string;
  length?: string;
  image: string;
}

interface CartSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function CartSidebar({ isOpen, onClose }: CartSidebarProps) {
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Collar Eternity",
      price: 2450,
      quantity: 1,
      material: "Oro Blanco",
      length: "45cm",
      image: "/placeholder.svg?height=200&width=200&text=Collar+Eternity",
    },
    {
      id: 2,
      name: "Collar Celestial",
      price: 1890,
      originalPrice: 2100,
      quantity: 1,
      material: "Oro Rosa",
      length: "40cm",
      image: "/placeholder.svg?height=200&width=200&text=Collar+Celestial",
    },
    {
      id: 3,
      name: "Collar Celestial",
      price: 1890,
      originalPrice: 2100,
      quantity: 1,
      material: "Oro Rosa",
      length: "40cm",
      image: "/placeholder.svg?height=200&width=200&text=Collar+Celestial",
    },
    {
      id: 4,
      name: "Collar Celestial",
      price: 1890,
      originalPrice: 2100,
      quantity: 1,
      material: "Oro Rosa",
      length: "40cm",
      image: "/placeholder.svg?height=200&width=200&text=Collar+Celestial",
    },
  ]);

  const isEmpty = cartItems.length === 0;

  

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-black/30 backdrop-blur-sm z-[100]"
            onClick={onClose}
          />
        )}
      </AnimatePresence>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 30, stiffness: 300 }}
            className="fixed top-0 right-0 h-full w-full 
              xs:w-[90%] 
              sm:w-[420px] 
              md:w-[450px]
              lg:w-[400px]
              xl:w-[450px]
              bg-white shadow-2xl z-[101] flex flex-col max-h-screen"
          >
            {/* Header */}
            <CartHeader onClose={onClose} />

            {/* Cart Cards   */}
            <div className="flex-1 overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {!isEmpty ? (
                <CartItemListContainer onClose={onClose} />
              ) : (
                <EmptyCart onClose={onClose} />
              )}
            </div>

            {/* Gift Bag */}
            {!isEmpty && (
              <div className="border-t border-gray-100 flex-shrink-0">
                <div className="px-6 sm:px-8 py-3 sm:py-5 lg:py-1.5 xl:py-5">
                  <GiftBagContainer />
                </div>
              </div>
            )}

            {/* Order Summary */}
            {cartItems.length > 0 && (
              <div className="border-t border-gray-100 bg-gray-50 flex-shrink-0">
                <div className="px-6 sm:px-8 py-1 sm:py-2 lg:py-1 xl:py-2 space-y-1 md:space-y-2 lg:space-y-1 xl:space-y-2">
                  {/* Código Promocional */}
                  <PromoCodeContainer />

                  {/* Separador */}
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-40"></div>

                  {/* Calcular Envío */}
                  <ShippingContainer />

                  {/* Separador  */}
                  <div className="h-px bg-gradient-to-r from-transparent via-gray-200 to-transparent opacity-70"></div>
                </div>

                {/* Price Summary */}
                <div className="border-t border-gray-100 px-4 sm:px-6 py-3 md:py-3 lg:py-1 xl:py-4">
                  <OrderSummaryContainer />
                </div>

                {/* Action Buttons */}
                <div className="border-t border-gray-100 px-4 sm:px-6 py-3 sm:py-4 lg:py-1.5 xl:py-4">
                  <CartActions onClose={onClose} />
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
