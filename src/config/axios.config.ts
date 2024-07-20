import axios from 'axios'

const BACKEND_URL = import.meta.env.VITE_BACKEND_URL || 'null'
console.log('Backend: ', BACKEND_URL)
const instance = axios.create({
  baseURL: BACKEND_URL,
  headers: {
    'ngrok-skip-browser-warning': true,
  },
})

export default instance
