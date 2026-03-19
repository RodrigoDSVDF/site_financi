import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Conteúdo */}
          <div className="space-y-6 text-center md:text-left">
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
              Recupere o controle do seu dinheiro
            </h1>
            
            <p className="text-lg sm:text-xl text-gray-300 leading-relaxed">
              Pare de se perguntar para onde ele foi.
            </p>

            <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 p-5 sm:p-6 rounded-lg backdrop-blur-sm">
              <p className="text-gray-100 font-medium text-sm sm:text-base">
                <span className="text-cyan-400 font-bold">O método definitivo</span> para organizar suas finanças (Ebook) aliado à <span className="text-green-400 font-bold">ferramenta que automatiza sua rotina</span> (App). Tudo o que você precisa em um só lugar.
              </p>
            </div>

            {/* Botão Principal com Correção para Mobile */}
            <div className="flex justify-center md:justify-start">
              <Button 
                asChild
                className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-bold px-4 sm:px-8 py-6 sm:py-7 text-base sm:text-lg rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/50 hover:scale-105 flex items-center justify-center gap-2 h-auto min-h-[64px]"
              >
                <a 
                  href="https://pay.cakto.com.br/xxienb8_809928" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="whitespace-normal sm:whitespace-nowrap text-center leading-tight flex items-center justify-center gap-2"
                >
                  <span>Quero meu Combo de Liberdade Financeira</span>
                  <ArrowRight className="w-5 h-5 shrink-0" />
                </a>
              </Button>
            </div>

            <p className="text-xs sm:text-sm text-gray-400">
              ✓ Acesso imediato • ✓ Garantia de 7 dias • ✓ Sem compromisso
            </p>
          </div>

          {/* Imagem */}
          <div className="flex justify-center mt-8 md:mt-0">
            <div className="relative w-full max-w-[320px] sm:max-w-md">
              <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg blur-2xl opacity-20"></div>
              <img 
                src="./f6.png"
                alt="Ebook e App de Finanças"
                className="w-full h-auto rounded-lg shadow-2xl relative z-10"
              />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
