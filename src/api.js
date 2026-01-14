import axios from 'axios'

const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000/api'

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

export const productService = {
  getAll: () => api.get('/products/'),
  getById: (id) => api.get(`/products/${id}/`),
  create: (data) => api.post('/products/', data),
  delete: (id) => api.delete(`/products/${id}/`),
  scrape: (id) => api.post(`/products/${id}/scrape/`),
  getHistory: (id) => api.get(`/products/${id}/history/`),
}

export default api
