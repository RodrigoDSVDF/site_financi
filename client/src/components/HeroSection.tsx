import { Button } from "@/components/ui/button";
import { ArrowRight, LayoutDashboard, BookOpen, Zap, ShieldCheck, TrendingUp, Award, Clock } from "lucide-react";
import { useState, useEffect } from 'react';

export default function HeroSection() {
  // Estado para controlar a animação de digitação
  const [typedText, setTypedText] = useState('');
  const [typingIndex, setTypingIndex] = useState(0);
  const targetText = "Sistemas de Inteligência Patrimonial. O futuro da sua ";

  useEffect(() => {
    if (typingIndex < targetText.length) {
      const timeout = setTimeout(() => {
        setTypedText(prev => prev + targetText[typingIndex]);
        setTypingIndex(prev => prev + 1);
      }, 50); // Velocidade da digitação
      return () => clearTimeout(timeout);
    }
  }, [typingIndex]);

  // Estrutura de Diferenciais Modernizada (Bento Bento Grid Style)
  const features = [
    { icon: LayoutDashboard, title: "Dashboard Live", desc: "Monitoramento em tempo real do seu capital." },
    { icon: BookOpen, title: "Fundamentos de Elite", desc: "Metodologia prática para gestão estratégica." },
    { icon: Zap, title: "Aceleração de ROI", desc: "Estrutura técnica para escalar seus ativos." },
    { icon: ShieldCheck, title: "Blindagem Patrimonial", desc: "Estratégias de proteção contra inflação e crises." },
  ];

  return (
    <section className="relative min-h-[90vh] flex items-center justify-center overflow-hidden bg-background">
      
      {/* * =============================================================================
       * Fundo Dinâmico "Dark Kinetic" - O EFEITO DE IMPACTO
       * =============================================================================
       */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* Camada 1: AURA RADIAL (Brilho que respira e flutua lentamente) */}
        <div className="absolute top-[-20%] left-[-10%] w-[80%] h-[80%] bg-primary/20 rounded-full blur-[160px] animate-aura" style={{ animationDuration: '35s' }} />
        <div className="absolute bottom-[-20%] right-[-10%] w-[60%] h-[60%] bg-secondary/10 rounded-full blur-[140px] animate-aura" style={{ animationDirection: 'reverse', animationDuration: '45s' }} />

        {/* Camada 2: GLO GLO (Pontos de luz sutil para dar brilho interno à seção) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30">
          <div className="absolute top-[20%] right-[30%] w-[25%] h-[25%] bg-chart-5/10 rounded-full blur-[130px]" />
          <div className="absolute bottom-[20%] left-[30%] w-[25%] h-[25%] bg-chart-3/10 rounded-full blur-[130px]" />
        </div>
      </div>

      {/* * =============================================================================
       * container Principal - CONTEÚDO SOFISTICADO (Design High-End)
       * =============================================================================
       */}
      <div className="container relative z-10 mx-auto px-4">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16 md:gap-24 text-center lg:text-left">
          
          {/* Conteúdo Estratégico e Tipografia de Elite */}
          <div className="flex flex-col space-y-12 max-w-4xl lg:flex-1 lg:space-y-16">
            
            <div className="space-y-8">
              {/* Badge Minimalista */}
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-primary text-[10px] font-black uppercase tracking-[0.2em] shadow-xl mx-auto lg:mx-0">
                <ShieldCheck className="w-4 h-4 text-primary animate-pulse" />
                Sistemas Patrimoniais de Elite
              </div>
              
              {/* Título Massivo (Tipografia de impacto com gradientes de luxo) */}
              <h1 className="text-5xl sm:text-7xl lg:text-8xl font-black text-luxury leading-[0.95] tracking-tight">
                O Futuro da sua <br />
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">
                  Liberdade.
                </span>
              </h1>
              
              {/* Texto com Efeito de Digitação e Copy Sofisticado */}
              <p className="text-muted-foreground text-lg sm:text-xl md:text-2xl max-w-3xl leading-relaxed mx-auto lg:mx-0 font-medium">
                <span className="text-white font-semibold">Liberdade Financeira</span> não é um evento. É a arquitetura técnica da sua independência através de dados e estratégia patrimonial.
              </p>
            </div>

            {/* Bento Bento Grid de Diferenciais (Design de vidro puro) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-10 border-t border-border mx-auto lg:mx-0">
              {features.map((item, i) => (
                <div key={i} className="glass-card p-6 rounded-3xl group flex items-start gap-5 hover:border-primary/50 hover:-translate-y-1 hover:shadow-2xl transition-all duration-300">
                  <div className="w-14 h-14 rounded-2xl bg-card flex items-center justify-center border-2 border-primary/20 shadow-inner text-primary group-hover:scale-110 group-hover:bg-primary group-hover:text-primary-foreground transition-all duration-300">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div>
                    <p className="text-foreground font-extrabold text-base tracking-tight">{item.title}</p>
                    <p className="text-muted-foreground text-xs leading-tight mt-1 group-hover:text-foreground/90 transition-colors">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA e Trust Signals Sofisticados */}
            <div className="flex flex-col items-center lg:items-start gap-10 pt-16">
              <Button 
                asChild
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-black px-12 py-8 text-xl rounded-2xl transition-all duration-500 hover:shadow-[0_0_60px_rgba(0,217,255,0.6)] hover:-translate-y-1.5 flex items-center gap-4 h-auto"
              >
                <a href="https://pay.cakto.com.br/xxienb8_809928" target="_blank" rel="noopener">
                  ATIVAR MINHA INTELIGÊNCIA AGORA
                  <ArrowRight className="w-7 h-7" />
                </a>
              </Button>
              
              {/* Sinais de Confiança em Carrossel/Lista Premium */}
              <div className="flex flex-wrap justify-center lg:justify-start gap-10 pt-10 border-t border-border mx-auto lg:mx-0 text-sm font-bold text-muted-foreground uppercase tracking-wider">
                {[
                  { icon: Clock, label: "Acesso Imediato" },
                  { icon: ShieldCheck, label: "Garantia 7 Dias" },
                  { icon: Award, label: "Oferta de Lançamento" },
                ].map((signal, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <signal.icon className="w-5 h-5 text-secondary" />
                    {signal.label}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Área Visual (Mockup com Camadas de Vidro e Profundidade) */}
          <div className="relative group lg:w-max lg:h-max lg:ml-auto">
            {/* Brilho de Fundo da Imagem Principal */}
            <div className="absolute -inset-10 bg-gradient-to-tr from-primary/30 to-secondary/30 rounded-[60px] blur-3xl opacity-60 group-hover:opacity-100 transition-opacity duration-700 z-0 pointer-events-none" />
            
            {/* Container da Imagem Principal (Vidro Puro) */}
            <div className="glass-card relative z-10 p-4 rounded-[40px] shadow-[0_32px_128px_0_rgba(0,0,0,0.9)] overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-[40px]"></div>
              <img 
                src="./f6.png" 
                alt="Interface do App Liberdade Financeira" 
                className="w-full h-auto rounded-[32px] shadow-inner transform transition-transform duration-1000 group-hover:scale-[1.05]"
                loading="eager"
              />
            </div>

            {/* FLOATING ELEMENT: O Detalhe "UAU" (Glass Box Flutuante) */}
            <div className="absolute -bottom-8 -right-8 glass-card p-6 md:p-8 rounded-3xl shadow-2xl hidden md:flex items-center gap-5 md:gap-6 animate-rotate-float-glass z-20 border-border/50 transition-all duration-300 group-hover:scale-110">
              <TrendingUp className="w-12 h-12 text-secondary p-3 bg-secondary/10 rounded-full border border-secondary/20 shadow-xl" />
              <div>
                <p className="text-[10px] text-muted-foreground uppercase tracking-widest font-black">Performance Média</p>
                <p className="text-foreground font-black text-2xl md:text-3xl tracking-tight relative z-10">ROI Estratégico 2.0</p>
                <p className="text-secondary/80 font-bold text-xs mt-1">Sistemas Patrimoniais de Elite</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
