import { Plus, TrendingUp } from 'lucide-react'

function Header({ onAddClick }) {
  return (
    <header className="border-b border-navy-800">
      <div className="bg-navy-900 border-b border-navy-800">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-2">
          <p className="text-xs sm:text-sm text-navy-400 text-center">
            para testes, utilize links de produtos de sites como kabum e trocafone.
            <a 
              href="https://github.com/iagosoave/backend-pricewatch/tree/main" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-emerald-400 hover:text-emerald-300 ml-1"
            >
              ver repositorio
            </a>
          </p>
        </div>
      </div>
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 sm:py-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 sm:gap-3">
            
            <div>
              <h1 className="text-lg sm:text-xl font-semibold text-white">PriceWatch</h1>
              <p className="text-xs sm:text-sm text-navy-400 hidden sm:block">monitoramento de precos</p>
            </div>
          </div>
          <button
            onClick={onAddClick}
            className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors text-sm sm:text-base"
          >
            <Plus className="w-4 h-4" />
            <span className="hidden sm:inline">adicionar</span>
          </button>
        </div>
      </div>
    </header>
  )
}

export default Header