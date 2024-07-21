import axios from 'axios'

const axiosServices = axios.create({
  baseURL:
    'https://mock-data-api-nextjs.vercel.app/' || 'http://localhost:3010/',
})

// ==============================|| AXIOS - FOR MOCK SERVICES ||============================== //

axiosServices.interceptors.request.use(
  async (config) => {
    return config
  },
  (error) => {
    return Promise.reject(error)
  }
)

export default axiosServices

export const fetcher = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args]
  const res = await axiosServices.get(url, { ...config })

  return res.data
}

export const fetcherPost = async (args) => {
  const [url, config] = Array.isArray(args) ? args : [args]
  const res = await axiosServices.post(url, { ...config })

  return res.data
}
