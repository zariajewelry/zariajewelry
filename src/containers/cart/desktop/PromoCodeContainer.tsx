"use client";

import { useAppDispatch, useAppSelector } from "@/store/hook";
import {
  setPromoCode,
  applyPromo,
  togglePromoSection
} from "@/store/slices/promoSlice";
import PromoCodeSection from "@/components/cart/desktop/PromoCodeSection";

interface PromoCodeContainerProps {
  onDiscountChange: (discount: number) => void;
}

export default function PromoCodeContainer({
  onDiscountChange
}: PromoCodeContainerProps) {
  const dispatch = useAppDispatch();
  const { code, discount, isOpen } = useAppSelector(state => state.promo);
  
  // Handler para cambiar el código
  const handleChangeCode = (newCode: string) => {
    dispatch(setPromoCode(newCode));
  };
  
  // Handler para aplicar el código
  const handleApplyCode = (code: string) => {
    // En una app real, esto sería una llamada a API
    if (code.toUpperCase() === "ZARIA20") {
      const newDiscount = 0.2; // 20% de descuento
      dispatch(applyPromo(newDiscount));
      onDiscountChange(newDiscount);
      return true;
    }
    return false;
  };
  
  // Toggle para expandir/colapsar la sección
  const handleToggle = () => {
    dispatch(togglePromoSection());
  };
  
  return (
    <PromoCodeSection
      isExpanded={isOpen}
      onToggle={handleToggle}
      code={code}
      onChange={handleChangeCode}
      onApply={handleApplyCode}
      discount={discount}
    />
  );
}