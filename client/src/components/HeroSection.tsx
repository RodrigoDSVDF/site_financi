import { Button } from "@/components/ui/button";
import { ArrowRight, LayoutDashboard, BookOpen, Zap, ShieldCheck } from "lucide-react";

export default function HeroSection() {
  // Configuração dos elementos flutuantes de vidro (Glass Elements)
  const glassElements = [
    { size: '120px', color: 'border-primary/20', animationDelay: '0s' },
    { size: '80px', color: 'border-secondary/20', animationDelay: '10s' },
    { size: '160px', color: 'border-chart-5/10', animationDelay: '20s' },
  ];

  return (
    <section className="relative py-20 md:py-32 bg-background overflow-hidden">
      
      {/* * =============================================================================
       * Fundo Dinâmico de Alta Performance (Ecossistema de Dados Flutuante)
       * =============================================================================
       */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        
        {/* Camada 1: Gradientes Radiais Móveis (Glows Animados) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full opacity-30">
          <div className="absolute top-[10%] left-[15%] w-[40%] h-[40%] bg-primary/20 rounded-full blur-[120px] animate-drift-radial" style={{ animationDelay: '0s' }} />
          <div className="absolute bottom-[20%] right-[10%] w-[30%] h-[30%] bg-secondary/10 rounded-full blur-[100px] animate-drift-radial" style={{ animationDelay: '5s' }} />
          <div className="absolute top-[30%] right-[30%] w-[25%] h-[25%] bg-chart-5/10 rounded-full blur-[130px] animate-drift-radial" style={{ animationDelay: '12s' }} />
        </div>

        {/* Camada 2: Elementos Flutuantes de Vidro (3D/Glass Blocks) */}
        {glassElements.map((element, index) => (
          <div
            key={index}
            className={`absolute z-10 p-3 bg-card/40 backdrop-blur-xl rounded-[32px] border ${element.color} shadow-2xl animate-rotate-float-glass`}
            style={{
              width: element.size,
              height: element.size,
              animationDelay: element.animationDelay,
              top: `${Math.random() * 80 + 10}%`, // Posicionamento randômico suave
              left: `${Math.random() * 80 + 10}%`,
            }}
          >
            {/* Brilho interno do elemento de vidro */}
            <div className="absolute inset-0 bg-gradient-to-b from-white/10 to-transparent pointer-events-none rounded-[32px]"></div>
          </div>
        ))}
      </div>

      {/* container Principal - Conteúdo sobre o fundo animado */}
      <div className="container relative z-20 mx-auto px-4">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          {/* Conteúdo Estratégico */}
          <div className="flex flex-col space-y-10 text-center lg:text-left">
            
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 border border-primary/20 text-primary text-xs font-bold uppercase tracking-wider mx-auto lg:mx-0">
                <ShieldCheck className="w-4 h-4" />
                Sistema de Gestão 2.0
              </div>
              
              <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-foreground leading-[1.1] tracking-tight">
                Saia da gestão passiva e assuma o 
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary to-chart-5">
                  controle estratégico.
                </span>
              </h1>
              
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed max-w-2xl mx-auto lg:mx-0">
                O Combo <span className="text-foreground font-semibold">Liberdade Financeira</span> constrói um 
                ecossistema de dados para que você direcione seu capital com precisão técnica.
              </p>
            </div>

            {/* Diferenciais em Bento Grid Style */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {[
                { icon: LayoutDashboard, title: "Dashboard", desc: "Monitoramento real-time" },
                { icon: BookOpen, title: "Fundamentos", desc: "Metodologia prática" },
                { icon: Zap, title: "Aceleração", desc: "Escalabilidade de ativos" }
              ].map((item, i) => (
                <div key={i} className="p-4 rounded-2xl bg-card/50 backdrop-blur-sm border border-border hover:border-primary/50 transition-colors group">
                  <item.icon className="w-6 h-6 text-primary mb-3 group-hover:scale-110 transition-transform" />
                  <p className="text-foreground font-bold text-sm">{item.title}</p>
                  <p className="text-muted-foreground text-xs leading-tight mt-1">{item.desc}</p>
                </div>
              ))}
            </div>

            {/* CTA e Trust Signals */}
            <div className="flex flex-col items-center lg:items-start gap-6">
              <Button 
                asChild
                className="w-full sm:w-auto bg-primary hover:bg-primary/90 text-primary-foreground font-black px-10 py-8 text-xl rounded-2xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,217,255,0.4)] hover:-translate-y-1 flex items-center gap-3 h-auto"
              >
                <a href="https://pay.cakto.com.br/xxienb8_809928" target="_blank" rel="noopener">
                  ATIVAR INTELIGÊNCIA AGORA
                  <ArrowRight className="w-6 h-6" />
                </a>
              </Button>
              
              <div className="flex flex-wrap justify-center gap-6 text-xs text-muted-foreground uppercase tracking-widest font-bold">
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-secondary" /> Acesso Imediato</span>
                <span className="flex items-center gap-2"><div className="w-1.5 h-1.5 rounded-full bg-secondary" /> Garantia 7 Dias</span>
              </div>
            </div>
          </div>

          {/* Área Visual (Mockup Principal) */}
          <div className="relative group">
            {/* Brilho de Fundo da Imagem Principal */}
            <div className="absolute -inset-4 bg-gradient-to-tr from-primary/20 to-secondary/20 rounded-[40px] blur-2xl opacity-50 group-hover:opacity-80 transition-opacity duration-700 z-0"></div>
            
            {/* Container da Imagem Principal */}
            <div className="relative z-10 p-3 bg-card/40 backdrop-blur-xl rounded-[32px] border border-white/10 shadow-2xl overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-b from-white/5 to-transparent pointer-events-none"></div>
              <img 
                src="./f6.png" 
                alt="Interface do App e Ebook Liberdade Financeira" 
                className="w-full h-auto rounded-[24px] shadow-2xl transform transition-transform duration-700 group-hover:scale-[1.02]"
                loading="eager"
              />
            </div>

            {/* Floating Element - Detalhe de acabamento "ROI Estratégico" */}
            <div className="absolute -bottom-8 -right-8 bg-secondary p-4 rounded-2xl shadow-[0_20px_50px_rgba(16,185,129,0.3)] hidden md:block animate-bounce duration-[3000ms] z-30 border-4 border-background">
              <p className="text-secondary-foreground font-black text-xs uppercase tracking-tighter relative z-10">
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
