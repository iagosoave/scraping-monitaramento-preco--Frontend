import { X, TrendingUp, TrendingDown } from 'lucide-react'

function HistoryModal({ product, history, onClose }) {
  if (!product) return null

  const formatPrice = (price) => {
    return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(price)
  }

  const formatDate = (date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit', month: '2-digit', year: 'numeric',
      hour: '2-digit', minute: '2-digit'
    }).format(new Date(date))
  }

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center p-4 z-50">
      <div className="bg-white border border-gray-200 rounded-xl w-full max-w-md max-h-[80vh] flex flex-col">
        <div className="flex items-center justify-between p-4 sm:p-5 border-b border-gray-200">
          <div className="min-w-0 flex-1 mr-4">
            <h2 className="text-base sm:text-lg font-medium text-gray-900">Histórico de preços</h2>
            <p className="text-xs sm:text-sm text-gray-500 truncate">{product.name}</p>
          </div>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-700 p-1 flex-shrink-0">
            <X className="w-5 h-5" />
          </button>
        </div>
        <div className="flex-1 overflow-y-auto p-4 sm:p-5">
          {history.length === 0 ? (
            <p className="text-center text-gray-400 py-8 text-sm">Nenhum histórico disponível</p>
          ) : (
            <div className="space-y-2">
              {history.map((item, index) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between py-3 px-3 bg-gray-50 rounded-lg"
                >
                  <span className="text-gray-500 text-xs sm:text-sm">
                    {formatDate(item.recorded_at)}
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-gray-900 font-medium text-sm sm:text-base">
                      {formatPrice(item.price)}
                    </span>
                    {index < history.length - 1 && (
                      <>
                        {parseFloat(item.price) > parseFloat(history[index + 1]?.price) && (
                          <TrendingUp className="w-4 h-4 text-red-500" />
                        )}
                        {parseFloat(item.price) < parseFloat(history[index + 1]?.price) && (
                          <TrendingDown className="w-4 h-4 text-emerald-500" />
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
  )
}

export default HistoryModal
