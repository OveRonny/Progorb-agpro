import { LoginModel } from '../models/loginModel.js'; 
import { LoginView } from '../views/loginView.js';    
import { AppController } from '../../../controllers/appController.js';

export const LoginController = {
    showLogin() {
        const appDiv = document.getElementById('app');

        
        appDiv.innerHTML = LoginView.render();

        
        const form = document.getElementById('login-form');
        const goToRegister = document.getElementById('go-to-register');

        if (!form || !goToRegister) {
            console.error('Login form eller register-link finnes ikke i DOM!');
            return;
        }

        
        form.addEventListener('submit', async (e) => {
            e.preventDefault();

            const username = document.getElementById('email').value.trim();
            const password = document.getElementById('password').value;

            const result = await LoginModel.login(username, password);

            if (result.success) {
                AppController.showCustomers(); // bytt til customer view
            } else {
                document.getElementById('login-error').textContent = result.message;
            }
        });

        
        goToRegister.addEventListener('click', () => {
            AppController.showRegister();
        });
    }
};


