import { Star, Zap, TrendingUp, Award, UserCheck } from "lucide-react";

export default function SocialProofSection() {
  const testimonials = [
    {
      name: "Maria Silva",
      role: "Consultora de RH",
      text: "Consegui reduzir meus gastos em 28% no primeiro mês. Agora sei exatamente onde cada real está indo.",
      savings: "28%",
      icon: TrendingUp,
    },
    {
      name: "João Santos",
      role: "Desenvolvedor",
      text: "O app é tão simples que minha mãe consegue usar. Organizei minha vida financeira e bati minhas metas em 4 meses.",
      savings: "Dívida zerada",
      icon: Award,
    },
    {
      name: "Ana Costa",
      role: "Professora",
      text: "Finalmente consegui juntar para minha primeira viagem internacional. O ebook mudou minha mentalidade.",
      savings: "Metas atingidas",
      icon: Zap,
    },
    {
      name: "Pedro Lima",
      role: "Engenheiro",
      text: "A clareza técnica que o painel oferece me permitiu antecipar a compra do meu apartamento em 2 anos.",
      savings: "Patrimônio acelerado",
      icon: UserCheck,
    },
    {
      name: "Carla Souza",
      role: "Designer",
      text: "O combo foi o melhor investimento do ano. A organização me deu paz de espírito para focar no meu trabalho.",
      savings: "Foco & Paz",
      icon: Zap,
    },
  ];

  // Duplicamos a lista para criar o efeito de "carrossel infinito" sem saltos visuais
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="relative py-20 md:py-32 bg-background overflow-hidden">
      {/* Background Decorativo - Brilho Ciano Sutil */}
      <div className="absolute inset-0 z-0 opacity-10 pointer-events-none">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-primary/20 rounded-full blur-[140px]" />
      </div>

      <div className="container relative z-10 mx-auto px-4">
        <div className="text-center mb-16 md:mb-24 space-y-4">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-bold uppercase tracking-wider mx-auto">
            <UserCheck className="w-4 h-4" />
            Impacto Real e Autoridade
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight max-w-3xl mx-auto">
            Mais de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">10.000 pessoas</span> já transformaram suas finanças.
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Resultados reais de quem decidiu assumir o controle estratégico do próprio capital.
          </p>
        </div>

        {/* Carrossel Infinito */}
        <div className="relative group overflow-hidden py-12 -mx-4">
          {/* Sombras de Desvanecimento Lateral */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-20 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-20 pointer-events-none" />

          {/* Container da Animação */}
          <div className="flex animate-scroll hover:[animation-play-state:paused] gap-8 w-max px-4">
            {duplicatedTestimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="relative p-8 rounded-3xl bg-card/40 backdrop-blur-md border border-border group transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 w-[320px] md:w-[400px] shrink-0 flex flex-col justify-between"
              >
                {/* Ícone Flutuante */}
                <div className="absolute -top-5 -left-3 w-10 h-10 p-2 bg-background rounded-xl border border-border text-primary shadow-xl group-hover:scale-110 transition-transform">
                  <testimonial.icon className="w-full h-full" />
                </div>

                <div>
                  <div className="flex items-center justify-between gap-4 mb-6 pt-2">
                    <div className="flex gap-0.5">
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} className="w-4 h-4 fill-yellow-500 text-yellow-500" />
                      ))}
                    </div>
                    <div className="bg-secondary/10 text-secondary font-black px-3 py-1 rounded-full text-[10px] uppercase tracking-wider border border-secondary/20">
                      {testimonial.savings}
                    </div>
                  </div>

                  {/* Texto do Depoimento - Bloco Corrigido */}
                  <div className="relative mb-8 mt-4">
                    <span className="absolute -left-4 -top-6 text-6xl text-primary/10 font-black pointer-events-none italic">"</span>
                    <p className="text-foreground leading-relaxed italic font-medium text-base md:text-lg relative z-10">
                      {testimonial.text}
                    </p>
                    <span className="absolute -right-2 -bottom-6 text-6xl text-primary/10 font-black pointer-events-none italic">"</span>
                  </div>
                </div>

                {/* Autor */}
                <div className="flex items-center gap-4 pt-6 border-t border-border/50">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center border border-primary/20 text-primary font-bold">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-sm tracking-tight">{testimonial.name}</p>
                    <p className="text-[11px] text-muted-foreground uppercase tracking-widest font-semibold">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Card Moderno */}
        <div className="mt-20 p-8 md:p-12 rounded-[2.5rem] bg-card/30 backdrop-blur-2xl border border-border flex flex-col md:flex-row items-center gap-10 max-w-5xl mx-auto shadow-2xl relative overflow-hidden">
          {/* Decoração de fundo do card */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-primary/5 rounded-full blur-3xl -mr-32 -mt-32" />
          
          <div className="flex flex-col items-center gap-2 p-8 bg-background/80 rounded-[2rem] border-2 border-primary/20 shadow-inner relative z-10 shrink-0 min-w-[220px]">
            <p className="text-6xl font-black text-primary tracking-tighter">
              10k<span className="text-3xl font-bold text-secondary">+</span>
            </p>
            <p className="text-[10px] text-muted-foreground uppercase tracking-[0.2em] font-black">Membros Ativos</p>
          </div>

          <div className="space-y-4 text-center md:text-left relative z-10">
            <h3 className="text-2xl md:text-3xl font-bold text-foreground tracking-tight">
              A maior rede de inteligência financeira independente.
            </h3>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base max-w-xl">
              Nosso ecossistema não entrega apenas ferramentas, entrega clareza técnica para que você pare de reagir ao mercado e comece a antecipar movimentos patrimoniais.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
