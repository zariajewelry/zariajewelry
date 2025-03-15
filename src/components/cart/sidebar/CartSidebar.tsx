"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import GiftBagContainer from "@/containers/cart/bar/GiftBagContainer";
import PromoCodeContainer from "@/containers/cart/bar/PromoCodeContainer";
import ShippingContainer from "@/containers/cart/bar/ShippingContainer";
import CartItemListContainer from "@/containers/cart/bar/CartItemListContainer";
import OrderSummaryContainer from "@/containers/cart/bar/OrderSummaryContainer";
import CartHeader from "./sections/CartHeader";
import EmptyCart from "./ui/EmptyCart";
import CartActions from "./ui/ActionButtons";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/store/store";
import { closeCart } from "@/store/slices/uiSlice";
import { useScrollLock } from "@/hooks/useScrollLock";

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



export default function CartSidebar() {
  const dispatch = useDispatch();
  const isOpen = useSelector((state: RootState) => state.ui.cartSidebarOpen);
  const handleClose = () => dispatch(closeCart());

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

  useScrollLock(isOpen);


  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 bg-deathzone z-[100]"
            onClick={handleClose}
            style={{ height: '100vh' }}
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
              2xl:w-[450px]
              bg-white shadow-2xl z-[101] flex flex-col max-h-screen"
          >
            {/* Header */}
            <CartHeader onClose={handleClose} />

            {/* Cart Cards   */}
            <div className="flex-1 items-container overflow-y-auto scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent">
              {!isEmpty ? (
                <CartItemListContainer onClose={handleClose} />
              ) : (
                <EmptyCart onClose={handleClose} />
              )}
            </div>

            {/* Gift Bag */}
            {!isEmpty && (
              <div className="border-t border-gray-100 flex-shrink-0 bg-gradient-to-b from-white/90 to-white/75">
                <div className="px-6 sm:px-8 py-3 sm:py-5 lg:py-1.5 2xl:py-5">
                  <GiftBagContainer />
                </div>
              </div>
            )}

            {/* Order Summary */}
            {!isEmpty && (
              <div className="border-t border-gray-100 bg-gray-50 flex-shrink-0">
                <div className="px-6 sm:px-8 py-1 sm:py-2 lg:py-1 2xl:py-2 space-y-1 md:space-y-2 lg:space-y-1 2xl:space-y-2">
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
                <div className="border-t border-gray-100 px-4 sm:px-6 py-3 md:py-3 lg:py-1 2xl:py-4">
                  <OrderSummaryContainer />
                </div>

                {/* Action Buttons */}
                <div className="border-t border-gray-100 px-4 sm:px-6 py-3 sm:py-4 lg:py-1.5 2xl:py-4">
                  <CartActions onClose={handleClose} />
                </div>
              </div>
            )}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
