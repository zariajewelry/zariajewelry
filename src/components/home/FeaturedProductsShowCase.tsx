"use client";

import FeaturedProductsCard from "./FeaturedProductsCard";

export default function FeaturedProductsShowcase() {
  return (
    <section className="bg-zariabg">
      <div className="w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 lg:gap-0 relative">
          <div className="min-h-[500px] md:min-h-[660px] lg:min-h-[620px] xl:min-h-[700px] 2xl:min-h-[800px] w-full">
            <FeaturedProductsCard
              title="Colección Oro"
              description="Descubre nuestra colección"
              imageUrl="https://www.wolfandmoon.com/cdn/shop/files/oyster-hoops-model-2_1296x.jpg?v=1741274548"
              linkUrl="/products?material=gold"
            />
          </div>

          <div className="hidden lg:block absolute h-full w-[1px] bg-black left-1/2 transform -translate-x-1/2"></div>

          <div className="md:hidden w-full h-[1px] bg-black"></div>

          <div className="min-h-[500px] md:min-h-[660px] lg:min-h-[620px] xl:min-h-[700px] 2xl:min-h-[800px] w-full">
            <FeaturedProductsCard
              title="Colección Plata"
              description="Elegancia y modernidad"
              imageUrl="https://www.wolfandmoon.com/cdn/shop/products/celestial-hoop-set-lifestyle-1_1296x.jpg?v=1643710839"
              linkUrl="/products?material=silver"
            />
          </div>
        </div>
      </div>
    </section>
  );
}
