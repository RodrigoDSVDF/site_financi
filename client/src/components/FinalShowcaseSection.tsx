import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export default function FinalShowcaseSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-900 to-gray-950">
      <div className="container mx-auto px-4">
        {/* Imagem em destaque */}
        <div className="mb-12 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 to-blue-600 rounded-lg blur-3xl opacity-10"></div>
          <img 
            src="./showcase.png"
            alt="Dashboard Financeiro - Seu dinheiro em equilíbrio"
            className="w-[600px] max-w-full mx-auto rounded-lg shadow-2xl relative z-10"
          />
        </div>

        {/* CTA Final */}
        <div className="text-center space-y-6 max-w-3xl mx-auto">
          <h2 className="text-3xl md:text-4xl font-bold text-white">
            Pronto para transformar suas finanças?
          </h2>
          
          <p className="text-xl text-gray-300 leading-relaxed">
            Não espere mais um dia sequer. Comece sua jornada para a liberdade financeira agora mesmo com nosso combo completo de Ebook + App.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button 
              className="bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-bold px-8 py-6 text-lg rounded-lg transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/50 hover:scale-105 inline-flex items-center justify-center gap-2"
            >
              Quero meu Combo Agora
              <ArrowRight className="w-5 h-5" />
            </Button>
            
            <Button 
              variant="outline"
              className="border-2 border-cyan-500 text-cyan-400 hover:bg-cyan-500/10 font-bold px-8 py-6 text-lg rounded-lg transition-all duration-300"
            >
              Saber Mais
            </Button>
          </div>

          <p className="text-sm text-gray-500 pt-4">
            ✓ Garantia de 7 dias • ✓ Sem compromisso • ✓ Acesso imediato
          </p>
        </div>
      </div>
    </section>
  );
}
