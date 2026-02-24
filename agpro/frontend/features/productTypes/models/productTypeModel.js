import { apiRequest } from '../../helpers/apiHelper.js';

const API_URL = 'http://localhost:3000/product-types';

export class ProductTypeModel {
    static async getAll() {
        return await apiRequest(API_URL);
    }

    static async getById(id) {
        return await apiRequest(`${API_URL}/${id}`);
    }   

    static async create(data) {
        return await apiRequest(API_URL, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

    static async update(id, data) {
        return await apiRequest(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        });
    }

    static async delete(id) { 
        return await apiRequest(`${API_URL}/${id}`, {
            method: 'DELETE'            
        });
    }
}

