import { Check, ShieldCheck, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PricingSection() {
  
  // Função para disparar os rastreios (Mantida intacta)
  const handlePurchase = (productName: string, value: number) => {
    if (typeof window !== "undefined" && window.fbq) {
      window.fbq('track', 'InitiateCheckout', {
        content_name: productName,
        currency: 'BRL',
        value: value,
      });
    }

    if (typeof window !== "undefined" && window.ttq) {
      window.ttq.track('InitiateCheckout', {
        contents: [{
          content_name: productName,
          quantity: 1,
          price: value,
        }],
        value: value,
        currency: 'BRL',
      });
    }
  };

  const tiers = [
    {
      name: "Ebook",
      description: "O Guia da Consciência Financeira",
      price: "59,90",
      priceDetail: "Valor individual",
      features: ["Acesso imediato", "Formato digital", "Conteúdo prático"],
      borderColor: "border-primary", // Ciano
      textColor: "text-primary",
    },
    {
      name: "App",
      description: "Dashboard da sua Vida (Anual)",
      price: "98",
      priceDetail: "Acesso por 1 ano",
      features: ["iOS e Android", "Gráficos automáticos", "Sincronização na nuvem"],
      borderColor: "border-secondary", // Verde Esmeralda
      textColor: "text-secondary",
    },
  ];

  return (
    <section className="relative py-20 md:py-32 bg-background overflow-hidden">
      {/* Background Decorativo - Brilho sutil ao fundo */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-primary/10 rounded-full blur-[140px]" />
      </div>

      <div className="container relative z-10 mx-auto">
        <div className="text-center mb-16 space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary/10 border border-secondary/20 text-secondary text-xs font-bold uppercase tracking-wider">
            <Zap className="w-4 h-4" />
            Oferta Exclusiva de Lançamento
          </div>
          <h2 className="text-4xl md:text-5xl font-bold text-foreground leading-tight tracking-tight">
            Seu próximo nível de <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-secondary">gestão financeira.</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Escolha o plano que melhor se adapta à sua jornada rumo à liberdade patrimonial.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start max-w-7xl mx-auto">
          {tiers.map((tier, index) => (
            <div key={index} className={`relative p-8 rounded-3xl bg-card/40 backdrop-blur-md border border-border group transition-all duration-300 hover:border-${tier.borderColor}/50 hover:-translate-y-1`}>
              <div className={`absolute top-0 left-8 right-8 h-1 bg-${tier.borderColor} rounded-b-full`}></div>
              
              <h3 className="text-2xl font-bold text-foreground mb-1">{tier.name}</h3>
              <p className="text-muted-foreground text-sm mb-6">{tier.description}</p>
              
              <div className="mb-8 p-5 bg-background/60 rounded-xl border border-border">
                <p className={`text-5xl font-extrabold ${tier.textColor} tracking-tight`}>
                  <span className="text-2xl font-medium align-top">R$</span> {tier.price}
                </p>
                <p className="text-xs text-muted-foreground mt-1 uppercase tracking-wider font-semibold">{tier.priceDetail}</p>
              </div>
              
              <ul className="space-y-3 text-sm text-foreground/90 mb-8">
                {tier.features.map((feature) => (
                  <li key={feature} className="flex items-center gap-3">
                    <Check className={`w-5 h-5 ${tier.textColor} shrink-0`} />
                    {feature}
                  </li>
                ))}
              </ul>
              
              <Button variant="outline" className="w-full border-border hover:bg-card/60 text-foreground rounded-xl">
                Saiba Mais
              </Button>
            </div>
          ))}

          {/* Combo Price - Destaque Absoluto (Glassmorphism Neon) */}
          <div className="relative p-8 rounded-3xl bg-gradient-to-br from-primary/10 to-secondary/10 backdrop-blur-xl border-2 border-primary group flex flex-col justify-between shadow-[0_0_60px_rgba(0,217,255,0.15)] lg:-translate-y-4">
            
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-primary to-secondary text-primary-foreground px-6 py-1.5 rounded-full text-xs font-black uppercase tracking-widest shadow-lg">
              MELHOR CUSTO-BENEFÍCIO
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-foreground mb-1">Combo Total</h3>
              <p className="text-muted-foreground text-sm mb-6">Ebook + App por 1 ano completo</p>
              
              <div className="mb-8 p-5 bg-background/80 rounded-xl border-2 border-primary/30 relative overflow-hidden">
                <div className="absolute -top-10 -right-10 w-24 h-24 bg-primary/20 rounded-full blur-3xl"></div>
                <p className="text-2xl text-muted-foreground line-through font-medium align-middle">
                  <span className="text-sm">R$</span> 157,90
                </p>
                <p className="text-6xl font-black text-primary tracking-tighter mt-1">
                  <span className="text-3xl font-bold align-top">R$</span> 9,90
                </p>
                <p className="text-xs text-primary/80 mt-1 uppercase tracking-wider font-bold">Oferta limitada de lançamento</p>
              </div>
              
              <ul className="space-y-3 text-sm text-foreground mb-8 font-medium">
                <li className="flex items-center gap-3">
                  <Zap className="w-5 h-5 text-secondary shrink-0" />
                  Acesso Total ao Ebook + App
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0" />
                  Suporte VIP por Email
                </li>
                <li className="flex items-center gap-3">
                  <Check className="w-5 h-5 text-primary shrink-0" />
                  Atualizações Gratuitas
                </li>
              </ul>
            </div>
            
            <Button 
              asChild
              onClick={() => handlePurchase('Combo Ebook + App', 9.90)}
              className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-black py-4 rounded-xl transition-all duration-500 hover:shadow-[0_0_40px_rgba(0,217,255,0.5)] hover:-translate-y-1 flex items-center justify-center gap-3 h-auto text-lg"
            >
              <a href="https://pay.cakto.com.br/xxienb8_809928" target="_blank" rel="noopener noreferrer">
                QUERO O COMBO AGORA
              </a>
            </Button>
          </div>
        </div>

        {/* Garantia Modernizada */}
        <div className="mt-20 p-8 rounded-3xl bg-card/60 backdrop-blur-md border border-border flex flex-col md:flex-row items-center gap-6 max-w-4xl mx-auto shadow-inner">
          <ShieldCheck className="w-16 h-16 text-secondary shrink-0 md:self-start mt-1" />
          <div className="space-y-3 text-center md:text-left">
            <h3 className="text-2xl font-bold text-foreground tracking-tight">Garantia Blindada de Satisfação</h3>
            <p className="text-muted-foreground leading-relaxed text-sm md:text-base">
              Experimente o Combo <span className="text-foreground font-semibold">Liberdade Financeira</span> por 7 dias inteiros. Se você não notar uma elevação imediata no seu nível de controle patrimonial, devolvemos 100% do seu investimento. Sem perguntas. Seu risco é zero.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
