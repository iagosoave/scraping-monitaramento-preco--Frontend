import { Plus } from 'lucide-react'

function Header({ onAddClick }) {
  return (
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
  )
}

export default Header
