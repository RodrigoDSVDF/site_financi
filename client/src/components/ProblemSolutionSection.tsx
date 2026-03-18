export default function ProblemSolutionSection() {
  return (
    <section className="py-16 md:py-24 bg-gray-950">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center text-white mb-12">
          A solução do seu problema na palma da mão
        </h2>

        {/* Problema e Solução Visual */}
        <div className="mb-12">
          <img 
            src="./f6.png"
            alt="Problema vs Solução"
            className="w-full rounded-lg shadow-2xl"
          />
        </div>

        {/* Descrição */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Problema */}
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg border-l-4 border-red-500">
            <h3 className="text-2xl font-bold text-white mb-4">O Problema</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Cansado de planilhas complexas ou de ver o saldo sumir antes do dia 20?
            </p>
            <p className="text-gray-300 leading-relaxed">
              A categoria <span className="font-bold text-red-400">'Outros'</span> é o maior inimigo do seu bolso. Você gasta sem saber exatamente com o quê, e no final do mês não consegue entender para onde foi seu dinheiro.
            </p>
          </div>

          {/* Solução */}
          <div className="bg-gray-900 p-8 rounded-lg shadow-lg border-l-4 border-green-500">
            <h3 className="text-2xl font-bold text-white mb-4">A Solução</h3>
            <p className="text-gray-300 leading-relaxed mb-4">
              Nós unimos a <span className="font-bold text-cyan-400">teoria com a prática</span>.
            </p>
            <ul className="space-y-3">
              <li className="flex items-start gap-3">
                <span className="text-green-400 font-bold">📚</span>
                <span className="text-gray-300">O <span className="font-semibold">Ebook</span> ensina a mentalidade certa</span>
              </li>
              <li className="flex items-start gap-3">
                <span className="text-green-400 font-bold">⚙️</span>
                <span className="text-gray-300">O <span className="font-semibold">App</span> fornece a execução automática</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
