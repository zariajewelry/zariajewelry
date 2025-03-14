"use client";


import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface GiftBag {
  id: number;
  name: string;
  description: string;
  price: number;
  selected: boolean;
  image: string;
}

interface GiftBagSectionProps {
  bags: GiftBag[];
  currentBag: number;
  isOpen: boolean;
  onToggle: () => void;
  onSelectBag: (bag: GiftBag) => void;
  onChangeBag: (index: number) => void;
}

export default function GiftBagSection({
  bags,
  currentBag,
  isOpen,
  onToggle,
  onSelectBag,
  onChangeBag,
}: GiftBagSectionProps) {
  // Formatear precios
  const formatPrice = (price: number) => {
    return `${price.toFixed(2)}€`;
  };
  
  // Funciones para manejar navegación
  const handlePrevBag = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex = currentBag === 0 ? bags.length - 1 : currentBag - 1;
    onChangeBag(newIndex);
  };
  
  const handleNextBag = (e: React.MouseEvent) => {
    e.stopPropagation();
    const newIndex = currentBag === bags.length - 1 ? 0 : currentBag + 1;
    onChangeBag(newIndex);
  };

  return (
    <>
      {/* Toggle Button - NOTEBOOK SUPER COMPACT */}
      <button
        onClick={onToggle}
        className="flex items-center justify-between w-full text-left cursor-pointer"
        aria-expanded={isOpen}
        aria-controls="gift-bag-options"
      >
        <div className="flex items-center">
          <Image
            src="/svg/gift-icon.svg"
            alt="Regalo"
            width={20}
            height={20}
            className="w-4 h-4 sm:w-5 sm:h-5 lg:w-3.5 lg:h-3.5 2xl:w-5 2xl:h-5 mr-2 sm:mr-3"
          />
          <div>
            <span className="font-serif text-xs sm:text-sm lg:text-[10px] 2xl:text-sm tracking-wide">
              Agregar bolsa de regalo
            </span>
            <p className="text-[10px] sm:text-[11px] lg:text-[8px] 2xl:text-[11px] text-gray-500 mt-0.5 lg:mt-0 2xl:mt-0.5">
              Empaca tu compra con una presentación elegante
            </p>
          </div>
        </div>
        <div
          className={`transition-transform duration-300 ${
            isOpen ? "rotate-180" : ""
          }`}
        >
          <svg
            width="16"
            height="16"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6 9L12 15L18 9"
              stroke="currentColor"
              strokeWidth="1.5"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </div>
      </button>

      {/* Gift Bag Carousel - NOTEBOOK SMALLER HEIGHT */}
      <div
        id="gift-bag-options"
        className={`transition-all duration-300 ease-in-out overflow-hidden ${
          isOpen
            ? "max-h-[150px] sm:max-h-[160px] lg:max-h-[100px] 2xl:max-h-[160px] opacity-100 mt-3 lg:mt-1 2xl:mt-4"
            : "max-h-0 opacity-0"
        }`}
      >
        <div className="relative">
          {/* Fixed-size carousel with notebook height */}
          <div className="mx-0 h-[90px] sm:h-[100px] lg:h-[65px] 2xl:h-[110px] overflow-hidden relative">
            <div
              className="flex transition-transform duration-300 ease-in-out absolute w-full h-full"
              style={{
                transform: `translateX(-${currentBag * 100}%)`,
              }}
            >
              {bags.map((bag) => (
                <div
                  key={bag.id}
                  className="w-full h-full flex-shrink-0 flex items-center"
                >
                  <div className="bg-gray-50 rounded-2xl p-3 sm:p-5 lg:p-5 2xl:p-5 flex items-center shadow-sm w-full relative">
                    {/* Left Navigation Arrow - SMALLER FOR NOTEBOOKS */}
                    <button
                      onClick={handlePrevBag}
                      className="absolute cursor-pointer left-2 top-1/2 -translate-y-1/2 z-20 w-6 h-6 sm:w-7 sm:h-7 lg:w-5 lg:h-5 2xl:w-7 2xl:h-7 flex items-center justify-center lg:rounded-full lg:bg-white lg:shadow-sm hover:bg-gray-100 transition-colors"
                      aria-label="Bolsa anterior"
                    >
                      <ChevronLeft className="w-4 h-4 sm:w-5 sm:h-5 lg:w-3 lg:h-3 2xl:w-5 2xl:h-5" />
                    </button>

                    {/* Left: Image with adaptive size - SMALLER FOR NOTEBOOKS */}
                    <div className="w-[60px] h-[60px] sm:w-[75px] sm:h-[75px] lg:w-[50px] lg:h-[50px] 2xl:w-[75px] 2xl:h-[75px] flex-shrink-0 relative rounded-lg overflow-hidden bg-white border border-gray-100 ml-6 sm:ml-6 lg:ml-4 2xl:ml-6">
                      <Image
                        src={bag.image}
                        alt="Bolsa de regalo"
                        fill
                        className="object-contain p-1 sm:p-2"
                      />
                    </div>

                    {/* Middle: Extra compact text for notebooks */}
                    <div className="flex-1 px-2 min-w-0 flex flex-col justify-center">
                      <h4 className="font-serif text-xs lg:text-[9px] 2xl:text-xs font-semibold">
                        {bag.name.length > 20 ? "¡Quiero una bolsa!" : bag.name}
                      </h4>
                      <span className="font-medium text-[10px] sm:text-xs lg:text-[8px] 2xl:text-xs block mt-0.5 lg:mt-0 2xl:mt-0.5">
                        {formatPrice(bag.price)}
                      </span>
                    </div>

                    {/* Right: Action button - Extra compact for notebooks */}
                    <button
                      onClick={() => onSelectBag(bag)}
                      className={`px-2 sm:px-3 lg:px-1.5 2xl:px-3 py-1 sm:py-1.5 lg:py-0.5 2xl:py-1.5 rounded-md text-[10px] sm:text-xs lg:text-[8px] 2xl:text-xs whitespace-nowrap cursor-pointer ${
                        bag.selected
                          ? "bg-gray-200 text-gray-800 hover:bg-gray-300"
                          : "bg-black text-white hover:bg-zaria"
                      } transition-colors duration-300 mr-6 sm:mr-6 lg:mr-4 2xl:mr-6`}
                    >
                      {bag.selected ? "Quitar" : "Agregar"}
                    </button>

                    {/* Right Navigation Arrow - SMALLER FOR NOTEBOOKS */}
                    <button
                      onClick={handleNextBag}
                      className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-6 h-6 sm:w-7 sm:h-7 lg:w-5 lg:h-5 2xl:w-7 2xl:h-7 flex items-center justify-center cursor-pointer lg:rounded-full lg:bg-white lg:shadow-sm hover:bg-gray-100 transition-colors"
                      aria-label="Bolsa siguiente"
                    >
                      <ChevronRight className="w-4 h-4 sm:w-5 sm:h-5 lg:w-3 lg:h-3 2xl:w-5 2xl:h-5" />
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Pagination Dots - Even closer for notebooks */}
          <div className="flex justify-center mt-2 sm:mt-3 lg:mt-0.5 2xl:mt-3 gap-1.5">
            {bags.map((_, index) => (
              <button
                key={index}
                onClick={() => onChangeBag(index)}
                className={`w-1.5 h-1.5 sm:w-2 sm:h-2 lg:w-1 lg:h-1 2xl:w-2 2xl:h-2 rounded-full transition-colors ${
                  index === currentBag ? "bg-zaria" : "bg-gray-300"
                }`}
                aria-label={`Ver bolsa ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </div>
    </>
  );
}