import { Button } from "@/components/ui/button";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full bg-gray-900 border-b border-gray-800 shadow-lg">
      <div className="container mx-auto px-4 py-4 flex items-center justify-between">
        {/* Logo */}
        <div className="flex items-center gap-2">
          <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center shadow-lg">
            <span className="text-gray-900 font-bold text-lg">LF</span>
          </div>
          <span className="font-bold text-xl text-white">Liberdade Financeira</span>
        </div>

        {/* CTA Button */}
        <Button 
          className="bg-cyan-500 hover:bg-cyan-400 text-gray-900 font-semibold px-6 py-2 rounded-lg transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/50"
        >
          Quero meu Combo
        </Button>
      </div>
    </header>
  );
}
