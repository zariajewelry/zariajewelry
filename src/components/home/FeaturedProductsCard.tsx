"use client";

import Image from "next/image";
import Link from "next/link";
import { MoveRight } from "lucide-react";
import { motion } from "framer-motion";

interface CategoryCardProps {
  title: string;
  description: string;
  imageUrl: string;
  linkUrl: string;
}

export default function FeaturedProductsCard({
  title,
  description,
  imageUrl,
  linkUrl,
}: CategoryCardProps) {
  return (
    <div className="bg-zariabg relative isolate h-full flex flex-col">
      <div className="relative pt-[15px] px-[15px] overflow-hidden flex-grow">
        <div className="relative w-full h-full overflow-hidden bg-zariabg">
          <Image
            src={imageUrl}
            alt={title}
            fill
            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 50vw"
            className="object-cover transition-all duration-700 hover:scale-[1.08] z-10"
            priority
          />
        </div>
      </div>

      <div className="px-5 py-0 pt-5 lg:p-5 bg-zariabg">
        <h3 className="font-vollkorn font-semibold text-sm lg:text-lg text-zariablack tracking-widest leading-tight text-left mb-2 pt-2">
          {title.toLocaleUpperCase()}
        </h3>
        
        <p className="text-xs lg:text-sm font-univers-next font-normal text-zariablack mb-2">
          {description}
        </p>
        
        <motion.div
          whileHover={{ x: 5 }}
          whileTap={{ scale: 0.98 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          className="pb-2"
        >
          <Link 
            href={linkUrl}
            className="inline-flex items-center font-univers-next text-sm lg:text-sm text-zariablack hover:text-zaria-hover-aquamarina transition-colors border-b border-black pb-0.5 hover:border-zaria-hover-aquamarina"
          >
            SHOP <MoveRight className="h-3 w-3 ml-1" />
          </Link>
        </motion.div>
      </div>
    </div>
  );
}