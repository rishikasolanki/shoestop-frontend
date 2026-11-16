import axios from 'axios'

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL || 'https://shoestop-backend-zo6y.onrender.com',
})

export default api
