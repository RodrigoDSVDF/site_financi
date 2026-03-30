import { Button } from "@/components/ui/button";
import { ArrowRight, LayoutDashboard, BookOpen, Zap, ShieldCheck } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import HeroBackground3D from './HeroBackground3D'; 

export default function HeroSection() {
  const { scrollY } = useScroll();
  
  const smoothY = useSpring(scrollY, { 
    stiffness: 70, 
    damping: 30, 
    restDelta: 0.001,
  });
  
  const yContent = useTransform(smoothY, [0, 1000], [0, -20]);
  const yMockup = useTransform(smoothY, [0, 1000], [0, -50]);

  const features = [
    { icon: LayoutDashboard, title: "App Dashboard Inteligente", desc: "Monitoramento e gráficos automáticos." },
    { icon: BookOpen, title: "Guia de Fundamentos", desc: "Metodologia prática para sua gestão." },
    { icon: Zap, title: "Aceleração Patrimonial", desc: "Estrutura rápida para escalar ativos." },
    { icon: ShieldCheck, title: "Gestão Estratégica", desc: "Direcione seu capital com clareza." },
  ];

  return (
    /* REMOVIDO: bg-[#020205] para permitir que o fundo 3D apareça */
    /* ADICIONADO: bg-transparent */
    <section className="relative flex flex-col items-center justify-center overflow-hidden bg-transparent pt-16 pb-0 md:pt-24 min-h-screen">
      
      {/* 1. Efeito 3D de fundo (posicionado de forma absoluta e fixa) */}
      <HeroBackground3D />

      {/* 2. Overlay sutil para garantir legibilidade sem matar o brilho */}
      <div className="absolute inset-0 bg-black/40 z-10 pointer-events-none" />

      <div className="container relative z-20 mx-auto px-4 w-full">
        <motion.div 
          style={{ y: yContent }} 
          className="max-w-7xl mx-auto flex flex-col items-center gap-12 md:gap-16 text-center will-change-transform"
        >
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex flex-col items-center text-center space-y-6 md:space-y-8 w-full max-w-5xl"
          >
            <div className="space-y-4 md:space-y-6 w-full">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-primary text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">
                <ShieldCheck className="w-3 h-3 md:w-4 md:h-4 text-primary animate-pulse" />
                Sistemas Patrimoniais de Elite
              </div>
              
              <h1 className="text-[2.6rem] leading-[1.1] sm:text-6xl lg:text-8xl font-black text-white tracking-tighter w-full">
                Saia da gestão passiva <br className="hidden sm:block" />
                e assuma o{" "}
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-chart-5">
                  controle estratégico.
                </span>
              </h1>
              
              <p className="text-muted-foreground text-base md:text-xl max-w-3xl leading-relaxed mx-auto font-medium px-2">
                O que não é medido não é gerenciado. O <span className="text-white font-semibold">Combo Liberdade Financeira</span> constrói um ecossistema de dados para que você direcione seu capital com precisão técnica e clareza <span className="text-white font-semibold">absoluta de seu orçamento</span> sobre cada decisão.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 w-full max-w-4xl px-2">
              {features.map((item, i) => (
                <div key={i} className="glass-card p-5 rounded-2xl flex items-start gap-5 border border-white/5 bg-white/5 backdrop-blur-sm hover:bg-white/10 transition-colors">
                  <div className="w-14 h-14 rounded-2xl bg-card flex items-center justify-center border-2 border-primary/20 text-primary">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-foreground font-extrabold text-base md:text-lg text-white">{item.title}</p>
                    <p className="text-muted-foreground text-xs mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 w-full max-w-md">
              <Button asChild className="w-full bg-primary text-primary-foreground font-black py-8 text-xl rounded-2xl shadow-[0_0_50px_rgba(0,217,255,0.4)] transition-all hover:scale-105 active:scale-95">
                <a href="https://pay.cakto.com.br/xxienb8_809928" target="_blank" rel="noopener">
                  ATIVAR AGORA <ArrowRight className="ml-2 w-6 h-6" />
                </a>
              </Button>
            </div>
          </motion.div>

          <motion.div 
            style={{ y: yMockup }}
            className="relative w-full max-w-[320px] md:max-w-2xl px-4 mt-4 mb-12 md:mb-20 will-change-transform"
          >
            {/* Glow de fundo do Mockup ajustado para combinar com o 3D verde */}
            <div className="absolute -inset-8 bg-gradient-to-tr from-primary/30 to-[#00ffaa]/20 rounded-[60px] blur-3xl opacity-50 z-0" />
            <div className="glass-card relative z-10 p-2 md:p-3 rounded-[32px] md:rounded-[40px] shadow-2xl overflow-hidden border border-white/10 bg-white/5 backdrop-blur-md">
              <img src="./f6.png" alt="Interface" className="w-full h-auto rounded-[24px] md:rounded-[32px]" />
            </div>
          </motion.div>
          
        </motion.div>
      </div>
    </section>
  );
}

