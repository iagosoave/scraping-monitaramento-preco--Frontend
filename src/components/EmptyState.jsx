import { Package, Plus } from 'lucide-react'

function EmptyState({ onAddClick }) {
  return (
    <div className="text-center py-16 sm:py-20">
      <Package className="w-12 h-12 sm:w-16 sm:h-16 text-gray-300 mx-auto mb-4" />
      <h2 className="text-base sm:text-lg font-medium text-gray-700 mb-2">Nenhum produto cadastrado</h2>
      <p className="text-sm text-gray-400 mb-6">Comece adicionando um produto para monitorar</p>
      <button
        onClick={onAddClick}
        className="inline-flex items-center gap-2 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors"
      >
        <Plus className="w-4 h-4" />
        <span>Adicionar produto</span>
      </button>
    </div>
  )
}

export default EmptyState
