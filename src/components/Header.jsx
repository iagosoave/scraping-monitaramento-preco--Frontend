import { Plus } from 'lucide-react'

function Header({ onAddClick }) {
  return (
    <>
      <div className="bg-amber-50 border-b border-amber-200 text-amber-800 text-xs sm:text-sm text-center px-4 py-2">
        Para testes utilize links de sites como{' '}
        <strong>Kabum</strong>, <strong>Trocafone</strong> e <strong>Dafiti</strong>.{' '}
        <a
          href="https://github.com/iagosoave/scraping-monitaramento-preco-Backend"
          target="_blank"
          rel="noopener noreferrer"
          className="underline font-medium hover:text-amber-900"
        >
          Link do repositório
        </a>
      </div>
      <header className="border-b border-gray-200 bg-white">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-4 flex justify-end">
        <button
          onClick={onAddClick}
          className="flex items-center gap-1 sm:gap-2 px-3 sm:px-4 py-2 sm:py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors text-sm sm:text-base"
        >
          <Plus className="w-4 h-4" />
          <span>adicionar</span>
        </button>
      </div>
    </header>
    </>
  )
}

export default Header
