import { useState } from 'react'
import { X, Loader2 } from 'lucide-react'

function AddProductModal({ isOpen, onClose, onSubmit }) {
  const [formData, setFormData] = useState({ name: '', url: '' })
  const [submitting, setSubmitting] = useState(false)

  if (!isOpen) return null

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await onSubmit(formData)
      setFormData({ name: '', url: '' })
      onClose()
    } catch (error) {
      console.error('Erro:', error)
    } finally {
      setSubmitting(false)
    }
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white border border-gray-200 rounded-xl w-full max-w-md">
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200">
          <h2 className="text-base sm:text-lg font-medium text-gray-900">Adicionar produto</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 p-1">
            <X className="w-5 h-5" />
          </button>
        </div>
        <form onSubmit={handleSubmit} className="p-4 sm:p-5">
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-600 mb-2">Nome do produto</label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                placeholder="Ex: PlayStation 5"
                required
                className="w-full px-3 sm:px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 text-sm sm:text-base"
              />
            </div>
            <div>
              <label className="block text-sm text-gray-600 mb-2">URL do produto</label>
              <input
                type="url"
                value={formData.url}
                onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                placeholder="https://loja.com/produto"
                required
                className="w-full px-3 sm:px-4 py-2.5 bg-gray-50 border border-gray-300 rounded-lg text-gray-900 placeholder-gray-400 focus:outline-none focus:border-emerald-500 text-sm sm:text-base"
              />
            </div>
          </div>
          <div className="flex gap-3 mt-6">
            <button
              type="button"
              onClick={onClose}
              className="flex-1 px-4 py-2.5 border border-gray-300 text-gray-600 hover:text-gray-900 hover:border-gray-400 rounded-lg transition-colors text-sm sm:text-base"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={submitting}
              className="flex-1 px-4 py-2.5 bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2 text-sm sm:text-base"
            >
              {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
              <span>Adicionar</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default AddProductModal
