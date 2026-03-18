import { BookOpen, Smartphone, CheckCircle } from "lucide-react";

export default function ProductsSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-900">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          O Que Você Recebe
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Ebook Block */}
          <div className="bg-gradient-to-br from-blue-900/40 to-cyan-900/40 p-8 rounded-lg shadow-lg border border-cyan-500/30 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                <BookOpen className="w-6 h-6 text-gray-900" />
              </div>
              <h3 className="text-2xl font-bold text-white">O Guia da Consciência Financeira</h3>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Um ebook completo que ensina os fundamentos da educação financeira de forma prática e acessível.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Diagnóstico de Gastos</p>
                  <p className="text-sm text-gray-400">Identifique seus padrões de consumo</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Como Sair das Dívidas</p>
                  <p className="text-sm text-gray-400">Estratégias comprovadas para se libertar</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Criar sua Primeira Reserva</p>
                  <p className="text-sm text-gray-400">Construa sua segurança financeira</p>
                </div>
              </div>
            </div>
          </div>

          {/* App Block */}
          <div className="bg-gradient-to-br from-green-900/40 to-cyan-900/40 p-8 rounded-lg shadow-lg border border-green-500/30 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-cyan-500 rounded-lg flex items-center justify-center">
                <Smartphone className="w-6 h-6 text-gray-900" />
              </div>
              <h3 className="text-2xl font-bold text-white">O Dashboard da sua Vida</h3>
            </div>

            <p className="text-gray-300 mb-6 leading-relaxed">
              Um app inteligente que automatiza o controle de suas finanças com gráficos e insights em tempo real.
            </p>

            <div className="space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Cadastro Rápido de Gastos</p>
                  <p className="text-sm text-gray-400">Registre em segundos via voz ou digitação</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Gráficos Automáticos por Categoria</p>
                  <p className="text-sm text-gray-400">Visualize seus gastos de forma clara</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Alertas de Limite de Orçamento</p>
                  <p className="text-sm text-gray-400">Nunca ultrapasse seu orçamento</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 flex-shrink-0 mt-0.5" />
                <div>
                  <p className="font-semibold text-white">Segurança Total de Dados</p>
                  <p className="text-sm text-gray-400">Seus dados são criptografados</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
