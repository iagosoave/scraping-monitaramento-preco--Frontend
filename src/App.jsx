import { useState, useEffect } from 'react'
import { productService } from './api'
import { Header, ProductCard, EmptyState, AddProductModal, HistoryModal, Loading } from './components'

function App() {
  const [products, setProducts] = useState([])
  const [loading, setLoading] = useState(true)
  const [showModal, setShowModal] = useState(false)
  const [showHistory, setShowHistory] = useState(null)
  const [history, setHistory] = useState([])
  const [scraping, setScraping] = useState(null)

  useEffect(() => {
    loadProducts()
  }, [])

  const loadProducts = async () => {
    try {
      const response = await productService.getAll()
      setProducts(response.data.results || response.data)
    } catch (error) {
      console.error('Erro ao carregar:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleCreate = async (formData) => {
    await productService.create({ ...formData, start_scraping: true })
    loadProducts()
  }

  const handleDelete = async (id) => {
    if (!confirm('Excluir este produto?')) return
    await productService.delete(id)
    loadProducts()
  }

  const handleScrape = async (id) => {
    setScraping(id)
    try {
      await productService.scrape(id)
      setTimeout(() => {
        loadProducts()
        setScraping(null)
      }, 3000)
    } catch (error) {
      console.error('Erro:', error)
      setScraping(null)
    }
  }

  const handleShowHistory = async (product) => {
    setShowHistory(product)
    try {
      const response = await productService.getHistory(product.id)
      setHistory(response.data)
    } catch (error) {
      console.error('Erro:', error)
    }
  }

  const handleCloseHistory = () => {
    setShowHistory(null)
    setHistory([])
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header onAddClick={() => setShowModal(true)} />

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-6 sm:py-8">
        {loading ? (
          <Loading />
        ) : products.length === 0 ? (
          <EmptyState onAddClick={() => setShowModal(true)} />
        ) : (
          <div className="grid gap-3 sm:gap-4">
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                onScrape={handleScrape}
                onHistory={handleShowHistory}
                onDelete={handleDelete}
                scraping={scraping}
              />
            ))}
          </div>
        )}
      </main>

      <AddProductModal
        isOpen={showModal}
        onClose={() => setShowModal(false)}
        onSubmit={handleCreate}
      />

      <HistoryModal
        product={showHistory}
        history={history}
        onClose={handleCloseHistory}
      />
    </div>
  )
}

export default App
