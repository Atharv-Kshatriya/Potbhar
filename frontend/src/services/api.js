import axios from 'axios'

const api = axios.create({ baseURL: '/api/v1' })

api.interceptors.request.use(cfg => {
  const token = localStorage.getItem('potbhar_token')
  if (token) cfg.headers.Authorization = `Bearer ${token}`
  return cfg
})

api.interceptors.response.use(
  r => r,
  err => {
    if (err.response?.status === 401) {
      localStorage.removeItem('potbhar_token')
      localStorage.removeItem('potbhar_user')
      const publicPaths = ['/', '/login', '/register']
      if (!publicPaths.includes(window.location.pathname)) {
        window.location.href = '/login'
      }
    }
    return Promise.reject(err)
  }
)

// Auth
export const login = (email, password) => {
  const form = new FormData()
  form.append('username', email)
  form.append('password', password)
  return api.post('/auth/login', form)
}
export const register = (data) => api.post('/auth/register', data)
export const getMe = () => api.get('/auth/me')
export const createOrganization = (data) => api.post('/auth/create-organization', data)

// Food Batches
export const getFoodCategories = () => api.get('/food-batches/categories')
export const createBatch = (data) => api.post('/food-batches/', data)
export const listBatches = () => api.get('/food-batches/')
export const getBatch = (id) => api.get(`/food-batches/${id}`)
export const uploadBatchImage = (id, file) => {
  const fd = new FormData(); fd.append('file', file)
  return api.post(`/food-batches/${id}/upload-image`, fd, { headers: { 'Content-Type': 'multipart/form-data' } })
}
export const assessImage = (id) => api.post(`/food-batches/${id}/assess-image`)
export const assessRisk = (id) => api.post(`/food-batches/${id}/assess-risk`)
export const submitBatch = (id) => api.post(`/food-batches/${id}/submit`)
export const approveBatch = (id, data) => api.post(`/food-batches/${id}/approve`, data)
export const cancelBatch = (id) => api.delete(`/food-batches/${id}`)

// Organizations
export const listOrgs = () => api.get('/organizations/')
export const verifyOrg = (id) => api.post(`/organizations/${id}/verify`)
export const updateOrg = (id, data) => api.patch(`/organizations/${id}`, data)

// Recipient Requirements
export const createRequirement = (data) => api.post('/recipient-requirements/', data)
export const listRequirements = () => api.get('/recipient-requirements/')

// Matching
export const runMatching = (batchId) => api.post(`/matches/run-matching/${batchId}`)
export const listMatches = () => api.get('/matches/')
export const acceptMatch = (id) => api.post(`/matches/${id}/accept`)
export const declineMatch = (id) => api.post(`/matches/${id}/decline`)

// Deliveries
export const listDeliveries = () => api.get('/deliveries/')
export const recordPickup = (id) => api.post(`/deliveries/${id}/pickup`)
export const confirmDelivery = (id, data) => api.post(`/deliveries/${id}/confirm`, data)

// Waste
export const getWasteCategories = () => api.get('/waste-batches/categories')
export const createWaste = (data) => api.post('/waste-batches/', data)
export const listWaste = () => api.get('/waste-batches/')
export const assignProcessor = (wasteId, processorId) => api.post(`/waste-batches/${wasteId}/assign-processor/${processorId}`)
export const confirmWasteReceipt = (id, data) => api.post(`/waste-batches/${id}/confirm-receipt`, data)
export const confirmWasteProcessing = (id, data) => api.post(`/waste-batches/${id}/confirm-processing`, data)

// Analytics
export const getAnalyticsSummary = () => api.get('/analytics/summary')
export const getFoodRecovery = () => api.get('/analytics/food-recovery')
export const getWasteProcessing = () => api.get('/analytics/waste-processing')
export const getAdminAnalytics = () => api.get('/analytics/admin')

export default api
