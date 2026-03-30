import React from 'react';
import TesseractBackground from "./TesseractBackground";
import { motion } from "framer-motion";

export default function ProblemSolutionSection() {
  return (
    <section className="relative w-full">
      {/* O Tesseract serve como o container principal desta seção */}
      <TesseractBackground className="py-20 md:py-32 flex items-center justify-center">
        <div className="container relative z-30 mx-auto px-4">
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-3xl md:text-5xl font-black text-center text-white mb-16 tracking-tighter"
          >
            A solução do seu problema <br className="hidden md:block" />
            na <span className="text-primary">palma da mão</span>
          </motion.h2>

          {/* Problema e Solução Visual (Mockup) */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="mb-16 flex justify-center"
          >
            <div className="relative p-2 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
              <img 
                src="./f5.jpg"
                alt="Problema vs Solução"
                className="w-[500px] max-w-full rounded-2xl shadow-2xl relative z-10"
              />
              {/* Brilho suave atrás da imagem */}
              <div className="absolute -inset-4 bg-primary/20 blur-3xl rounded-full z-0 opacity-30" />
            </div>
          </motion.div>

          {/* Grid de Conteúdo com Efeito Glass */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-6xl mx-auto">
            
            {/* Bloco do Problema */}
            <motion.div 
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group p-8 rounded-3xl bg-black/40 border border-white/5 backdrop-blur-xl shadow-lg border-l-4 border-l-red-500/50 hover:border-l-red-500 transition-all duration-500"
            >
              <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                <span className="p-2 bg-red-500/10 rounded-lg text-red-500 text-sm">01</span>
                O Problema
              </h3>
              <p className="text-gray-300 leading-relaxed mb-4 text-lg">
                Cansado de planilhas complexas ou de ver o saldo sumir antes do dia 20?
              </p>
              <p className="text-gray-400 leading-relaxed font-light">
                A categoria <span className="font-bold text-red-400">'Outros'</span> é o maior inimigo do seu bolso. Você gasta sem saber exatamente com o quê, e no final do mês não consegue entender para onde foi seu dinheiro.
              </p>
            </motion.div>

            {/* Bloco da Solução */}
            <motion.div 
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              className="group p-8 rounded-3xl bg-black/40 border border-white/5 backdrop-blur-xl shadow-lg border-l-4 border-l-primary/50 hover:border-l-primary transition-all duration-500"
            >
              <h3 className="text-2xl font-black text-white mb-4 flex items-center gap-3">
                <span className="p-2 bg-primary/10 rounded-lg text-primary text-sm">02</span>
                A Solução
              </h3>
              <p className="text-gray-300 leading-relaxed mb-6 text-lg">
                Nós unimos a <span className="font-bold text-primary">teoria com a prática</span>.
              </p>
              <ul className="space-y-4">
                <li className="flex items-center gap-4 group/item">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover/item:scale-110 transition-transform">
                    📚
                  </div>
                  <span className="text-gray-300 text-sm md:text-base">O <span className="font-bold text-white uppercase tracking-wider text-xs bg-white/5 px-2 py-1 rounded">Ebook</span> ensina a mentalidade certa</span>
                </li>
                <li className="flex items-center gap-4 group/item">
                  <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover/item:scale-110 transition-transform">
                    ⚙️
                  </div>
                  <span className="text-gray-300 text-sm md:text-base">O <span className="font-bold text-white uppercase tracking-wider text-xs bg-white/5 px-2 py-1 rounded">App</span> fornece a execução automática</span>
                </li>
              </ul>
            </motion.div>

          </div>
        </div>
      </TesseractBackground>
    </section>
  );
}

