import axios from 'axios'

const defaultBaseUrl = import.meta.env.DEV
  ? 'http://localhost:5000'
  : 'https://shoestop-backend-zo6y.onrender.com'

const configuredBaseUrl = (import.meta.env.VITE_API_BASE_URL || defaultBaseUrl)
  .trim()
  .replace(/^http:\/\/https:\/\//i, 'https://')
  .replace(/\/+$/, '')
  .replace(/\/api$/i, '')

const api = axios.create({ baseURL: configuredBaseUrl })

export default api
