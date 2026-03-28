import { Button } from "@/components/ui/button";
import { ArrowRight, LayoutDashboard, BookOpen, Zap, ShieldCheck } from "lucide-react";

export default function HeroSection() {
  
  // Estrutura de Diferenciais (Mantendo os textos originais)
  const features = [
    { icon: LayoutDashboard, title: "App Dashboard Inteligente", desc: "Monitoramento e gráficos automáticos." },
    { icon: BookOpen, title: "Guia de Fundamentos", desc: "Metodologia prática para sua gestão." },
    { icon: Zap, title: "Aceleração Patrimonial", desc: "Estrutura rápida para escalar ativos." },
    { icon: ShieldCheck, title: "Gestão Estratégica", desc: "Direcione seu capital com clareza." },
  ];

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-background py-12 md:py-20">
      
      {/* * =============================================================================
       * Fundo Dinâmico "Dark Kinetic" (Ciano e Esmeralda Neon Sutil) - MANTIDO
       * =============================================================================
       */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* Camada 1: AURA RADIAL (Brilho que flutua organicamente) */}
        <div className="absolute top-[-10%] left-[-10%] w-[100%] h-[100%] bg-primary/10 rounded-full blur-[120px] animate-aura" style={{ animationDuration: '30s' }} />
        <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-secondary/5 rounded-full blur-[100px] animate-aura" style={{ animationDirection: 'reverse', animationDuration: '40s' }} />

        {/* Camada 2: GLO GLO (Pontos de luz sutil para profundidade interna) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30">
          <div className="absolute top-[30%] right-[30%] w-[25%] h-[25%] bg-chart-5/10 rounded-full blur-[130px]" />
          <div className="absolute bottom-[30%] left-[30%] w-[25%] h-[25%] bg-chart-3/10 rounded-full blur-[130px]" />
        </div>
      </div>

      {/* * =============================================================================
       * container Principal - CONTEÚDO SOFISTICADO (Texto Original Restaurado com Ajuste)
       * =============================================================================
       */}
      <div className="container relative z-20 mx-auto px-4 w-full">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-16 md:gap-20 text-center">
          
          {/* Conteúdo Estratégico e Tipografia de Elite (Centralizado para impacto) */}
          <div className="flex flex-col items-center text-center space-y-6 md:space-y-10 w-full max-w-5xl">
            
            <div className="space-y-4 md:space-y-8 w-full">
              {/* Badge Minimalista */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-primary text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">
                <ShieldCheck className="w-3 h-3 md:w-4 md:h-4 text-primary animate-pulse" />
                Sistemas Patrimoniais de Elite
              </div>
              
              {/* Título Massivo RESPONSIVO (Copy Original MANTIDO) */}
              <h1 className="text-[2.6rem] leading-[1.1] sm:text-6xl lg:text-8xl font-black text-luxury tracking-tighter w-full break-words">
                <span className="text-white">Saia da gestão passiva </span><br className="hidden sm:block" />
                <span className="text-white">e assuma o </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-chart-5">
                  controle estratégico.
                </span>
              </h1>
              
              {/* Texto de Copy (Texto Original Integral + INCLUSÃO SOLICITADA) */}
              <p className="text-muted-foreground text-base md:text-xl max-w-3xl leading-relaxed mx-auto font-medium px-2">
                O que não é medido não é gerenciado. O <span className="text-white font-semibold">Combo Liberdade Financeira</span> constrói um ecossistema de dados para que você direcione seu capital com precisão técnica e clareza <span className="text-white font-semibold">absoluta de seu orçamento</span> sobre cada decisão.
              </p>
            </div>

            {/* Bento Grid de Diferenciais (Design de vidro puro MANTIDO) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-4xl px-2">
              {features.map((item, i) => (
                <div key={i} className="glass-card p-5 rounded-2xl group flex items-start gap-5 hover:border-primary/50 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300 border border-white/5">
                  <div className="w-14 h-14 rounded-2xl bg-card flex items-center justify-center border-2 border-primary/20 shadow-inner text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-foreground font-extrabold text-base md:text-lg tracking-tight">{item.title}</p>
                    <p className="text-muted-foreground text-xs leading-tight mt-1 group-hover:text-foreground/90 transition-colors">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA e Trust Signals Sofisticados (Centralizado e Responsivo) */}
            <div className="flex flex-col items-center gap-10 pt-16 w-full max-w-md px-2">
              <Button 
                asChild
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-black px-12 py-8 text-xl rounded-2xl transition-all duration-500 hover:shadow-[0_0_60px_rgba(0,217,255,0.6)] hover:-translate-y-1.5 flex items-center gap-4 h-auto"
              >
                <a href="https://pay.cakto.com.br/xxienb8_809928" target="_blank" rel="noopener">
                  ACESSAR AGORA MEU APP
                  <ArrowRight className="w-7 h-7" />
                </a>
              </Button>
              
              {/* Trust Signals em Lista Premium (Recuperando Textos Originais) */}
              <div className="flex flex-wrap justify-center gap-6 text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-widest opacity-60">
                <span>✓ Acesso imediato</span>
                <span>✓ Garantia de 7 dias</span>
              </div>
            </div>
          </div>

          {/* Área Visual (Mockup com Profundidade de Vidro - BOTÃO REMOVIDO) */}
          <div className="relative group lg:w-max lg:h-max w-full max-w-[320px] md:max-w-2xl px-4">
            {/* Brilho de Fundo da Imagem Principal */}
            <div className="absolute -inset-8 bg-gradient-to-tr from-primary/30 to-secondary/30 rounded-[60px] blur-3xl opacity-60 group-hover:opacity-90 transition-opacity duration-700 z-0 pointer-events-none" />
            
            {/* Container da Imagem Principal (Vidro Puro - LIMPO) */}
            <div className="glass-card relative z-10 p-2 md:p-3 rounded-[32px] md:rounded-[40px] shadow-[0_32px_128px_0_rgba(0,0,0,0.9)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-[40px]"></div>
              <img 
                src="./f6.png" 
                alt="Interface do App Liberdade Financeira" 
                className="w-full h-auto rounded-[24px] md:rounded-[32px] shadow-inner transform transition-transform duration-1000 group-hover:scale-[1.03]"
                loading="eager"
              />
              
              {/* O BOTÃO 'ROI ESTRATÉGICO' FOI REMOVIDO DESTA POSIÇÃO */}
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
