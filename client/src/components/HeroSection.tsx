import { Button } from "@/components/ui/button";
import { ArrowRight, LayoutDashboard, BookOpen, Zap, ShieldCheck } from "lucide-react";

export default function HeroSection() {
  
  const features = [
    { icon: LayoutDashboard, title: "App Dashboard Inteligente", desc: "Monitoramento e gráficos automáticos." },
    { icon: BookOpen, title: "Guia de Fundamentos", desc: "Metodologia prática para sua gestão." },
    { icon: Zap, title: "Aceleração Patrimonial", desc: "Estrutura rápida para escalar ativos." },
    { icon: ShieldCheck, title: "Gestão Estratégica", desc: "Direcione seu capital com clareza." },
  ];

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background py-12 md:py-20">
      
      {/* BACKGROUND DINÂMICO (Auras) */}
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[100%] h-[100%] bg-primary/10 rounded-full blur-[120px] animate-aura" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-secondary/5 rounded-full blur-[100px] animate-aura" style={{ animationDirection: 'reverse' }} />
      </div>

      <div className="container relative z-20 mx-auto px-4 w-full">
        <div className="max-w-6xl mx-auto flex flex-col items-center gap-12 md:gap-20">
          
          {/* CONTEÚDO TEXTUAL */}
          <div className="flex flex-col items-center text-center space-y-6 md:space-y-10 w-full">
            
            <div className="space-y-4 md:space-y-8 w-full">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-primary text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">
                <ShieldCheck className="w-3 h-3 md:w-4 md:h-4 animate-pulse" />
                Sistemas Patrimoniais de Elite
              </div>
              
              {/* TÍTULO RESPONSIVO - Corrigido para não vazar */}
              <h1 className="text-[2.6rem] leading-[1.1] sm:text-6xl lg:text-8xl font-black text-luxury tracking-tighter w-full break-words">
                <span className="text-white">Saia da gestão passiva </span><br className="hidden sm:block" />
                <span className="text-white">e assuma o </span>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-chart-5">
                  controle estratégico.
                </span>
              </h1>
              
              {/* COPY RESPONSIVO */}
              <p className="text-muted-foreground text-base md:text-xl max-w-3xl mx-auto font-medium leading-relaxed px-2">
                O que não é medido não é gerenciado. O <span className="text-white">Combo Liberdade Financeira</span> constrói um ecossistema de dados para precisão técnica e clareza absoluta.
              </p>
            </div>

            {/* BENTO GRID - Ajustado para 1 coluna no mobile */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-4xl px-2">
              {features.map((item, i) => (
                <div key={i} className="glass-card p-5 rounded-2xl flex items-center gap-4 text-left border border-white/5">
                  <div className="shrink-0 w-12 h-12 rounded-xl bg-card flex items-center justify-center border border-primary/20 text-primary">
                    <item.icon className="w-5 h-5" />
                  </div>
                  <div>
                    <p className="text-foreground font-bold text-sm md:text-base">{item.title}</p>
                    <p className="text-muted-foreground text-[11px] md:text-xs leading-tight mt-0.5">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* CTA RESPONSIVO - Largura total no mobile */}
            <div className="flex flex-col items-center gap-8 w-full max-w-md px-2">
              <Button 
                asChild
                className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-black py-7 md:py-8 text-lg md:text-xl rounded-2xl transition-all shadow-[0_0_30px_rgba(0,217,255,0.4)] flex items-center justify-center gap-3 h-auto"
              >
                <a href="https://pay.cakto.com.br/xxienb8_809928" target="_blank" rel="noopener">
                  ATIVAR AGORA
                  <ArrowRight className="w-5 h-5 md:w-6 md:h-6" />
                </a>
              </Button>
              
              {/* Trust Signals */}
              <div className="flex flex-wrap justify-center gap-4 text-[10px] md:text-xs font-bold text-muted-foreground uppercase tracking-widest opacity-60">
                <span>✓ Acesso imediato</span>
                <span>✓ Garantia 7 dias</span>
              </div>
            </div>
          </div>

          {/* MOCKUP RESPONSIVO */}
          <div className="relative w-full max-w-[320px] md:max-w-2xl px-4">
            <div className="absolute -inset-4 bg-primary/20 rounded-full blur-3xl opacity-50 z-0" />
            <div className="glass-card relative z-10 p-2 md:p-3 rounded-[32px] md:rounded-[40px] border border-white/10 shadow-2xl">
              <img 
                src="./f6.png" 
                alt="App Interface" 
                className="w-full h-auto rounded-[24px] md:rounded-[32px]"
                loading="eager"
              />
              {/* ROI Badge Mobile - Ajustado tamanho */}
              <div className="absolute -bottom-4 -right-4 bg-secondary p-3 md:p-4 rounded-xl shadow-xl z-30 border-2 border-background animate-bounce">
                <p className="text-secondary-foreground font-black text-[9px] md:text-xs uppercase">ROI Estratégico</p>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}
