"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";

export default function HomeStoryBanner() {
  return (
    <section className="w-full h-[265px] bg-[#AFB972] flex items-center justify-center mt-7 lg:mt-0">
      <div className="max-w-3xl mx-auto text-center px-6">
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          viewport={{ once: true }}
          className="font-vollkorn text-zariablack text-sm md:text-lg font-bold tracking-wide mb-4"
        >
          ANYTHING BUT ORDINARY
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          viewport={{ once: true }}
          className="font-univers-next text-zariablack text-sm md:text-sm font-normal mb-8 max-w-xl mx-auto leading-relaxed"
        >
          Playful jewellery & accessories, designed to stand out.
          <br />
          Handmade in London, since 2009.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          viewport={{ once: true }}
          className="inline-block"
        >
          <Link href="/about">
            <span className="inline-flex items-center font-univers-next text-sm font-normal text-zariablack hover:text-zaria-hover-aquamarina group cursor-pointer">
              <span className="relative flex items-center">
                <span>OUR STORY</span>
                <MoveRight className="h-3 w-3 ml-1 transition-transform group-hover:translate-x-1" />
                <span className="absolute -bottom-[3px] left-0 w-full h-[1px] bg-zariablack group-hover:bg-zaria-hover-aquamarina transition-colors"></span>
              </span>
            </span>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
