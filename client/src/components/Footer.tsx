export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-950 text-gray-300 py-12 md:py-16 border-t border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-10 h-10 bg-gradient-to-br from-cyan-400 to-blue-600 rounded-lg flex items-center justify-center">
                <span className="text-gray-900 font-bold">LF</span>
              </div>
              <span className="font-bold text-lg text-white">Liberdade Financeira</span>
            </div>
            <p className="text-gray-500 text-sm">
              Transformando vidas através da educação financeira.
            </p>
          </div>

          {/* Links */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Produto</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Ebook</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">App</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Preços</a></li>
            </ul>
          </div>

          {/* Company */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Empresa</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Sobre</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Blog</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Contato</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-white">Legal</h4>
            <ul className="space-y-2 text-sm text-gray-500">
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Privacidade</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Termos</a></li>
              <li><a href="#" className="hover:text-cyan-400 transition-colors">Cookies</a></li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-gray-800 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-500 text-sm">
              © {currentYear} Liberdade Financeira. Todos os direitos reservados.
            </p>
            <div className="flex gap-6">
              <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors">
                <span className="sr-only">Facebook</span>
                f
              </a>
              <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors">
                <span className="sr-only">Twitter</span>
                𝕏
              </a>
              <a href="#" className="text-gray-500 hover:text-cyan-400 transition-colors">
                <span className="sr-only">Instagram</span>
                ◉
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
