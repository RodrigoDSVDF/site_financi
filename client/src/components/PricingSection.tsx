import { Check } from "lucide-react";
import { Button } from "@/components/ui/button";

export default function PricingSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-950">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-4">
          Oferta Especial
        </h2>
        <p className="text-center text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
          Leve os dois produtos por um preço imbatível
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {/* Ebook Price */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-center border-t-4 border-cyan-500">
            <h3 className="text-xl font-bold text-white mb-2">Ebook</h3>
            <p className="text-gray-400 mb-4">O Guia da Consciência Financeira</p>
            <div className="mb-6">
              <p className="text-3xl font-bold text-cyan-400">R$ 59,90</p>
              <p className="text-sm text-gray-500">Valor individual</p>
            </div>
            <ul className="space-y-2 text-left text-sm text-gray-300 mb-6">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                Acesso imediato
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                Formato digital
              </li>
            </ul>
          </div>

          {/* App Price */}
          <div className="bg-gray-900 p-6 rounded-lg shadow-lg text-center border-t-4 border-green-500">
            <h3 className="text-xl font-bold text-white mb-2">App</h3>
            <p className="text-gray-400 mb-4">Dashboard da sua Vida (Anual)</p>
            <div className="mb-6">
              <p className="text-3xl font-bold text-green-400">R$ 98</p>
              <p className="text-sm text-gray-500">Valor individual</p>
            </div>
            <ul className="space-y-2 text-left text-sm text-gray-300 mb-6">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                Acesso por 1 ano
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                iOS e Android
              </li>
            </ul>
          </div>

          {/* Combo Price - Destaque */}
          <div className="bg-gradient-to-br from-cyan-900/40 to-blue-900/40 p-6 rounded-lg shadow-xl border-4 border-cyan-500 relative">
            <div className="absolute -top-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-cyan-500 to-blue-600 text-white px-4 py-1 rounded-full text-sm font-bold shadow-lg">
              MELHOR OFERTA
            </div>
            <h3 className="text-xl font-bold text-white mb-2">Combo</h3>
            <p className="text-gray-300 mb-4">Ebook + App por 1 ano</p>
            <div className="mb-6">
              <p className="text-2xl text-gray-500 line-through">R$ 98</p>
              <p className="text-4xl font-bold text-cyan-400 mb-2">R$ 159,90</p>
              <p className="text-sm text-gray-400">por R$ 19,90</p>
            </div>
            <ul className="space-y-2 text-left text-sm text-gray-300 mb-6">
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                Ebook + App
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                Suporte por email
              </li>
              <li className="flex items-center gap-2">
                <Check className="w-4 h-4 text-green-400" />
                Atualizações grátis
              </li>
            </ul>
            <Button className="w-full bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-bold py-3 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50">
              Quero o Combo Agora
            </Button>
          </div>
        </div>

        {/* Garantia */}
        <div className="mt-12 bg-gray-900 p-8 rounded-lg shadow-lg border-l-4 border-green-500 max-w-2xl mx-auto">
          <h3 className="text-xl font-bold text-white mb-3">🛡️ Garantia de Satisfação</h3>
          <p className="text-gray-300 leading-relaxed">
            Se em 7 dias você não estiver satisfeito com o combo, devolvemos 100% do seu dinheiro. Sem perguntas. Sem burocracia. Sua satisfação é nossa prioridade.
          </p>
        </div>
      </div>
    </section>
  );
}
