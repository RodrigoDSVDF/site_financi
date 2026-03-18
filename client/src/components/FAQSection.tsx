import { ChevronDown } from "lucide-react";
import { useState } from "react";

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const faqs = [
    {
      question: "O app funciona em Android e iOS?",
      answer: "Sim! O app está disponível tanto para Android quanto para iOS. Você pode sincronizar seus dados entre dispositivos automaticamente."
    },
    {
      question: "O ebook é digital?",
      answer: "Sim, o ebook é totalmente digital em formato PDF. Você recebe o acesso imediato após a compra e pode baixar em qualquer dispositivo."
    },
    {
      question: "Como recebo o acesso?",
      answer: "Após a compra, você receberá um email com o link de download do ebook e as instruções para ativar o app. O acesso é instantâneo."
    },
    {
      question: "Posso cancelar a assinatura do app a qualquer momento?",
      answer: "Sim! Você pode cancelar a assinatura a qualquer momento sem penalidades. Se cancelar dentro dos 7 dias, recebe 100% de reembolso."
    },
    {
      question: "Meus dados estão seguros?",
      answer: "Sim! Usamos criptografia de nível bancário para proteger todos os seus dados. Seus dados nunca são compartilhados com terceiros."
    },
    {
      question: "Há suporte ao cliente?",
      answer: "Sim! Oferecemos suporte por email em até 24 horas. Também temos uma comunidade ativa de usuários no Discord para trocar experiências."
    }
  ];

  return (
    <section className="py-16 md:py-24 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
          Perguntas Frequentes
        </h2>
        <p className="text-center text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
          Tire suas dúvidas antes de começar sua jornada para a liberdade financeira
        </p>

        <div className="max-w-3xl mx-auto space-y-4">
          {faqs.map((faq, index) => (
            <div 
              key={index}
              className="border border-gray-700 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow bg-gray-800"
            >
              <button
                onClick={() => setOpenIndex(openIndex === index ? null : index)}
                className="w-full px-6 py-4 flex items-center justify-between bg-gray-800 hover:bg-gray-700 transition-colors"
              >
                <h3 className="text-lg font-semibold text-white text-left">
                  {faq.question}
                </h3>
                <ChevronDown 
                  className={`w-5 h-5 text-cyan-400 flex-shrink-0 transition-transform ${
                    openIndex === index ? "rotate-180" : ""
                  }`}
                />
              </button>

              {openIndex === index && (
                <div className="px-6 py-4 bg-gray-900 border-t border-gray-700">
                  <p className="text-gray-300 leading-relaxed">
                    {faq.answer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
