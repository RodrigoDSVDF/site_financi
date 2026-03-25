import { Button } from "@/components/ui/button";
import { ArrowRight, LayoutDashboard, BookOpen, Zap } from "lucide-react";

export default function HeroSection() {
  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-900 via-gray-900 to-gray-950 overflow-hidden">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          
          {/* Conteúdo Estratégico */}
          <div className="space-y-8 text-center md:text-left">
            
            <div className="space-y-4">
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-white leading-tight">
                <span>Saia da gestão passiva e assuma o </span>
                <span className="text-cyan-400">controle estratégico das suas finanças.</span>
              </h1>
              
              <p className="text-lg sm:text-xl text-gray-300 leading-relaxed max-w-2xl">
                O que não é medido não é gerenciado. O Combo Liberdade Financeira constrói um 
                ecossistema de dados para que você direcione seu capital com precisão técnica 
                e clareza absoluta sobre cada decisão.
              </p>
            </div>

            {/* Diferenciais (Substituindo a caixa de erros por Pilares de Valor) */}
            <div className="grid grid-cols-1 gap-4 sm:bg-white/5 sm:p-6 rounded-2xl sm:backdrop-blur-md border border-white/10">
              <div className="flex items-start gap-3 text-left">
                <LayoutDashboard className="w-5 h-5 text-cyan-400 mt-1 shrink-0" />
                <div>
                  <p className="text-gray-100 font-semibold text-sm sm:text-base">App Dashboard Inteligente</p>
                  <p className="text-gray-400 text-xs sm:text-sm">Monitoramento e gráficos automáticos em tempo real.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-left">
                <BookOpen className="w-5 h-5 text-cyan-400 mt-1 shrink-0" />
                <div>
                  <p className="text-gray-100 font-semibold text-sm sm:text-base">Guia de Fundamentos</p>
                  <p className="text-gray-400 text-xs sm:text-sm">Metodologia prática para elevar seu patamar de gestão.</p>
                </div>
              </div>
              <div className="flex items-start gap-3 text-left">
                <Zap className="w-5 h-5 text-cyan-400 mt-1 shrink-0" />
                <div>
                  <p className="text-gray-100 font-semibold text-sm sm:text-base">Aceleração Patrimonial</p>
                  <p className="text-gray-400 text-xs sm:text-sm">Estrutura rápida para organizar e escalar seus ativos.</p>
                </div>
              </div>
            </div>

            {/* CTA e Trust Signals */}
            <div className="space-y-4">
              <div className="flex justify-center md:justify-start">
                <Button 
                  asChild
                  className="w-full sm:w-auto bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-bold px-8 py-7 text-lg rounded-xl transition-all duration-300 hover:shadow-xl hover:shadow-cyan-500/40 hover:scale-[1.02] flex items-center justify-center gap-2 h-auto"
                >
                  <a 
                    href="https://pay.cakto.com.br/xxienb8_809928" 
                    target="_blank" 
                    rel="noopener noreferrer"
                  >
                    <span>Ativar Inteligência Financeira</span>
                    <ArrowRight className="w-5 h-5" />
                  </a>
                </Button>
              </div>
              
              <div className="flex flex-wrap justify-center md:justify-start gap-x-4 gap-y-2 text-xs sm:text-sm text-gray-400 font-medium">
                <span>✓ Acesso imediato</span>
                <span className="hidden sm:inline">•</span>
                <span>✓ Garantia de 7 dias</span>
                <span className="hidden sm:inline">•</span>
                <span>✓ Oferta exclusiva de lançamento</span>
              </div>
            </div>
          </div>

          {/* Área Visual (Mockup) */}
          <div className="flex justify-center items-center mt-10 md:mt-0">
            <div className="relative w-full max-w-[340px] sm:max-w-md lg:max-w-lg">
              {/* Efeito de Brilho ao Fundo */}
              <div className="absolute inset-0 bg-cyan-500/20 rounded-full blur-[100px] animate-pulse"></div>
              
              <div className="relative z-10 p-2 bg-gradient-to-tr from-white/10 to-white/5 rounded-3xl border border-white/10 shadow-2xl">
                <img 
                  src="./f6.png" 
                  alt="Interface do App e Ebook Liberdade Financeira" 
                  className="w-full h-auto rounded-2xl shadow-inner"
                  loading="eager"
                />
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
