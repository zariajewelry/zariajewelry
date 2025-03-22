"use client";

import { useAppSelector } from "@/store/hook";
import EmptyCart from "@/components/cart/sidebar/ui/EmptyCart";
import HomeNewsletterBanner from "@/components/home/HomeNewsletterBanner";
import Footer from "@/components/home/Footer";
import CartItemListContainer from "@/containers/cart/desktop/CartItemListContainer";
import CartSummaryContainer from "@/containers/cart/desktop/CartSummaryContainer";


export default function CartPage() {
  const { items } = useAppSelector(state => state.cart);
  const isEmpty = items.length === 0;
  
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("es-AR", {
      style: "currency",
      currency: "ARS",
    }).format(price);
  };

  return (
    <div className="bg-zariabg min-h-screen pb-20">
      <div className="container mx-auto px-4 md:px-6 pt-8 pb-10">
        <h1 className="font-vollkorn font-normal text-xl lg:text-3xl text-zariablack mb-3">
          Tu Carrito
        </h1>
        <p className="font-univers-next font-normal text-xs lg:text-sm text-zariablack/70 mb-8">
          Revisa tus selecciones antes de finalizar la compra
        </p>

        {isEmpty ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-12"> 
            <div className="lg:col-span-7 xl:col-span-8 w-full"> 
              <CartItemListContainer formatPrice={formatPrice} />
            </div>
            <div className="lg:col-span-5 xl:col-span-4 w-full">
              <CartSummaryContainer formatPrice={formatPrice} />
            </div>
          </div>
        )}
      </div>
      <HomeNewsletterBanner />
      <Footer />
    </div>
  );
}