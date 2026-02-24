import { apiRequest } from '../../helpers/apiHelper.js';

const API_URL = 'http://localhost:3000/customers';

export class CustomerModel {
    static async getCustomers() {
        return await apiRequest(API_URL);
    }

    static async addCustomer(customerData) {
        return await apiRequest(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customerData)
        });
    }

    static async updateCustomer(id, customerData) {
        return await apiRequest(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(customerData)
        });
    }

    static async deleteCustomer(id) {
       return await apiRequest(`${API_URL}/${id}`, { method: 'DELETE' });
    }
}

