import { RefreshCw, ExternalLink, TrendingUp, TrendingDown, Minus, Trash2, History } from 'lucide-react'

function ProductCard({ product, onScrape, onHistory, onDelete, scraping }) {
  const formatPrice = (price) => {
    if (!price) return '—'
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)
  }

  const formatDate = (date) => {
    if (!date) return 'Nunca verificado'
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }).format(new Date(date))
  }

  const getPriceTrend = (history) => {
    if (!history || history.length < 2) return null
    const current = parseFloat(history[0]?.price)
    const previous = parseFloat(history[1]?.price)
    if (current > previous) return 'up'
    if (current < previous) return 'down'
    return 'stable'
  }

  const getDomain = (url) => {
    try {
      return new URL(url).hostname.replace('www.', '')
    } catch {
      return url.substring(0, 30) + '...'
    }
  }

  const trend = getPriceTrend(product.price_history)
  const isLoading = scraping === product.id

  return (
    <div className="bg-navy-900 border border-navy-800 rounded-xl p-4 sm:p-5 hover:border-navy-700 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 sm:gap-4">
        <div className="flex-1 min-w-0">
          <h3 className="text-white font-medium mb-1 truncate text-sm sm:text-base">
            {product.name}
          </h3>
          <a
            href={product.url}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs sm:text-sm text-navy-400 hover:text-emerald-400 flex items-center gap-1 transition-colors"
          >
            <span className="truncate">{getDomain(product.url)}</span>
            <ExternalLink className="w-3 h-3 flex-shrink-0" />
          </a>
        </div>
        
        <div className="flex items-center sm:items-end justify-between sm:justify-end sm:flex-col gap-2">
          <div className="flex items-center gap-2">
            <span className="text-xl sm:text-2xl font-semibold text-white">
              {formatPrice(product.last_price)}
            </span>
            {trend === 'up' && <TrendingUp className="w-4 h-4 sm:w-5 sm:h-5 text-red-400" />}
            {trend === 'down' && <TrendingDown className="w-4 h-4 sm:w-5 sm:h-5 text-emerald-400" />}
            {trend === 'stable' && <Minus className="w-4 h-4 sm:w-5 sm:h-5 text-navy-400" />}
          </div>
          <p className="text-xs text-navy-500">{formatDate(product.last_checked)}</p>
        </div>
      </div>

      <div className="flex items-center gap-1 sm:gap-2 mt-4 pt-4 border-t border-navy-800">
        <button
          onClick={() => onScrape(product.id)}
          disabled={isLoading}
          className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 text-xs sm:text-sm text-emerald-400 hover:text-emerald-300 hover:bg-navy-800 rounded-lg transition-colors disabled:opacity-50"
        >
          <RefreshCw className={`w-3.5 h-3.5 sm:w-4 sm:h-4 ${isLoading ? 'animate-spin' : ''}`} />
          <span className="hidden xs:inline">{isLoading ? 'Atualizando...' : 'Atualizar'}</span>
        </button>
        <button
          onClick={() => onHistory(product)}
          className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 text-xs sm:text-sm text-emerald-400 hover:text-emerald-300 hover:bg-navy-800 rounded-lg transition-colors"
        >
          <History className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden xs:inline">Histórico</span>
        </button>
        <button
          onClick={() => onDelete(product.id)}
          className="flex items-center gap-1.5 px-2 sm:px-3 py-1.5 text-xs sm:text-sm text-red-400 hover:text-red-300 hover:bg-navy-800 rounded-lg transition-colors ml-auto"
        >
          <Trash2 className="w-3.5 h-3.5 sm:w-4 sm:h-4" />
          <span className="hidden sm:inline">Excluir</span>
        </button>
      </div>
    </div>
  )
}

export default ProductCard
