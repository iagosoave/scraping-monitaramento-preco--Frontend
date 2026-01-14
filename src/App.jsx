import { useState, useEffect } from 'react'
import { 
  Eye, 
  Plus, 
  Trash2, 
  RefreshCw, 
  ExternalLink,
  TrendingUp,
  TrendingDown,
  Minus,
  X,
  Loader2,
  Package
} from 'lucide-react'
import { productService } from './api'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [showHistory, setShowHistory] = useState(null)
  const [history, setHistory] = useState([])
  const [formData, setFormData] = useState({ name: '', url: '' })
  const [submitting, setSubmitting] = useState(false)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const response = await productService.getAll()
      setProducts(response.data.results || response.data)
    } catch (error) {
      console.error('Erro ao carregar produtos:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    try {
      await productService.create({ ...formData, start_scraping: true })
      setFormData({ name: '', url: '' })
      setShowModal(false)
      loadProducts()
    } catch (error) {
      console.error('Erro ao criar:', error)
    } finally {
      setSubmitting(false)
    }
  }

  const handleDelete = async (id) => {
    if (!confirm('Tem certeza que deseja excluir?')) return
    try {
      await productService.delete(id)
      loadProducts()
    } catch (error) {
      console.error('Erro ao excluir:', error)
    }
  }

  const handleScrape = async (id) => {
    try {
      await productService.scrape(id)
      setTimeout(loadProducts, 2000)
    } catch (error) {
      console.error('Erro ao atualizar preço:', error)
    }
  }

  const handleShowHistory = async (product) => {
    setShowHistory(product)
    try {
      const response = await productService.getHistory(product.id)
      setHistory(response.data)
    } catch (error) {
      console.error('Erro ao carregar histórico:', error)
    }
  }

  const formatPrice = (price) => {
    if (!price) return '—'
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(price)
  }

  const formatDate = (date) => {
    if (!date) return '—'
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(new Date(date))
  }

  const getPriceTrend = (history) => {
    if (history.length < 2) return null
    const current = parseFloat(history[0]?.price)
    const previous = parseFloat(history[1]?.price)
    if (current > previous) return 'up'
    if (current < previous) return 'down'
    return 'stable'
  }

  return (
    <div className="min-h-screen bg-navy-950">
      {/* Header */}
      <header className="border-b border-navy-800">
        <div className="max-w-6xl mx-auto px-6 py-6">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-navy-800 rounded-lg flex items-center justify-center">
                <Eye className="w-5 h-5 text-navy-300" />
              </div>
              <div>
                <h1 className="text-xl font-semibold text-white">PriceWatch</h1>
                <p className="text-sm text-navy-400">Monitoramento de preços</p>
              </div>
            </div>
            <button
              onClick={() => setShowModal(true)}
              className="flex items-center gap-2 px-4 py-2.5 bg-navy-800 hover:bg-navy-700 text-white rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar</span>
            </button>
          </div>
        </div>
      </header>

      {/* Main */}
      <main className="max-w-6xl mx-auto px-6 py-8">
        {loading ? (
          <div className="flex items-center justify-center py-20">
            <Loader2 className="w-8 h-8 text-navy-400 animate-spin" />
          </div>
        ) : products.length === 0 ? (
          <div className="text-center py-20">
            <Package className="w-16 h-16 text-navy-700 mx-auto mb-4" />
            <h2 className="text-lg font-medium text-navy-300 mb-2">Nenhum produto cadastrado</h2>
            <p className="text-navy-500 mb-6">Comece adicionando um produto para monitorar</p>
            <button
              onClick={() => setShowModal(true)}
              className="inline-flex items-center gap-2 px-4 py-2.5 bg-navy-800 hover:bg-navy-700 text-white rounded-lg transition-colors"
            >
              <Plus className="w-4 h-4" />
              <span>Adicionar produto</span>
            </button>
          </div>
        ) : (
          <div className="grid gap-4">
            {products.map((product) => (
              <div
                key={product.id}
                className="bg-navy-900 border border-navy-800 rounded-xl p-5 hover:border-navy-700 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <h3 className="text-white font-medium mb-1 truncate">
                      {product.name}
                    </h3>
                    <a
                      href={product.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-sm text-navy-400 hover:text-navy-300 flex items-center gap-1 truncate"
                    >
                      <span className="truncate">{product.url}</span>
                      <ExternalLink className="w-3 h-3 flex-shrink-0" />
                    </a>
                  </div>
                  
                  <div className="text-right">
                    <div className="flex items-center gap-2 justify-end">
                      <span className="text-2xl font-semibold text-white">
                        {formatPrice(product.last_price)}
                      </span>
                      {product.price_history && getPriceTrend(product.price_history) === 'up' && (
                        <TrendingUp className="w-5 h-5 text-red-400" />
                      )}
                      {product.price_history && getPriceTrend(product.price_history) === 'down' && (
                        <TrendingDown className="w-5 h-5 text-green-400" />
                      )}
                      {product.price_history && getPriceTrend(product.price_history) === 'stable' && (
                        <Minus className="w-5 h-5 text-navy-400" />
                      )}
                    </div>
                    <p className="text-xs text-navy-500 mt-1">
                      {product.last_checked ? `Atualizado ${formatDate(product.last_checked)}` : 'Nunca verificado'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 mt-4 pt-4 border-t border-navy-800">
                  <button
                    onClick={() => handleScrape(product.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-navy-300 hover:text-white hover:bg-navy-800 rounded-lg transition-colors"
                  >
                    <RefreshCw className="w-4 h-4" />
                    <span>Atualizar</span>
                  </button>
                  <button
                    onClick={() => handleShowHistory(product)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-navy-300 hover:text-white hover:bg-navy-800 rounded-lg transition-colors"
                  >
                    <TrendingUp className="w-4 h-4" />
                    <span>Histórico</span>
                  </button>
                  <button
                    onClick={() => handleDelete(product.id)}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm text-red-400 hover:text-red-300 hover:bg-navy-800 rounded-lg transition-colors ml-auto"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>Excluir</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </main>

      {/* Modal Adicionar */}
      {showModal && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-navy-900 border border-navy-800 rounded-xl w-full max-w-md">
            <div className="flex items-center justify-between p-5 border-b border-navy-800">
              <h2 className="text-lg font-medium text-white">Adicionar produto</h2>
              <button
                onClick={() => setShowModal(false)}
                className="text-navy-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleCreate} className="p-5">
              <div className="space-y-4">
                <div>
                  <label className="block text-sm text-navy-300 mb-2">Nome do produto</label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="Ex: PlayStation 5"
                    required
                    className="w-full px-4 py-2.5 bg-navy-800 border border-navy-700 rounded-lg text-white placeholder-navy-500 focus:outline-none focus:border-navy-500"
                  />
                </div>
                <div>
                  <label className="block text-sm text-navy-300 mb-2">URL do produto</label>
                  <input
                    type="url"
                    value={formData.url}
                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                    placeholder="https://loja.com/produto"
                    required
                    className="w-full px-4 py-2.5 bg-navy-800 border border-navy-700 rounded-lg text-white placeholder-navy-500 focus:outline-none focus:border-navy-500"
                  />
                </div>
              </div>
              <div className="flex gap-3 mt-6">
                <button
                  type="button"
                  onClick={() => setShowModal(false)}
                  className="flex-1 px-4 py-2.5 border border-navy-700 text-navy-300 hover:text-white hover:border-navy-600 rounded-lg transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  disabled={submitting}
                  className="flex-1 px-4 py-2.5 bg-navy-700 hover:bg-navy-600 text-white rounded-lg transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  {submitting && <Loader2 className="w-4 h-4 animate-spin" />}
                  <span>Adicionar</span>
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Modal Histórico */}
      {showHistory && (
        <div className="fixed inset-0 bg-black/60 flex items-center justify-center p-4 z-50">
          <div className="bg-navy-900 border border-navy-800 rounded-xl w-full max-w-md max-h-[80vh] flex flex-col">
            <div className="flex items-center justify-between p-5 border-b border-navy-800">
              <div>
                <h2 className="text-lg font-medium text-white">Histórico de preços</h2>
                <p className="text-sm text-navy-400">{showHistory.name}</p>
              </div>
              <button
                onClick={() => { setShowHistory(null); setHistory([]) }}
                className="text-navy-400 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-5">
              {history.length === 0 ? (
                <p className="text-center text-navy-500 py-8">Nenhum histórico disponível</p>
              ) : (
                <div className="space-y-3">
                  {history.map((item, index) => (
                    <div
                      key={item.id}
                      className="flex items-center justify-between py-3 border-b border-navy-800 last:border-0"
                    >
                      <span className="text-navy-400 text-sm">
                        {formatDate(item.recorded_at)}
                      </span>
                      <div className="flex items-center gap-2">
                        <span className="text-white font-medium">
                          {formatPrice(item.price)}
                        </span>
                        {index < history.length - 1 && (
                          <>
                            {parseFloat(item.price) > parseFloat(history[index + 1]?.price) && (
                              <TrendingUp className="w-4 h-4 text-red-400" />
                            )}
                            {parseFloat(item.price) < parseFloat(history[index + 1]?.price) && (
                              <TrendingDown className="w-4 h-4 text-green-400" />
                            )}
                          </>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default App
