"use client";

import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";

export default function CategoryCard({ title, imageUrl, linkUrl }: {
  title: string;
  imageUrl: string;
  linkUrl: string;
}) {
  return (
    <div className="relative h-full w-full flex flex-col">
      <div className="relative overflow-hidden flex-grow px-[15px] pt-[15px]">
        {/* Contenedor interno con altura reducida (90% en lugar de h-full) */}
        <div className="relative w-full h-[99%] overflow-hidden bg-zariabg">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 25vw, 25vw"
            className="object-cover transition-all duration-700 hover:scale-[1.08] z-10"
            priority
          />
        </div>
      </div>

      {/* Contenedor de texto más limpio */}
      <div className="px-4 py-5 flex flex-col items-start justify-center bg-zariabg min-h-[110px]">
        <h3 className="font-vollkorn font-semibold tracking-widest text-sm md:text-base lg:text-lg text-zariablack leading-tight text-left mb-3">
          {title.toUpperCase()}
        </h3>
        
        <motion.div
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="pb-1"
        >
          <Link 
            href={linkUrl}
            className="inline-flex items-center font-univers-next text-xs md:text-sm text-zariablack hover:text-zaria-hover-aquamarina transition-colors border-b border-black pb-0.5 hover:border-zaria-hover-aquamarina"
          >
            SHOP ALL <MoveRight className="h-3 w-3 ml-1" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}