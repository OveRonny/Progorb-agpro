import {
    AppController
} from '../controllers/appController.js';

export const Header = {

    render() {
        return `
            <header class="header">
                <div class="header-left">
                    <span class="logo" id="logo">MyApp</span>
                    <div id="nav-left"></div>
                </div>
                <div class="header-right" id="nav-right"></div>
            </header>
        `;
    },

    setup() {
        this.updateMenu();

        document.getElementById('logo').addEventListener('click', () => {
            const token = localStorage.getItem('token');
            if (token) AppController.showCustomers();
            else AppController.showLogin();
        });
    },

    updateMenu() {
        const left = document.getElementById('nav-left');
        const right = document.getElementById('nav-right');
        const token = localStorage.getItem('token');

        left.innerHTML = '';
        right.innerHTML = '';

        if (token) {
            // 🔐 Innlogget
            left.innerHTML = `
                <button id="nav-customers" class="nav-btn">Customers</button>
                <button id="nav-products" class="nav-btn">Products</button>
                <button id="nav-products-type" class="nav-btn">Produkt typer</button>
            `;

            right.innerHTML = `
                <button id="nav-logout" class="nav-btn logout-btn">Logout</button>
            `;

            document.getElementById('nav-customers')
                .addEventListener('click', () => AppController.showCustomers());

            document.getElementById('nav-products')
                .addEventListener('click', () => AppController.showProducts());

            document.getElementById('nav-products-type')
            .addEventListener('click', () => AppController.showProductTypes());

            document.getElementById('nav-logout')
                .addEventListener('click', () => {
                    localStorage.removeItem('token');
                    this.updateMenu();
                    AppController.showLogin();
                });

        } else {
            // 🔓 Ikke innlogget
            right.innerHTML = `
                <button id="nav-login" class="nav-btn">Login</button>
                <button id="nav-register" class="nav-btn">Register</button>
            `;

            document.getElementById('nav-login')
                .addEventListener('click', () => AppController.showLogin());

            document.getElementById('nav-register')
                .addEventListener('click', () => AppController.showRegister());
        }
    }
};