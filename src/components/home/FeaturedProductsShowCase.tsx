"use client";

import FeaturedProductsCard from "./FeaturedProductsCard";

export default function FeaturedProductsShowcase() {
  return (
    <section className="bg-zariabg">
      <div className="w-full">
        {/* En móvil: apiladas con una línea horizontal entre ellas
            En desktop: lado a lado con línea vertical */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-0 relative">
          {/* Primera tarjeta */}
          <div className="h-[550px] md:h-[650px] w-full">
            <FeaturedProductsCard
              title="Colección Oro"
              description="Descubre nuestra exclusiva colección de piezas de oro, diseñadas para momentos especiales."
              imageUrl="https://www.wolfandmoon.com/cdn/shop/files/oyster-hoops-model-2_1296x.jpg?v=1741274548"
              linkUrl="/products?material=gold"
            />
          </div>
          
          {/* Línea divisoria vertical (solo desktop) */}
          <div className="hidden md:block absolute h-full w-[1px] bg-black left-1/2 transform -translate-x-1/2"></div>
          
          {/* Línea divisoria horizontal (solo móvil) */}
          <div className="md:hidden w-full h-[1px] bg-black my-3"></div>
          
          {/* Segunda tarjeta */}
          <div className="h-[550px] md:h-[650px] w-full">
            <FeaturedProductsCard
              title="Colección Plata"
              description="Elegancia y modernidad en nuestra selección de joyas de plata para el día a día."
              imageUrl="https://www.wolfandmoon.com/cdn/shop/products/celestial-hoop-set-lifestyle-1_1296x.jpg?v=1643710839"
              linkUrl="/products?material=silver"
            />
          </div>
        </div>
      </div>
    </section>
  );
}