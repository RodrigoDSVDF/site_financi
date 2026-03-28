import { Button } from "@/components/ui/button";
import { ArrowRight, LayoutDashboard, BookOpen, Zap, ShieldCheck } from "lucide-react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function HeroSection() {
  const { scrollY } = useScroll();
  
  // useSpring adiciona uma "mola" no movimento, eliminando o aspecto travado
  const smoothY = useSpring(scrollY, { stiffness: 100, damping: 30, restDelta: 0.001 });
  
  // Valores ajustados para manter a imagem próxima da seção de baixo
  const yAura = useTransform(smoothY, [0, 800], [0, 100]);
  const yContent = useTransform(smoothY, [0, 800], [0, -30]);
  const yMockup = useTransform(smoothY, [0, 800], [0, -60]); // Reduzido de -120 para -60

  const features = [
    { icon: LayoutDashboard, title: "App Dashboard Inteligente", desc: "Monitoramento e gráficos automáticos." },
    { icon: BookOpen, title: "Guia de Fundamentos", desc: "Metodologia prática para sua gestão." },
    { icon: Zap, title: "Aceleração Patrimonial", desc: "Estrutura rápida para escalar ativos." },
    { icon: ShieldCheck, title: "Gestão Estratégica", desc: "Direcione seu capital com clareza." },
  ];

  return (
    <section className="relative flex items-center justify-center overflow-hidden bg-background pt-16 pb-0 md:pt-24">
      
      {/* BACKGROUND COM MOVIMENTO SUAVE */}
      <motion.div style={{ y: yAura }} className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-[-5%] left-[-5%] w-[110%] h-[110%] bg-primary/10 rounded-full blur-[120px] animate-aura" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[80%] h-[80%] bg-secondary/5 rounded-full blur-[100px] animate-aura" style={{ animationDirection: 'reverse' }} />
      </motion.div>

      <div className="container relative z-20 mx-auto px-4 w-full">
        <motion.div style={{ y: yContent }} className="max-w-7xl mx-auto flex flex-col items-center gap-12 md:gap-16 text-center">
          
          <motion.div 
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex flex-col items-center text-center space-y-6 md:space-y-8 w-full max-w-5xl"
          >
            <div className="space-y-4 md:space-y-6 w-full">
              <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md text-primary text-[9px] md:text-[10px] font-black uppercase tracking-[0.2em]">
                <ShieldCheck className="w-3 h-3 md:w-4 md:h-4 text-primary animate-pulse" />
                Sistemas Patrimoniais de Elite
              </div>
              
              <h1 className="text-[2.6rem] leading-[1.1] sm:text-6xl lg:text-8xl font-black text-luxury tracking-tighter w-full">
                <span className="text-white">Saia da gestão passiva </span><br className="hidden sm:block" />
                <span className="text-white">e assuma o </span>
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
                <div key={i} className="glass-card p-5 rounded-2xl flex items-start gap-5 border border-white/5">
                  <div className="w-14 h-14 rounded-2xl bg-card flex items-center justify-center border-2 border-primary/20 text-primary">
                    <item.icon className="w-6 h-6" />
                  </div>
                  <div className="text-left flex-1">
                    <p className="text-foreground font-extrabold text-base md:text-lg">{item.title}</p>
                    <p className="text-muted-foreground text-xs mt-1">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="pt-6 w-full max-w-md">
              <Button asChild className="w-full bg-primary text-primary-foreground font-black py-8 text-xl rounded-2xl shadow-[0_0_50px_rgba(0,217,255,0.4)]">
                <a href="https://pay.cakto.com.br/xxienb8_809928" target="_blank" rel="noopener">
                  ATIVAR AGORA <ArrowRight className="ml-2 w-6 h-6" />
                </a>
              </Button>
            </div>
          </motion.div>

          {/* MOCKUP - AJUSTADO PARA FICAR MAIS PRÓXIMO DA PRÓXIMA SEÇÃO */}
          <motion.div 
            style={{ y: yMockup }}
            className="relative w-full max-w-[320px] md:max-w-2xl px-4 mt-4"
          >
            <div className="absolute -inset-8 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-[60px] blur-3xl opacity-50 z-0" />
            <div className="glass-card relative z-10 p-2 md:p-3 rounded-[32px] md:rounded-[40px] shadow-2xl overflow-hidden">
              <img src="./f6.png" alt="App" className="w-full h-auto rounded-[24px] md:rounded-[32px]" />
            </div>
          </motion.div>
          
        </motion.div>
      </div>
    </section>
  );
}
