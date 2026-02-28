import api from '@/shared/api/axiosInstance'

export const customerApi = {
  getAll() {
    return api.get('/customers')
  },
  getById(id) {
    return api.get(`/customers/${id}`)
  },
  create(customer) {
    return api.post('/customers', customer)
  },
  update(id, customer) {
    return api.put(`/customers/${id}`, customer)
  },
  delete(id) {
    return api.delete(`/customers/${id}`)
  }
}

