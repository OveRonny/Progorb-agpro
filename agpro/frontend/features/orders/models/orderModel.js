
import {
    apiRequest
} from '../../helpers/apiHelper.js';

const API_URL = 'http://localhost:3000/orders';

export class OrdreModel {
    static async getOrders() {
        return await apiRequest(API_URL);
    }

    static async getOrderById(id) {
        if (!id) throw new Error("Missing order ID");

        return await apiRequest(`${API_URL}/${id}`, {
            method: "GET",
            headers: {
                "Content-Type": "application/json"
            }
        });
    }

    static async addOrder(orderData) {
        return await apiRequest(API_URL, {
            method: 'Post',
            Headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(orderData)
        });
    }

    static async updateOrder(id, orderData) {
        return await apiRequest(`${API_URL}/${id}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(productData)
        });
    }

    static async deleteOrder(id) {
        return await apiRequest(`${API_URL}/${id}`, {
            method: 'DELETE'
        });
    }
}