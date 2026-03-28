import { Button } from "@/components/ui/button";
import { ArrowRight, LayoutDashboard, BookOpen, Zap, ShieldCheck } from "lucide-react";

export default function HeroSection() {
  
  // Estrutura de Diferenciais (Recuperando os textos originais)
  const features = [
    { icon: LayoutDashboard, title: "App Dashboard Inteligente", desc: "Monitoramento e gráficos automáticos em tempo real." },
    { icon: BookOpen, title: "Guia de Fundamentos", desc: "Metodologia prática para elevar seu patamar de gestão." },
    { icon: Zap, title: "Aceleração Patrimonial", desc: "Estrutura rápida para organizar e escalar seus ativos." },
    // Adicionei um 4º item para equilibrar a grid 2x2, usando a linguagem original
    { icon: ShieldCheck, title: "Gestão Estratégica", desc: "Direcione seu capital com clareza absoluta." },
  ];

  return (
    <section className="relative min-h-[95vh] flex items-center justify-center overflow-hidden bg-background">
      
      {/* * =============================================================================
       * Fundo Dinâmico "Dark Kinetic" (Ciano e Esmeralda Neon Sutil)
       * =============================================================================
       */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* Camada 1: AURA RADIAL (Brilho que flutua organicamente) */}
        <div className="absolute top-[-15%] left-[-10%] w-[80%] h-[80%] bg-primary/20 rounded-full blur-[160px] animate-aura" style={{ animationDuration: '30s' }} />
        <div className="absolute bottom-[-15%] right-[-10%] w-[60%] h-[60%] bg-secondary/10 rounded-full blur-[140px] animate-aura" style={{ animationDirection: 'reverse', animationDuration: '40s' }} />

        {/* Camada 2: GLO GLO (Pontos de luz sutil para profundidade interna) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30">
          <div className="absolute top-[30%] right-[30%] w-[25%] h-[25%] bg-chart-5/10 rounded-full blur-[130px]" />
          <div className="absolute bottom-[30%] left-[30%] w-[25%] h-[25%] bg-chart-3/10 rounded-full blur-[130px]" />
        </div>
      </div>

      {/* * =============================================================================
       * container Principal - CONTEÚDO SOFISTICADO (Texto Original Restaurado)
       * =============================================================================
       */}
      <div className="container relative z-20 mx-auto px-4">
        <div className="max-w-7xl mx-auto flex flex-col items-center gap-16 md:gap-20 text-center">
          
          {/* Conteúdo Estratégico e Tipografia de Elite (Centralizado para impacto) */}
          <div className="flex flex-col items-center space-y-10 max-w-5xl">
            
            <div className="space-y-8">
              {/* Badge Minimalista */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-primary text-[10px] font-black uppercase tracking-[0.2em] shadow-xl">
                <ShieldCheck className="w-4 h-4 text-primary animate-pulse" />
                Sistemas Patrimoniais de Elite
              </div>
              
              {/* Título Massivo (Recuperando Copy Original e centralizando) */}
              <h1 className="text-4xl sm:text-6xl lg:text-8xl font-black text-luxury leading-[0.95] tracking-tight">
                <span className="text-white">Saia da gestão passiva </span><br />
                <span className="text-white">e assuma o </span>
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-chart-5">
                  controle estratégico.
                </span>
              </h1>
              
              {/* Texto de Copy (Recuperando Texto Original Integral) */}
              <p className="text-muted-foreground text-lg md:text-xl max-w-3xl leading-relaxed mx-auto font-medium">
                O que não é medido não é gerenciado. O <span className="text-white font-semibold">Combo Liberdade Financeira</span> constrói um ecossistema de dados para que você direcione seu capital com precisão técnica e clareza absoluta sobre cada decisão.
              </p>
            </div>

            {/* Bento Grid de Diferenciais (Design de vidro puro com textos originais) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t border-border w-full max-w-4xl">
              {features.map((item, i) => (
                <div key={i} className="glass-card p-6 rounded-3xl group flex items-start gap-5 hover:border-primary/50 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
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

            {/* CTA e Trust Signals Sofisticados (Centralizado) */}
            <div className="flex flex-col items-center gap-10 pt-16 w-full max-w-4xl">
              <Button 
                asChild
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-black px-12 py-8 text-xl rounded-2xl transition-all duration-500 hover:shadow-[0_0_60px_rgba(0,217,255,0.6)] hover:-translate-y-1.5 flex items-center gap-4 h-auto"
              >
                <a href="https://pay.cakto.com.br/xxienb8_809928" target="_blank" rel="noopener">
                  ATIVAR MINHA INTELIGÊNCIA AGORA
                  <ArrowRight className="w-7 h-7" />
                </a>
              </Button>
              
              {/* Trust Signals em Lista Premium (Recuperando Textos Originais) */}
              <div className="flex flex-wrap justify-center gap-8 pt-10 border-t border-border w-full text-xs font-bold text-muted-foreground uppercase tracking-widest">
                <span>✓ Acesso imediato</span>
                <span className="text-white/20">•</span>
                <span>✓ Garantia de 7 dias</span>
                <span className="text-white/20">•</span>
                <span>✓ Oferta exclusiva de lançamento</span>
              </div>
            </div>
          </div>

          {/* Área Visual (Mockup com Profundidade de Vidro e Botão ROI Estratégico) */}
          <div className="relative group lg:w-max lg:h-max">
            {/* Brilho de Fundo da Imagem Principal */}
            <div className="absolute -inset-8 bg-gradient-to-tr from-primary/30 to-secondary/30 rounded-[60px] blur-3xl opacity-60 group-hover:opacity-90 transition-opacity duration-700 z-0 pointer-events-none" />
            
            {/* Container da Imagem Principal (Vidro Puro) */}
            <div className="glass-card relative z-10 p-3 rounded-[40px] shadow-[0_32px_128px_0_rgba(0,0,0,0.9)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-[40px]"></div>
              <img 
                src="./f6.png" 
                alt="Interface do App Liberdade Financeira" 
                className="w-full h-auto rounded-[32px] shadow-inner transform transition-transform duration-1000 group-hover:scale-[1.03]"
                loading="eager"
              />
            </div>

            {/* FLOATING ELEMENT: O Detalhe de acabamento "ROI Estratégico" (Glass Box Flutuante) */}
            <div className="absolute -bottom-8 -right-8 glass-card p-6 rounded-3xl md:flex hidden md:block animate-bounce duration-[4000ms] z-30 border-4 border-background hover:scale-110 transition-transform">
              <p className="text-white/90 font-black text-xs uppercase tracking-tighter relative z-10">
                ROI Estratégico
              </p>
              {/* Glow de fundo do próprio botão para garantir visibilidade sobre a imagem escura */}
              <div className="absolute inset-0 bg-secondary rounded-2xl blur-lg opacity-50 z-0"></div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
