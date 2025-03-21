"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { MoveRight } from "lucide-react";

export default function HomeNewsletterBanner() {
  const [email, setEmail] = useState("");
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Lógica de suscripción aquí
    console.log("Email submitted:", email);
    setEmail("");
  };

  return (
    <section className="w-full py-16 bg-zaria-purple">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
          {/* Columna izquierda: Texto y beneficios */}
          <div className="text-left">
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              viewport={{ once: true }}
              className="font-vollkorn text-zariablack text-base md:text-lg font-semibold tracking-widest mb-4"
            >
              ÚNETE A NUESTRA COMUNIDAD
            </motion.h2>
            
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              viewport={{ once: true }}
              className="font-univers-next text-zariablack text-sm font-normal mb-6 leading-relaxed"
            >
              Regístrate gratis y obtendrás...
            </motion.p>

            {/* Lista de beneficios */}
            <motion.ul
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
              className="space-y-3 font-univers-next text-zariablack text-sm"
            >
              <li className="flex items-start">
                <span className="mr-2 text-zariablack">✦</span>
                <span>Acceso anticipado a nuevas colecciones</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-zariablack">✦</span>
                <span>Promociones exclusivas</span>
              </li>
              <li className="flex items-start">
                <span className="mr-2 text-zariablack">✦</span>
                <span>Participación en nuestro sorteo mensual de tarjetas regalo</span>
              </li>
            </motion.ul>
          </div>

          {/* Columna derecha: Formulario */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            viewport={{ once: true }}
            className="md:pl-8"
          >
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="w-full">
                <label htmlFor="email" className="block mb-2 text-sm font-univers-next text-zariablack/90">
                  Email
                </label>
                
                {/* Input y botón en línea */}
                <div className="flex flex-col lg:flex-row items-start lg:items-end space-x-4">
                  <div className="flex-grow relative group w-full mb-3 lg:mb-0">
                    <input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="Introduce tu email"
                      required
                      className="w-full bg-transparent border-b border-zariablack/80 text-zariablack py-2 px-0 font-univers-next text-sm placeholder:text-zariablack/60 focus:outline-none focus:border-zariablack"
                    />
                    {/* Línea de foco animada */}
                    <span className="absolute bottom-0 left-0 w-full h-[1px] bg-zariablack scale-x-0 group-focus-within:scale-x-100 transition-transform duration-300 origin-left" />
                  </div>
                  
                  <motion.button
                    whileHover={{ x: 5 }}
                    whileTap={{ scale: 0.98 }}
                    transition={{ type: "spring", stiffness: 400, damping: 17 }}
                    type="submit"
                  >
                    <span className="inline-flex items-center font-univers-next text-sm lg:text-sm font-normal text-zariablack hover:text-zaria-hover-aquamarina group cursor-pointer">
                      <span className="relative flex items-center whitespace-nowrap">
                        <span>Suscribirme</span>
                        <MoveRight className="h-3 w-3 ml-1 transition-transform group-hover:translate-x-1" />
                        <span className="absolute -bottom-[3px] left-0 w-full h-[1px] bg-zariablack group-hover:bg-zaria-hover-aquamarina transition-colors"></span>
                      </span>
                    </span>
                  </motion.button>
                </div>
              </div>
              
              <p className="font-univers-next text-[10px] text-zariablack/70 mt-4">
                Al suscribirte, aceptas nuestra política de privacidad y consientes recibir actualizaciones.
              </p>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}