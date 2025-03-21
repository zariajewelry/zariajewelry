"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { 
  Plus, Minus, Gift, 
  CreditCard, Truck, MoveRight, 
  ChevronDown, ChevronUp 
} from "lucide-react";
import ShippingCalculator from "@/components/cart/desktop/ShippingCalculator";
import GiftWrappingSelector from "@/components/cart/desktop/GiftWrappingSelector";
import EmptyCart from "@/components/cart/sidebar/ui/EmptyCart";
import PromoCodeInput from "@/components/cart/desktop/PromoCodeInput";

// Tipos
type CartItem = {
  id: number;
  name: string;
  price: number;
  originalPrice?: number;
  quantity: number;
  image: string;
  material: string;
  length?: string;
  selectedWrapping?: GiftWrapping | null;
};

type GiftWrapping = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type ShippingOption = {
  id: string;
  name: string;
  description: string;
  price: number;
  estimatedDelivery: string;
};

// Componente icono de regalo directamente integrado para evitar problemas de importación
const GiftIcon = ({ className = "" }: { className?: string }) => (
  <svg 
    viewBox="0 0 89 92" 
    fill="none" 
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    width="100%"
    height="100%"
  >
    <g>
      <path
        d="M12.8786 17.6816C16.8906 23.6517 33.2733 24.3151 40.9631 23.9005H59.0174C62.0265 23.2095 68.5461 20.9983 70.5521 17.6816C73.0597 13.5356 64.534 5.24378 57.5129 4.82919C50.4917 4.41459 43.9721 19.7545 42.4676 21.8275C37.6299 15.5786 32.1086 10.0361 28.3937 6.6196C26.5821 4.95358 23.9776 4.46624 21.7518 5.51653C16.0773 8.19415 9.61702 12.8283 12.8786 17.6816Z"
        fill="currentColor"
        stroke="#604F3F"
        strokeWidth="2"
      />
      <rect
        x="1"
        y="23"
        width="78"
        height="63"
        rx="1"
        fill="currentColor"
        stroke="#604F3F"
        strokeWidth="2"
      />
      <path
        d="M12.2515 85.4812L9.07301 85.5199L78.4876 30.1818L78.4651 32.4903L12.2515 85.4812Z"
        fill="currentColor"
        stroke="#604F3F"
      />
      <rect
        x="41.5"
        y="23.5"
        width="2"
        height="62"
        fill="currentColor"
        stroke="#604F3F"
      />
      <rect
        x="41.4045"
        y="40.1227"
        width="2"
        height="39.8848"
        transform="rotate(90 41.4045 40.1227)"
        fill="currentColor"
        stroke="#604F3F"
      />
      <path
        d="M16 9.36463C21 11.4343 33.3 17.2589 42.5 24C44.5 24 64.5 6.26016 67 9.36463"
        stroke="#604F3F"
        strokeWidth="2"
      />
    </g>
  </svg>
);

export default function CartPage() {
  // Estado para los items del carrito
  const [cartItems, setCartItems] = useState<CartItem[]>([
    {
      id: 1,
      name: "Collar Eternity",
      price: 3450,
      quantity: 1,
      material: "Oro blanco 18k",
      length: "45cm",
      image: "/products/collar-eternity.jpg",
      selectedWrapping: null
    },
    {
      id: 2,
      name: "Anillo Luminescence",
      price: 2850,
      quantity: 1,
      material: "Oro rosa 18k con diamantes",
      image: "/products/anillo-luminescence.jpg",
      selectedWrapping: null
    },
    {
        id: 1,
        name: "Collar Eternity",
        price: 3450,
        quantity: 1,
        material: "Oro blanco 18k",
        length: "45cm",
        image: "/products/collar-eternity.jpg",
        selectedWrapping: null
      },
      {
        id: 2,
        name: "Anillo Luminescence",
        price: 2850,
        quantity: 1,
        material: "Oro rosa 18k con diamantes",
        image: "/products/anillo-luminescence.jpg",
        selectedWrapping: null
      },
  ]);
  
  // Estado para opciones de envoltorios premium
  const [giftWrappingOptions, setGiftWrappingOptions] = useState<GiftWrapping[]>([
    {
      id: 1,
      name: "Envoltura Clásica",
      price: 250,
      image: "/gift-wrapping/classic.jpg"
    },
    {
      id: 2,
      name: "Envoltura Premium",
      price: 450,
      image: "/gift-wrapping/premium.jpg"
    },
    {
      id: 3,
      name: "Caja Especial",
      price: 650,
      image: "/gift-wrapping/special-box.jpg"
    }
  ]);
  
  // Estado para opciones de envío
  const [shippingOptions, setShippingOptions] = useState<ShippingOption[]>([
    {
      id: "standard",
      name: "Envío Estándar",
      description: "Entrega a domicilio",
      price: 0,
      estimatedDelivery: "3-5 días hábiles"
    },
    {
      id: "express",
      name: "Envío Express",
      description: "Entrega prioritaria",
      price: 1200,
      estimatedDelivery: "1-2 días hábiles"
    },
    {
      id: "same-day",
      name: "Entrega en el Día",
      description: "Solo CABA",
      price: 1800,
      estimatedDelivery: "Hoy (pedidos antes de las 12hs)"
    }
  ]);
  
  // Estados para los cálculos
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption | null>(null);
  const [promoCode, setPromoCode] = useState("");
  const [promoDiscount, setPromoDiscount] = useState(0);
  const [expandedSections, setExpandedSections] = useState({
    giftWrapping: false,
    shipping: false,
    promoCode: false
  });
  
  // Verificar si el carrito está vacío
  const isEmpty = cartItems.length === 0;
  
  // Función para actualizar la cantidad
  const updateQuantity = (itemId: number, newQuantity: number) => {
    if (newQuantity < 1) return;
    
    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, quantity: newQuantity } : item
      )
    );
  };
  
  // Función para eliminar un item
  const removeItem = (itemId: number) => {
    setCartItems(prev => prev.filter(item => item.id !== itemId));
  };
  
  // Función para aplicar envoltorio
  const applyGiftWrapping = (itemId: number, wrapping: GiftWrapping | null) => {
    setCartItems(prev => 
      prev.map(item => 
        item.id === itemId ? { ...item, selectedWrapping: wrapping } : item
      )
    );
  };
  
  // Función para aplicar código promocional
  const applyPromoCode = (code: string) => {
    // Simulación de verificación de código
    if (code.toUpperCase() === "ZARIA20") {
      setPromoDiscount(0.2); // 20% de descuento
      return true;
    }
    return false;
  };
  
  // Cálculos para el resumen
  const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
  const wrappingTotal = cartItems.reduce((sum, item) => 
    sum + (item.selectedWrapping ? item.selectedWrapping.price * item.quantity : 0), 0);
  const shippingCost = selectedShipping ? selectedShipping.price : 0;
  const discountAmount = promoDiscount * subtotal;
  const total = subtotal + wrappingTotal + shippingCost - discountAmount;
  
  // Formatear precios
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('es-AR', {
      style: 'currency',
      currency: 'ARS'
    }).format(price);
  };
  
  // Toggle para expandir/colapsar secciones
  const toggleSection = (section: keyof typeof expandedSections) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  return (
    <div className="bg-zariabg min-h-screen pb-20">
      <div className="container mx-auto px-4 md:px-6 pt-8">
        <h1 className="font-vollkorn text-3xl text-zariablack mb-3">Tu Carrito</h1>
        <p className="font-univers-next text-sm text-zariablack/70 mb-8">Revisa tus selecciones antes de finalizar la compra</p>
        
        {isEmpty ? (
          <EmptyCart />
        ) : (
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* Columna izquierda: Productos */}
            <div className="lg:col-span-7 xl:col-span-8">
              {/* Encabezado de la tabla */}
              <div className="hidden md:flex border-b border-black pb-4 mb-6">
                <div className="w-1/2 font-vollkorn text-sm uppercase tracking-wider text-zariablack">Producto</div>
                <div className="w-1/6 font-vollkorn text-sm uppercase tracking-wider text-zariablack text-center">Cantidad</div>
                <div className="w-1/6 font-vollkorn text-sm uppercase tracking-wider text-zariablack text-right">Precio</div>
                <div className="w-1/6 font-vollkorn text-sm uppercase tracking-wider text-zariablack text-right">Subtotal</div>
              </div>
              
              {/* Lista de productos */}
              <div className="space-y-6">
                {cartItems.map(item => (
                  <div key={item.id} className="border border-black p-4 mb-6">
                    <div className="flex flex-col md:flex-row items-start">
                      {/* Imagen y detalles del producto */}
                      <div className="w-full md:w-1/2 flex items-start">
                        <div className="relative w-20 h-20 bg-white border border-black/10 mr-4 flex-shrink-0">
                          <Image 
                            src={item.image} 
                            alt={item.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <div className="flex-grow">
                          <h3 className="font-vollkorn text-base text-zariablack">{item.name}</h3>
                          <p className="font-univers-next text-xs text-zariablack/70 mt-1">{item.material}</p>
                          {item.length && (
                            <p className="font-univers-next text-xs text-zariablack/70">Longitud: {item.length}</p>
                          )}
                          
                          {/* Etiqueta de precio visible solo en móvil */}
                          <div className="flex items-center justify-between mt-2 md:hidden">
                            <span className="font-univers-next text-xs text-zariablack/70">Precio unitario:</span>
                            <span className="font-univers-next text-sm text-zariablack">
                              {formatPrice(item.price)}
                            </span>
                          </div>
                          
                          {/* Etiqueta de subtotal visible solo en móvil */}
                          <div className="flex items-center justify-between mt-1 md:hidden">
                            <span className="font-univers-next text-xs text-zariablack/70">Subtotal:</span>
                            <span className="font-univers-next text-sm font-medium text-zariablack">
                              {formatPrice(item.price * item.quantity)}
                            </span>
                          </div>
                          
                          {/* Envoltorio seleccionado (si aplica) */}
                          {item.selectedWrapping && (
                            <div className="mt-2 flex items-center">
                              <div className="w-3 h-3 mr-1 text-zaria-purple">
                                <GiftIcon />
                              </div>
                              <span className="font-univers-next text-xs text-zaria-purple">
                                {item.selectedWrapping.name} (+{formatPrice(item.selectedWrapping.price)})
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
                        
                        {/* Botón para eliminar en desktop - Ahora con texto */}
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
                        <span className="font-univers-next text-xs text-zariablack/70 md:hidden">Cantidad:</span>
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
                        onClick={() => toggleSection('giftWrapping')}
                        className="font-univers-next text-xs w-full flex items-center text-zariablack hover:text-zaria-hover-aquamarina transition-colors group"
                        whileHover={{ x: 2 }}
                      >
                        <div className="gift-box-wrapper relative mr-2">
                          <motion.div
                            animate={{ y: [0, -2, 0] }}
                            transition={{ 
                              duration: 1.5, 
                              repeat: Infinity,
                              repeatType: "reverse"
                            }}
                            className="w-4 h-4 text-zaria-purple"
                          >
                            <GiftIcon />
                            {item.selectedWrapping && (
                              <motion.div 
                                className="absolute -top-1 -right-1 w-1.5 h-1.5 bg-zaria-hover-aquamarina rounded-full"
                                animate={{ scale: [1, 1.2, 1] }}
                                transition={{ duration: 1, repeat: Infinity }}
                              />
                            )}
                          </motion.div>
                        </div>
                        <div className="flex flex-col">
                          <span className="text-xs font-medium">
                            {item.selectedWrapping ? 'Cambiar envoltorio premium' : 'Añadir envoltorio especial'}
                          </span>
                          <span className="text-[10px] text-zariablack/60">
                            Dale un toque especial a tu regalo
                          </span>
                        </div>
                        
                        <div className="ml-auto">
                          {expandedSections.giftWrapping ? (
                            <ChevronUp className="h-3 w-3 transition-transform duration-300" />
                          ) : (
                            <ChevronDown className="h-3 w-3 transition-transform duration-300" />
                          )}
                        </div>
                      </motion.button>
                      
                      <AnimatePresence>
                        {expandedSections.giftWrapping && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                            className="overflow-hidden"
                          >
                            <GiftWrappingSelector 
                              options={giftWrappingOptions}
                              selectedOption={item.selectedWrapping!}
                              onSelect={(option) => applyGiftWrapping(item.id, option)}
                              formatPrice={formatPrice}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
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
            
            {/* Columna derecha: Resumen y acciones */}
            <div className="lg:col-span-5 xl:col-span-4">
              <div className="bg-white border border-black p-6 sticky top-32">
                <h2 className="font-vollkorn text-lg mb-6 pb-4 border-b border-black">Resumen del pedido</h2>
                
                {/* Sección para calcular envío */}
                <div className="mb-6">
                  <button 
                    onClick={() => toggleSection('shipping')} 
                    className="w-full flex justify-between items-center pb-3 font-univers-next text-sm text-zariablack hover:text-zaria-hover-aquamarina transition-colors"
                  >
                    <div className="flex items-center">
                      <Truck className="h-4 w-4 mr-2" />
                      <span>Calcular envío</span>
                    </div>
                    {expandedSections.shipping ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {expandedSections.shipping && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden py-4 border-t border-black/10"
                      >
                        <ShippingCalculator 
                          options={shippingOptions} 
                          selectedOption={selectedShipping}
                          onSelect={setSelectedShipping}
                          formatPrice={formatPrice}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Sección para código promocional */}
                <div className="mb-6 border-t border-black/10 pt-4">
                  <button 
                    onClick={() => toggleSection('promoCode')} 
                    className="w-full flex justify-between items-center pb-3 font-univers-next text-sm text-zariablack hover:text-zaria-hover-aquamarina transition-colors"
                  >
                    <div className="flex items-center">
                      <CreditCard className="h-4 w-4 mr-2" />
                      <span>Código promocional</span>
                    </div>
                    {expandedSections.promoCode ? (
                      <ChevronUp className="h-4 w-4" />
                    ) : (
                      <ChevronDown className="h-4 w-4" />
                    )}
                  </button>
                  
                  <AnimatePresence>
                    {expandedSections.promoCode && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                        className="overflow-hidden pt-4 border-t border-black/10"
                      >
                        <PromoCodeInput 
                          value={promoCode} 
                          onChange={setPromoCode} 
                          onApply={applyPromoCode}
                          discount={promoDiscount}
                        />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
                
                {/* Resumen de costos - Movido debajo de las secciones de envío y promo */}
                <div className="border-t border-black pt-4 mb-6">
                  {/* Subtotal */}
                  <div className="flex justify-between mb-3">
                    <span className="font-univers-next text-sm text-zariablack">Subtotal</span>
                    <span className="font-univers-next text-sm text-zariablack">{formatPrice(subtotal)}</span>
                  </div>
                  
                  {/* Envoltorio premium (si aplica) */}
                  {wrappingTotal > 0 && (
                    <div className="flex justify-between mb-3">
                      <span className="font-univers-next text-sm text-zariablack">Envoltorios premium</span>
                      <span className="font-univers-next text-sm text-zariablack">{formatPrice(wrappingTotal)}</span>
                    </div>
                  )}
                  
                  {/* Descuento (si aplica) */}
                  {promoDiscount > 0 && (
                    <div className="flex justify-between mb-3">
                      <span className="font-univers-next text-sm text-zaria-hover-aquamarina">Descuento</span>
                      <span className="font-univers-next text-sm text-zaria-hover-aquamarina">-{formatPrice(discountAmount)}</span>
                    </div>
                  )}
                  
                  {/* Envío (si está seleccionado) */}
                  <div className="flex justify-between mb-3">
                    <span className="font-univers-next text-sm text-zariablack">Envío</span>
                    <span className="font-univers-next text-sm text-zariablack">
                      {selectedShipping ? formatPrice(shippingCost) : 'Calcular arriba'}
                    </span>
                  </div>
                  
                  {/* Total */}
                  <div className="flex justify-between pt-4 mt-3 border-t border-black">
                    <span className="font-vollkorn text-base text-zariablack">TOTAL</span>
                    <span className="font-vollkorn text-base text-zariablack">{formatPrice(total)}</span>
                  </div>
                </div>
                
                {/* Botón de checkout */}
                <motion.button
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                  className="w-full py-3 bg-zariablack text-white font-univers-next text-sm tracking-wide border border-zariablack transition-all duration-300 hover:bg-zaria-purple hover:border-zaria-purple"
                  onClick={() => {/* Navigate to checkout */}}
                >
                  FINALIZAR COMPRA
                </motion.button>
                
                {/* Texto de información */}
                <p className="font-univers-next text-[10px] text-zariablack/70 italic mt-4 text-center">
                  Impuestos incluidos. El envío se calcula en base a tu ubicación.
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}