import {
    LoginController
} from '../features/login/controllers/loginController.js';
import {
    RegisterController
} from '../features/register/controllers/registerController.js';
import { CustomerController } from '../features/customers/controllers/customerController.js';
import { ProductController } from '../features/products/controllers/productController.js';
import { ProductTypeController } from '../features/productTypes/controllers/productTypeController.js';
import { OrderController } from '../features/orders/controllers/orderController.js';

export const AppController = {
    start() {
        const token = localStorage.getItem('token');
        if (token) {
             this.showCustomers();   
        } else {
            this.showLogin();
        }
    },

    showLogin() {
        LoginController.showLogin();
    },

    showRegister() {
        RegisterController.showRegister();
    },

    showCustomers() {
        CustomerController.showCustomers();
    },

    showProducts() {
        ProductController.showProducts();
    },

    showProductTypes() {
        ProductTypeController.showProductTypes();
    },
    
    showOrders() {
        OrderController.showOrders();
    }
};