"use client";

import { useState } from "react";
import { useAppDispatch, useAppSelector } from "@/store/hook";
import { toggleGiftBagSection, nextBag, previousBag, toggleGiftBag } from "@/store/slices/giftBagSlice";
import GiftBagSection from "@/components/cart/sidebar/sections/GiftBagSection";

interface GiftBag {
  id: number;
  name: string;
  description: string;
  price: number;
  selected: boolean;
  image: string;
}

interface GiftBagContainerProps {
  // Si se proporciona, usará estado local en lugar de Redux
  useLocalState?: boolean;
  initialBags?: GiftBag[];
}

export default function GiftBagContainer({ 
  useLocalState = false,
  initialBags
}: GiftBagContainerProps) {
  // Estado local para cuando no usamos Redux
  const [localBags, setLocalBags] = useState<GiftBag[]>(initialBags || []);
  const [localCurrentBag, setLocalCurrentBag] = useState(0);
  const [localIsOpen, setLocalIsOpen] = useState(false);
  
  // Redux state
  const dispatch = useAppDispatch();
  const { bags, currentBagIndex, isOpen } = useAppSelector(state => state.giftBag);
  
  // Handlers para estado local
  const handleLocalToggle = () => {
    setLocalIsOpen(!localIsOpen);
  };
  
  const handleLocalSelectBag = (bag: GiftBag) => {
    setLocalBags(localBags.map(item => ({
      ...item,
      selected: item.id === bag.id ? !item.selected : false
    })));
  };
  
  const handleLocalChangeBag = (index: number) => {
    setLocalCurrentBag(index);
  };
  
  // Handlers para Redux - CORREGIDOS PARA USAR LAS ACCIONES EXISTENTES
  const handleReduxToggle = () => {
    dispatch(toggleGiftBagSection());
  };
  
  const handleReduxSelectBag = (bag: GiftBag) => {
    dispatch(toggleGiftBag(bag.id)); // Cambiado a toggleGiftBag
  };
  
  const handleReduxChangeBag = (index: number) => {
    // Determinamos si debemos avanzar o retroceder en el carrusel
    if (index > currentBagIndex) {
      // Si queremos ir hacia adelante
      dispatch(nextBag());
    } else if (index < currentBagIndex) {
      // Si queremos ir hacia atrás
      dispatch(previousBag());
    }
    // Si index === currentBagIndex, no necesitamos hacer nada
  };
  
  // Decide qué props pasar basado en si estamos usando estado local o Redux
  const sectionProps = useLocalState 
    ? {
        bags: localBags,
        currentBag: localCurrentBag,
        isOpen: localIsOpen,
        onToggle: handleLocalToggle,
        onSelectBag: handleLocalSelectBag,
        onChangeBag: handleLocalChangeBag
      }
    : {
        bags,
        currentBag: currentBagIndex,
        isOpen,
        onToggle: handleReduxToggle,
        onSelectBag: handleReduxSelectBag,
        onChangeBag: handleReduxChangeBag
      };
  
  return <GiftBagSection {...sectionProps} />;
}