import { Star } from "lucide-react";

export default function SocialProofSection() {
  const testimonials = [
    {
      name: "Maria Silva",
      role: "Consultora de RH",
      text: "Consegui reduzir meus gastos em 28% no primeiro mês. Agora sei exatamente onde cada real está indo.",
      savings: "28%"
    },
    {
      name: "João Santos",
      role: "Desenvolvedor",
      text: "O app é tão simples que minha mãe consegue usar. Organizei minha vida financeira e bati minhas metas em 4 meses.",
      savings: "Dívida zerada"
    },
    {
      name: "Ana Costa",
      role: "Professora",
      text: "Finalmente consegui juntar para minha primeira viagem internacional. O ebook mudou minha mentalidade.",
      savings: "Metas atingidas"
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
          Prova Social e Autoridade
        </h2>
        <p className="text-center text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
          Mais de 10.000 pessoas já organizaram suas vidas com nosso método
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
          {testimonials.map((testimonial, index) => (
            <div 
              key={index}
              className="bg-gradient-to-br from-gray-800 to-gray-900 p-8 rounded-lg shadow-lg border border-gray-700"
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                ))}
              </div>

              {/* Testimonial Text */}
              <p className="text-gray-300 mb-6 leading-relaxed italic">
                "{testimonial.text}"
              </p>

              {/* Author */}
              <div className="border-t border-gray-700 pt-4">
                <p className="font-bold text-white">{testimonial.name}</p>
                <p className="text-sm text-gray-400 mb-3">{testimonial.role}</p>
                <div className="bg-green-900/40 text-green-400 font-bold px-3 py-1 rounded-full text-sm inline-block border border-green-500/30">
                  {testimonial.savings}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Stats */}
        <div className="bg-gradient-to-r from-cyan-600/20 to-blue-600/20 text-white p-8 rounded-lg text-center border border-cyan-500/30">
          <p className="text-4xl font-bold mb-2">10.000+</p>
          <p className="text-xl text-gray-300">pessoas já transformaram suas finanças com nosso combo</p>
        </div>
      </div>
    </section>
  );
}
