"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  calculateShipping,
  toggleShippingSection
} from "@/store/slices/shippingSlice";
import { ShippingOption } from "@/types/cart";
import ShippingSection from "@/components/cart/desktop/ShippingSection";

interface ShippingCalculatorContainerProps {
  formatPrice: (price: number) => string;
  onShippingCostChange: (cost: number) => void;
}

export default function ShippingCalculatorContainer({
  formatPrice,
  onShippingCostChange
}: ShippingCalculatorContainerProps) {
  const dispatch = useAppDispatch();
  const { isOpen } = useAppSelector(state => state.shipping);
  
  // Estado local para la opción seleccionada
  const [selectedShipping, setSelectedShipping] = useState<ShippingOption | null>(null);
  
  // Opciones de envío (podrían venir de una API en una app real)
  const shippingOptions: ShippingOption[] = [
    {
      id: "standard",
      name: "Envío Estándar",
      description: "Entrega a domicilio",
      price: 0,
      estimatedDelivery: "3-5 días hábiles",
    },
    {
      id: "express",
      name: "Envío Express",
      description: "Entrega prioritaria",
      price: 1200,
      estimatedDelivery: "1-2 días hábiles",
    },
    {
      id: "same-day",
      name: "Entrega en el Día",
      description: "Solo CABA",
      price: 1800,
      estimatedDelivery: "Hoy (pedidos antes de las 12hs)",
    },
  ];
  
  // Handler para seleccionar opción de envío
  const handleSelectShipping = (option: ShippingOption) => {
    setSelectedShipping(option);
    dispatch(calculateShipping({ 
      cost: option.price, 
      isFreeShipping: option.price === 0 
    }));
    onShippingCostChange(option.price);
  };
  
  // Toggle para expandir/colapsar la sección
  const handleToggle = () => {
    dispatch(toggleShippingSection());
  };
  
  return (
    <ShippingSection
      isExpanded={isOpen}
      onToggle={handleToggle}
      options={shippingOptions}
      selectedOption={selectedShipping}
      onSelectOption={handleSelectShipping}
      formatPrice={formatPrice}
    />
  );
}