import { Heart, Clock, Target } from "lucide-react";

export default function BenefitsSection() {
  const benefits = [
    {
      icon: Heart,
      title: "Paz de Espírito",
      description: "Saiba exatamente quanto pode gastar no fim de semana. Sem surpresas desagradáveis.",
      color: "text-red-400"
    },
    {
      icon: Clock,
      title: "Tempo",
      description: "Chega de gastar horas em planilhas de Excel. O app faz tudo automaticamente.",
      color: "text-cyan-400"
    },
    {
      icon: Target,
      title: "Metas Reais",
      description: "Veja o progresso da sua reserva de emergência ou da viagem dos sonhos em tempo real.",
      color: "text-green-400"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gradient-to-b from-gray-950 to-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
          Benefícios Reais
        </h2>
        <p className="text-center text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
          Não apenas funções técnicas, mas transformações reais na sua vida financeira
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div 
                key={index}
                className="bg-gray-900 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300 border-t-4 border-cyan-500"
              >
                <div className="w-14 h-14 rounded-lg bg-gray-800 flex items-center justify-center mb-4">
                  <Icon className={`w-7 h-7 ${benefit.color}`} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">
                  ✅ {benefit.title}
                </h3>
                <p className="text-gray-400 leading-relaxed">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
