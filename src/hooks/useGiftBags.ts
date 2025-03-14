import { GiftBag } from '@/types/cart';
import { useState } from 'react';



export function useGiftBags() {
  const [bags, setBags] = useState<GiftBag[]>([
    {
      id: 1,
      name: "¡Quiero una bolsa elegante!",
      description: "Bolsa premium con diseño sofisticado y lazo de satén",
      price: 0,
      selected: false,
      image: "https://ar.isadoraonline.com/media/catalog/product/4/5/45389802_0_1_20230303210200.jpg?quality=75&bg-color=255,255,255&fit=bounds&height=985&width=770&canvas=770:985",
    },
    {
      id: 2,
      name: "¡Quiero una caja de regalo!",
      description: "Caja forrada en tela con acabado sedoso",
      price: 380,
      selected: false,
      image: "https://ar.isadoraonline.com/media/catalog/product/4/5/45389802_0_1_20230303210200.jpg?quality=75&bg-color=255,255,255&fit=bounds&height=985&width=770&canvas=770:985",
    },
    {
      id: 3,
      name: "¡Quiero un envoltorio especial!",
      description: "Papel de seda y cinta personalizada ZARIA",
      price: 190,
      selected: false,
      image: "/https://ar.isadoraonline.com/media/catalog/product/4/5/45389802_0_1_20230303210200.jpg?quality=75&bg-color=255,255,255&fit=bounds&height=985&width=770&canvas=770:985",
    },
  ]);
  
  const [isOpen, setIsOpen] = useState(false);
  const [currentBag, setCurrentBag] = useState(0);


  const toggleOpen = () => {
    setIsOpen(!isOpen);
  };


  const toggleGiftBag = (bagId: number) => {
    setBags(prevBags =>
      prevBags.map(bag =>
        bag.id === bagId
          ? { ...bag, selected: !bag.selected }
          : { ...bag, selected: false } 
      )
    );
  };


  const nextBag = () => {
    setCurrentBag((prev) => (prev === bags.length - 1 ? 0 : prev + 1));
  };

  const previousBag = () => {
    setCurrentBag((prev) => (prev === 0 ? bags.length - 1 : prev - 1));
  };


  const selectedBag = bags.find(bag => bag.selected);
  
  const giftBagCost = selectedBag ? selectedBag.price : 0;

  return {
    bags,
    currentBag,
    selectedBag,
    giftBagCost,
    isOpen,
    setCurrentBag,
    toggleGiftBag,
    toggleOpen,
    nextBag,
    previousBag
  };
}