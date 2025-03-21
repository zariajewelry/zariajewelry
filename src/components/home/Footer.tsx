"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import { motion } from "framer-motion";
import { MoveRight, Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
  const [email, setEmail] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log("Email submitted:", email);
    setEmail("");
  };

  return (
    <footer className="bg-zariabg w-full border-t border-black">
      <div className="w-full mx-auto">
        {/* Sección principal del footer */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y md:divide-y-0 ">
          {/* Columna 1: Marca */}
          <div className="p-8 md:p-10">
            <h5 className="font-vollkorn font-semibold text-sm tracking-widest mb-6 text-zariablack">
              ZARIA JEWELRY
            </h5>
            <p className="font-univers-next text-xs text-zariablack mb-6 leading-relaxed">
              Diseños que trascienden las tendencias, creados para quienes ven en la joyería una expresión única de estilo y personalidad.
            </p>
            <div className="flex space-x-5">
              <motion.a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                aria-label="Instagram"
              >
                <Instagram className="w-4 h-4 text-zariablack hover:text-zaria-hover-aquamarina transition-colors" />
              </motion.a>
              <motion.a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                aria-label="Facebook"
              >
                <Facebook className="w-4 h-4 text-zariablack hover:text-zaria-hover-aquamarina transition-colors" />
              </motion.a>
              <motion.a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ y: -3 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                aria-label="Twitter"
              >
                <Twitter className="w-4 h-4 text-zariablack hover:text-zaria-hover-aquamarina transition-colors" />
              </motion.a>
            </div>
          </div>

          {/* Columna 2: Colecciones */}
          <div className="p-8 md:p-10">
            <h5 className="font-vollkorn font-semibold text-sm tracking-widest mb-6 text-zariablack">
              COLECCIONES
            </h5>
            <ul className="space-y-3">
              {["Oro", "Plata", "Piedras Preciosas", "Pendientes", "Anillos", "Pulseras"].map((item) => (
                <li key={item}>
                  <Link 
                    href={`/products?collection=${item.toLowerCase()}`}
                    className="font-univers-next text-xs text-zariablack hover:text-zaria-hover-aquamarina transition-colors group flex items-center"
                  >
                    <span className="relative">
                      {item}
                      <span className="absolute -bottom-[3px] left-0 w-0 h-[1px] bg-zaria-hover-aquamarina group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 3: Información */}
          <div className="p-8 md:p-10">
            <h5 className="font-vollkorn font-semibold text-sm tracking-widest mb-6 text-zariablack">
              INFORMACIÓN
            </h5>
            <ul className="space-y-3">
              {[
                { name: "Sobre Nosotros", path: "/about" },
                { name: "Contacto", path: "/contact" },
                { name: "FAQs", path: "/faqs" },
                { name: "Envíos & Devoluciones", path: "/shipping" },
                { name: "Cuidado de Joyas", path: "/care" },
                { name: "Términos & Condiciones", path: "/terms" }
              ].map((item) => (
                <li key={item.name}>
                  <Link 
                    href={item.path}
                    className="font-univers-next text-xs text-zariablack hover:text-zaria-hover-aquamarina transition-colors group flex items-center"
                  >
                    <span className="relative">
                      {item.name}
                      <span className="absolute -bottom-[3px] left-0 w-0 h-[1px] bg-zaria-hover-aquamarina group-hover:w-full transition-all duration-300"></span>
                    </span>
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Columna 4: Newsletter (versión reducida) */}
          <div className="p-8 md:p-10">
            <h5 className="font-vollkorn font-semibold text-sm tracking-widest mb-6 text-zariablack">
              NEWSLETTER
            </h5>
            <p className="font-univers-next text-xs text-zariablack mb-4 leading-relaxed">
              Recibe las novedades y ofertas exclusivas directamente en tu bandeja de entrada.
            </p>
            <form onSubmit={handleSubmit} className="mb-6">
              <div className="relative group mb-4">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Email"
                  required
                  className="w-full bg-transparent border-b border-black py-2 px-0 font-univers-next text-xs placeholder:text-zariablack/60 focus:outline-none text-zariablack"
                />
                <span className="absolute bottom-0 left-0 w-full h-[1px] bg-zaria-hover-aquamarina scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-left" />
              </div>

              <motion.button
                whileHover={{ x: 5 }}
                whileTap={{ scale: 0.98 }}
                transition={{ type: "spring", stiffness: 400, damping: 17 }}
                type="submit"
                className="flex items-center font-univers-next text-xs text-zariablack hover:text-zaria-hover-aquamarina group"
              >
                <span className="relative">
                  Suscribirme
                  <MoveRight className="inline-block h-3 w-3 ml-1 transition-transform group-hover:translate-x-1" />
                  <span className="absolute -bottom-[3px] left-0 w-full h-[1px] bg-zariablack group-hover:bg-zaria-hover-aquamarina transition-colors"></span>
                </span>
              </motion.button>
            </form>
            
            <div className="mt-4">
              <p className="font-univers-next text-[10px] text-zariablack/70">
                © {new Date().getFullYear()} Zaria Jewelry. Todos los derechos reservados.
              </p>
            </div>
          </div>
        </div>
        
        {/* Footer bottom con logo de métodos de pago */}
        <div className="border-t border-black p-6 flex flex-col md:flex-row justify-between items-center">
          <p className="font-univers-next text-[10px] text-zariablack/70 mb-4 md:mb-0">
            Diseñado con amor en España
          </p>
          
          <div className="flex items-center space-x-3">
            <Image src="/visa.svg" alt="Visa" width={32} height={20} />
            <Image src="/mastercard.svg" alt="Mastercard" width={32} height={20} />
            <Image src="/amex.svg" alt="American Express" width={32} height={20} />
            <Image src="/paypal.svg" alt="PayPal" width={32} height={20} />
          </div>
        </div>
      </div>
    </footer>
  );
}