"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import ProductCard from "./ProductCard";
import { Product } from "@/types/products";
import { generateProducts } from "./productsGrid";
import { MoveRight } from "lucide-react";
import Link from "next/link";

export default function FeaturedProducts() {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);

  useEffect(() => {
    // En un entorno real, estos vendrían de una API o de Redux
    // Usando los mock datos existentes para consistencia
    const allProducts = generateProducts(50);

    // Seleccionamos productos "destacados" - en este caso: bestsellers o nuevos
    const featured = allProducts
      .filter((product) => product.isBestseller || product.isNew)
      .sort(() => 0.5 - Math.random()) // Mezclamos aleatoriamente
      .slice(0, 10); // Tomamos los primeros 10

    setFeaturedProducts(featured);
  }, []);

  return (
    <section className="py-12 bg-zariabg w-full">
      {/* Encabezado de sección */}
      <div className="mb-10 text-center">
        <h2 className="font-vollkorn font-semibold text-lg lg:text-xl text-zariablack tracking-widest leading-tight">
          PRODUCTOS DESTACADOS
        </h2>
      </div>

      <div className="w-full grid grid-cols-2 lg:grid-cols-5 gap-0 border-t border-black">
        {featuredProducts.map((product, index) => {
          const isLastInMobileRow = (index + 1) % 2 === 0;
          const isLastInTabletRow = (index + 1) % 3 === 0;
          const isLastInDesktopRow = (index + 1) % 5 === 0;
          const isLastItem = index === featuredProducts.length - 1;

          const showRightBorder =
            !isLastInMobileRow && !isLastItem && !isLastInDesktopRow;
          const showRightBorderTablet =
            isLastInMobileRow && !isLastInTabletRow && !isLastItem;
          const showRightBorderDesktop =
            isLastInTabletRow && !isLastInDesktopRow && !isLastItem;

          return (
            <div
              key={`featured-${product.id}`}
              className={`
          border-b border-black
          ${showRightBorder ? "border-r sm:border-r border-black" : ""} 
          ${showRightBorderTablet ? "md:border-r border-black" : ""}
          ${showRightBorderDesktop ? "lg:border-r border-black" : ""}
        `}
            >
              <ProductCard product={product} index={index} />
            </div>
          );
        })}
      </div>


      <div className="mt-10 text-center">
        <motion.div
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="inline-block"
        >
          <Link
            href="/products"
            className="inline-flex items-center font-univers-next text-xs sm:text-sm text-zariablack hover:text-zaria-hover-aquamarina transition-colors border-b border-black pb-0.5 hover:border-zaria-hover-aquamarina"
          >
            VER TODOS LOS PRODUCTOS <MoveRight className="w-3 h-3 sm:h-4 sm:w-4 ml-1" />
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
