import { Star, Zap, TrendingUp, Award, UserCheck } from "lucide-react";

export default function SocialProofSection() {
  const testimonials = [
    {
      name: "Maria Silva",
      role: "Consultora de RH",
      text: "Consegui reduzir meus gastos em 28% no primeiro mês. Agora sei exatamente onde cada real está indo.",
      savings: "28%",
      icon: TrendingUp, // Ícone de crescimento
    },
    {
      name: "João Santos",
      role: "Desenvolvedor",
      text: "O app é tão simples que minha mãe consegue usar. Organizei minha vida financeira e bati minhas metas em 4 meses.",
      savings: "Dívida zerada",
      icon: Award, // Ícone de conquista
    },
    {
      name: "Ana Costa",
      role: "Professora",
      text: "Finalmente consegui juntar para minha primeira viagem internacional. O ebook mudou minha mentalidade.",
      savings: "Metas atingidas",
      icon: Zap, // Ícone de impacto/velocidade
    },
    {
      name: "Pedro Lima",
      role: "Engenheiro",
      text: "A clareza técnica que o painel oferece me permitiu antecipar a compra do meu apartamento em 2 anos.",
      savings: "Patrimônio acelerado",
      icon: UserCheck, // Ícone de validação/verificação
    },
    {
      name: "Carla Souza",
      role: "Designer",
      text: "O combo foi o melhor investimento do ano. A organização me deu paz de espírito para focar no meu trabalho.",
      savings: "Foco & Paz",
      icon: Zap, // Ícone de impacto/velocidade
    },
  ];

  // Duplicamos a lista para criar o efeito de "carrossel infinito"
  const duplicatedTestimonials = [...testimonials, ...testimonials];

  return (
    <section className="relative py-20 md:py-32 bg-background overflow-hidden">
      {/* Background Decorativo - Brilho sutil ao fundo */}
      <div className="absolute inset-0 z-0 opacity-10">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-primary/10 rounded-full blur-[140px]" />
      </div>

      <div className="container relative z-10 mx-auto">
        <div className="text-center mb-16 md:mb-24 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-bold uppercase tracking-wider mx-auto">
            <UserCheck className="w-4 h-4" />
            Impacto Real e Autoridade
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight max-w-3xl mx-auto">
            Mais de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">10.000 pessoas</span> já transformaram suas finanças com nosso método.
          </div>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Não acredite apenas no que dizemos. Acredite nos resultados de quem já está no controle.
          </div>
        </div>

        {/* Carrossel Infinito Moderno */}
        <div className="relative group overflow-hidden py-12">
          {/* Sombra de desvanecimento lateral para dar profundidade */}
          <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-background to-transparent z-10 pointer-events-none"></div>
          <div className="absolute inset-y-0 right-0 w-24 bg-gradient-to-l from-background to-transparent z-10 pointer-events-none"></div>

          {/* Animação do Carrossel (tw-animate-css) */}
          <div className="flex animate-scroll hover:[animation-play-state:paused] gap-8 w-[calc(2*340px*5)] md:w-[calc(2*400px*5)] lg:w-[calc(2*440px*5)]">
            {duplicatedTestimonials.map((testimonial, index) => (
              <div 
                key={index}
                className="relative p-8 rounded-3xl bg-card/40 backdrop-blur-md border border-border group transition-all duration-300 hover:border-primary/50 hover:-translate-y-1 w-[340px] md:w-[400px] lg:w-[440px] shrink-0"
              >
                {/* Ícone Decorativo (Ciano Neon) */}
                <testimonial.icon className="absolute -top-5 -left-5 w-10 h-10 p-2 bg-background/80 rounded-full border border-primary/20 text-primary shadow-xl" />

                {/* Stars e Savings Tag */}
                <div className="flex items-center justify-between gap-4 mb-6">
                  <div className="flex gap-1">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <div className="bg-secondary/10 text-secondary font-black px-4 py-1.5 rounded-full text-xs uppercase tracking-wider border border-secondary/20 shadow-inner">
                    {testimonial.savings}
                  </div>
                </div>

                {/* Testimonial Text */}
                <p className="text-foreground leading-relaxed italic mb-8 relative font-medium text-base md:text-lg">
                  <span className="absolute -left-6 -top-4 text-6xl text-primary/10 font-black">"</span>
                  {testimonial.text}
                  <span className="absolute -right-2 -bottom-4 text-6xl text-primary/10 font-black">"</span>
                </div>

                {/* Author Modernizado */}
                <div className="flex items-center gap-4 pt-6 border-t border-border mt-auto">
                  <div className="w-12 h-12 rounded-full bg-card/60 flex items-center justify-center border-2 border-primary/20 shadow-inner text-primary/80 font-black text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-foreground text-lg tracking-tight">{testimonial.name}</p>
                    <p className="text-sm text-muted-foreground uppercase tracking-wider font-semibold">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Stats Section Modernizada com Glassmorphism */}
        <div className="mt-20 md:mt-28 p-10 md:p-12 rounded-3xl bg-card/60 backdrop-blur-xl border border-border flex flex-col md:flex-row items-center gap-8 md:gap-12 max-w-5xl mx-auto shadow-[0_0_80px_rgba(0,217,255,0.15)] overflow-hidden relative">
          
          {/* Floating Element Decorativo */}
          <div className="absolute -bottom-6 -left-6 bg-gradient-to-br from-primary to-secondary p-4 rounded-2xl shadow-xl animate-bounce duration-[4000ms]">
            <Award className="w-10 h-10 text-primary-foreground" />
          </div>

          <div className="space-y-3 text-center md:text-left md:flex-1">
            <p className="text-xs text-secondary uppercase tracking-widest font-black">Nossa Comunidade</p>
            <h3 className="text-3xl md:text-4xl font-bold text-foreground leading-tight tracking-tight">
              A maior rede de transformação patrimonial independente do Brasil.
            </h3>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              Nosso método construiu um ecossistema que permite a qualquer pessoa, independente da sua renda atual, elevar seu patamar de gestão e acelerar sua independência financeira.
            </p>
          </div>
          
          <div className="flex flex-col items-center gap-2 p-6 bg-background rounded-2xl border-2 border-primary/20 relative">
            <p className="text-7xl font-black text-primary tracking-tighter relative">
              10.000<span className="text-5xl font-extrabold align-top text-chart-3">+</span>
            </p>
            <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-semibold">Vidas Transformadas</p>
          </div>
        </div>
      </div>
    </section>
  );
}
